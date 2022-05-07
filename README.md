# Mail Back End

A simulated Web Mail application that allows users to register/login, compose, send, reply to emails, archive and delete emails, and mark emails as unread. Login sessions are handled using JSON Web Tokens (JWT)

## Rebuilt from Vanilla Django

This application was previously built using vanilla Django with Django's template engine for the front end with vanilla javascript and css.

The application now utilizes a Django REST Framework API that the React front end can fetch data from. The application has been deployed as one unified project. The React front-end can be seen [here](https://github.com/IB21-A/mail-react-frontend)

### What's Different?

- Django REST API Back-end
- JWT Authentication (simplejwt)
- Django REST Serializers including
- Data validation
  - Login validation
  - Check that recepient exists and is a valid address
  - Required must be present
- Django REST View classes including
  - Case insensitive email lookup
  - User's emails filtered by mailbox type

### [View this Project on Heroku](https://mail-thom.herokuapp.com)
