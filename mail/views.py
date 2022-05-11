import json
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Email


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def compose(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.body)

    emails = [email.strip() for email in data.get("recipients").split(",")]

    if emails == [""]:
        return JsonResponse({
            "error": "At least one recipient required."
        }, status=400)

    # Convert email addresses to users
    recipients = []
    for email in emails:
        try:
            user = User.objects.get(email__iexact=email)
            recipients.append(user)
        except User.DoesNotExist:
            return JsonResponse({
                "error": f"User with email {email} does not exist."
            }, status=400)

    # Get contents of email
    subject = data.get("subject", "")
    body = data.get("body", "")

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

        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)

        email.save()

    return JsonResponse({"message": "Email sent successfully."}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mailbox(request, mailbox):

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
            user=request.user, archived=True
        )
    else:
        return JsonResponse({"error": "Invalid mailbox."}, status=400)

    # Return emails in reverse chronologial order
    emails = emails.order_by("-timestamp").all()
    return JsonResponse([email.serialize() for email in emails], safe=False)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_email(request, email_id):
    # Query for requested email
    try:
        email = Email.objects.get(user=request.user, pk=email_id)
    except Email.DoesNotExist:
        return JsonResponse({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "DELETE":
        email.delete()
        JsonResponse({"message": "Email deleted successfully."}, status=201)

    return JsonResponse({"error": "DELETE request required"}, status=404)


@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def email(request, email_id):
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

        if data.get("archived") is not None:
            email.archived = data["archived"]
        email.save()
        return HttpResponse(status=204)

    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = json.loads(request.body)
    email = data["email"].lower()

    # Ensure password matches confirmation
    password = data["password"]
    confirmation = data["confirmation"]
    if password != confirmation:
        return JsonResponse(data={"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

    # Attempt to create new user
    try:
        user = User.objects.create_user(email, email, password)
        user.save()
        populateNewUserMailbox(user)
    except IntegrityError as e:
        print(e)
        return Response(data={"message": "Email address already taken."}, status=status.HTTP_403_FORBIDDEN)

    return JsonResponse(data={"message": "User created successfully"}, status=status.HTTP_201_CREATED)


def populateNewUserMailbox(newUser):
    thom = User.objects.get(email__iexact="thom@thomcodes.com")
    users = set()
    users.add(newUser)
    users.add(thom)

    subject = "Wow! Such a cool app!"
    body = "Hey Thom,\nYou did some really cool stuff here! I love that when you respond to a message, it doesn't fill in tons of \"Re: Re: Re: Re: \" but just has one. Did you use Regular Expressions for that?\nPretty cool that messages are marked as read with a different color in the inbox, and I can mark them as unread again from the message. I love that I can see my sent messages too! You did a great job, I can't wait to hire you ;)\nBest,\nThe Hiring Manager"

    for user in users:
        email = Email(
            user=user,
            sender=newUser,
            subject=subject,
            body=body,
            read=user == newUser
        )
        email.save()
        email.recipients.add(thom)
        email.save()

    subject = "Welcome to the Webmail application!"
    body = "Hey there!\nThanks for stopping by and checking out my application. Feel free to poke around. Reply to this email and let me know you were here!\nBest,\nThom"

    for user in users:
        email = Email(
            user=user,
            sender=thom,
            subject=subject,
            body=body,
            read=user == newUser
        )
        email.save()
        email.recipients.add(newUser)
        email.save()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
