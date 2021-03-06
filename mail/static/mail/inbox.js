/***************************************************** */
/* Legacy vanilla JS front end left for reference only */
/***************************************************** */

document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));
  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));
  document.querySelector("#compose").addEventListener("click", compose_email);

  // Add click event listener to email send button
  document
    .querySelector("#compose-form")
    .addEventListener("submit", (event) => send_email(event));

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email(id = 0) {
  // Show compose view and hide other views
  clear_views();
  document.querySelector("#compose-view").style.display = "block";

  // Populate or clear out composition fields
  clearCompositionFields();
  if (id > 0) populateReply(id);
}

function clearCompositionFields() {
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";
}

function populateReply(id) {
  fetch(`emails/${id}`)
    .then((response) => response.json())
    .then((message) => {
      // document.querySelector('.message-from').value = getUserEmail(); // Not necessary, already in the django template
      document.querySelector("#compose-recipients").value = message.sender;

      const re = /((re:*|Re:*|RE:*|re:*)+(\s)*)+/;
      formattedSubject = "Re: " + message.subject.replace(re, ""); // Eliminates extraneous Re:

      document.querySelector("#compose-subject").value = formattedSubject;
      document.querySelector(
        "#compose-body"
      ).value = `On ${message.timestamp} ${message.sender} wrote:\n${message.body}`;
    });
}

function send_email(event) {
  event.preventDefault(); // prevents form submission reloading current page

  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector("#compose-subject").value,
      body: document.querySelector("#compose-body").value,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // Print result
      load_mailbox("sent");
    });
}

function load_mailbox(mailbox) {
  window.currentMailbox = mailbox;
  // Show the mailbox and hide other views
  clear_views();
  document.querySelector("#emails-view").style.display = "block";

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  // Get emails
  fetch(`emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      emails.forEach((email) => {
        list_email(email);
      });
    });
}

function list_email(email) {
  const message = document.createElement("div");
  message.className = "email";
  if (email.read) message.className += " email-read";

  message.innerHTML = `
  <div class="email-sender">${email.sender}</div>
  <div class="email-subject">${email.subject}</div>
  <div class="email-timestamp">${email.timestamp}</div>
  `;

  message.addEventListener("click", () => {
    load_message(email.id);
  });

  document.querySelector("#emails-view").append(message);
}

function load_message(id) {
  // Clear other views and show message view
  clear_views();
  document.querySelector("#message-view").style.display = "block";

  document.querySelector("#reply").onclick = () => compose_email(id);

  displayMessage(id);
  markAsRead(id);
}

function displayMessage(id) {
  fetch(`emails/${id}`)
    .then((response) => response.json())
    .then((message) => {
      document.querySelector(".message-from").innerHTML = message.sender;
      document.querySelector(".message-to").innerHTML = message.recipients;
      document.querySelector(".message-subject").innerHTML = message.subject;
      document.querySelector(".message-timestamp").innerHTML =
        message.timestamp;

      formattedMessage = message.body.split("\n").join("<br>");
      document.querySelector(".message-body").innerHTML = formattedMessage;

      populateOrHideArchiveButton(message);
      populateOrHideReadButton(message);
    });
}

function populateOrHideArchiveButton(message) {
  let userEmail = getUserEmail();
  archiveButton = document.querySelector("#toggle-archive-status");

  // Only display the ability archive a message that was sent to the user by someone other than the user
  // After that, update appropriate message for archive toggle button
  if (window.currentMailbox !== "sent") {
    archiveButton.style.display = "inline-block";
    archiveButton.innerHTML = "Add to Archive";
    if (message.archived) archiveButton.innerHTML = "Remove from Archive";

    archiveButton.onclick = () => toggleArchiveStatus(message.id);

    return;
  }

  archiveButton.style.display = "none";
}

function populateOrHideReadButton(message) {
  let userEmail = getUserEmail();
  readToggleButton = document.querySelector("#toggle-read-status");

  // Only display the ability toggle unread on a message that was sent to the user by someone other than the user
  if (window.currentMailbox !== "sent") {
    readToggleButton.style.display = "inline-block";
    readToggleButton.onclick = () => {
      toggleReadStatus(message.id);
    };
    return;
  }

  readToggleButton.style.display = "none";
}

function clear_views() {
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#message-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "none";
}

// Read status toggle functions

function toggleReadStatus(id) {
  fetch(`emails/${id}`)
    .then((response) => response.json())
    .then((message) => {
      if (message.read) {
        markAsUnread(id);
        return;
      }
      markAsRead(id);
      return;
    });
}

function markAsRead(id) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: true,
    }),
  }).then(
    (document.querySelector("#toggle-read-status").innerHTML = "Mark as Unread")
  );
}

function markAsUnread(id) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: false,
    }),
  }).then(
    (document.querySelector("#toggle-read-status").innerHTML = "Mark as Read")
  );
}

// Archive Toggle Functions

function toggleArchiveStatus(id) {
  fetch(`emails/${id}`)
    .then((response) => response.json())
    .then((message) => {
      if (message.archived) {
        return removeFromArchive(id);
      }

      return addToArchive(id);
    })
    .then(load_mailbox("inbox"));
}

function addToArchive(id) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: true,
    }),
  }).then((response) => {
    if (response.status === 204) load_mailbox("inbox");
  });
}

function removeFromArchive(id) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: false,
    }),
  }).then((response) => {
    if (response.status === 204) load_mailbox("inbox");
  });
}

function getUserEmail() {
  return document.querySelector("#user-email").innerHTML;
}
