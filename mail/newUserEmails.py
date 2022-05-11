from .models import User, Email


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
            read=user != newUser
        )
        email.save()
        email.recipients.add(newUser)
        email.save()

    # Archived Email
    email = Email(
        user=user,
        sender=thom,
        subject="Archived Email",
        body="Here is an example of an archived Email!",
        read=True,
    )

    email.save()
    email.recipients.add(newUser)
    email.archived = True
    email.save()
