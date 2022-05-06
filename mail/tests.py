from django.test import TestCase

# Create your tests here.
# @csrf_exempt
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_email(request, email_id):
#     # Query for requested email
#     try:
#         email = Email.objects.get(user=request.user, pk=email_id)
#     except Email.DoesNotExist:
#         return JsonResponse({"error": "Email not found."}, status=404)

#     # Return email contents
#     if request.method == "DELETE":
#         print("Attemping Delete")
#         deleted = email.delete()
#         JsonResponse({"message": "Email deleted successfully."}, status=201)

#     return JsonResponse({"error": "DELETE request required"}, status=404)
