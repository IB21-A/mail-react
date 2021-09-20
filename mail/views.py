import json
from mail.serializers import CustomUserSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Email


def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "mail/inbox.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def compose(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.body)
    print(data)
    emails = [email.strip() for email in data.get("recipients").split(",")]
    print('got emails')
    if emails == [""]:
        return JsonResponse({
            "error": "At least one recipient required."
        }, status=400)

    print('getting users')
    # Convert email addresses to users
    recipients = []
    for email in emails:
        try:
            user = User.objects.get(email=email)
            recipients.append(user)
        except User.DoesNotExist:
            return JsonResponse({
                "error": f"User with email {email} does not exist."
            }, status=400)
    print('got users')
    # Get contents of email
    subject = data.get("subject", "")
    body = data.get("body", "")
    print('create emails')
    # Create one email for each recipient, plus sender
    users = set()
    users.add(request.user)
    users.update(recipients)
    for user in users:
        email = Email(
            user=user,
            sender=request.user,
            subject=subject,
            body=body,
            read=user == request.user
        )
        print('save email')
        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)
        print('save email again')
        email.save()

    return JsonResponse({"message": "Email sent successfully."}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mailbox(request, mailbox):
    print(request.user)
    # Filter emails returned based on mailbox
    if mailbox == "inbox":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=False
        )
    elif mailbox == "sent":
        emails = Email.objects.filter(
            user=request.user, sender=request.user
        )
    elif mailbox == "archive":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=True
        )
    else:
        return JsonResponse({"error": "Invalid mailbox."}, status=400)

    # Return emails in reverse chronologial order
    emails = emails.order_by("-timestamp").all()
    return JsonResponse([email.serialize() for email in emails], safe=False)


@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def email(request, email_id):
    print(request)
    # Query for requested email
    try:
        email = Email.objects.get(user=request.user, pk=email_id)
    except Email.DoesNotExist:
        return JsonResponse({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(email.serialize())

    # Update whether email is read or should be archived
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("read") is not None:
            email.read = data["read"]
            print(f"Marked {email.read}")
        if data.get("archived") is not None:
            email.archived = data["archived"]
        email.save()
        return HttpResponse(status=204)

    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)


def login_view(request):

    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mail/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "mail/login.html")


# API view
@csrf_exempt
def login_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)

        email = data.get("email")
        password = data.get("password")
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Logged in successfully."}, status=201)
        else:
            return JsonResponse({"message": "Login Failed."}, status=400)
    else:
        return JsonResponse({"message": "POST method required"}, status=400)


@csrf_exempt
def api_test(request):
    return JsonResponse({"message": "Success message from the API_test route"}, status=201)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = json.loads(request.body)
    print(data)
    email = data["email"]

    # Ensure password matches confirmation
    password = data["password"]
    confirmation = data["confirmation"]
    if password != confirmation:
        return JsonResponse(data={"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

    # Attempt to create new user
    try:
        user = User.objects.create_user(email, email, password)
        user.save()
    except IntegrityError as e:
        print(e)
        return JsonResponse(data={"message": "Email address already taken."}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse(data={"message": "User created successfully"},status=status.HTTP_201_CREATED)


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def RegisterNewUser(request):
#     serializer = CustomUserSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         if user:
#             json = serializer.data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
