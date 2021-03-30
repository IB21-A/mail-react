document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#message-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#message-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // TODO (need to separate these later by button press)
  // Get emails 
  console.log(mailbox);
  fetch(`emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(email => {
      list_email(email);

    });
    console.log(emails);
  });

}

function list_email(email) {
  const message = document.createElement('div');
  message.className = 'email';
  if (email.read)
    message.className += ' email-read';

  message.innerHTML = `
  <div class="email-sender">${email.sender}</div>
  <div class="email-subject">${email.subject}</div>
  <div class="email-timestamp">${email.timestamp}</div>
  `
  
  message.addEventListener('click', () => {
    console.log('CLICK!');
    load_message(email.id);
  });

  document.querySelector('#emails-view').append(message);
}

function load_message(id) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#message-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  fetch(`emails/${id}`)
  .then(response => response.json())
  .then(message => {
    document.querySelector('.message-from').innerHTML = message.sender;
    document.querySelector('.message-to').innerHTML = message.recipients;
    document.querySelector('.message-subject').innerHTML = message.subject;
    document.querySelector('.message-timestamp').innerHTML = message.timestamp;
    document.querySelector('.message-body').innerHTML = message.body;
  });

}