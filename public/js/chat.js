const socket = io();

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");
const $typingMessage = document.querySelector("#typingMessage");

const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  const $newMessage = $messages.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = $messages.offsetHeight;

  const containerHeight = $messages.scrollHeight;

  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

document
  .getElementById("private-toggle")
  .addEventListener("click", function () {
    var privateForm = document.getElementById("private-message-form");
    if (privateForm.style.display === "none") {
      privateForm.style.display = "block";
    } else {
      privateForm.style.display = "none";
    }
  });

const showAlert = (message, type = "info") => {
  const alertContainer = document.getElementById("alert-container");
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.classList.add(`alert-${type}`);
  alertElement.textContent = message;
  alertContainer.appendChild(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, 3000);
};

$messageFormInput.addEventListener("input", () => {
  const message = $messageFormInput.value.trim();
  if (message !== "") {
    socket.emit("typing");
  } else {
    socket.emit("stopTyping");
  }
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value.trim();

  if (!message) {
    return;
  }

  $messageFormButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      showAlert("An error occurred while sending a message: " + error, "error");
    } else {
      showAlert("Message sent successfully!", "success");
    }
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return showAlert("Geolocation is not supported by your browser.", "error");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $sendLocationButton.removeAttribute("disabled");
        showAlert("Location shared successfully!", "success");
      }
    );
  });
});

document
  .querySelector("#private-message-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const to = e.target.elements.to.value.trim();
    const message = e.target.elements.message.value.trim();

    if (!to || !message) {
      showAlert("Please enter both recipient and message.", "error");
      return;
    }

    socket.emit("sendPrivateMessage", { to, message }, (error) => {
      if (error) {
        showAlert(
          "An error occurred while sending a private message: " + error,
          "error"
        );
        return;
      }
      showAlert("Private message sent successfully!", "success");
    });
  });

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
    isOwn: message.username === username,
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
  $typingMessage.textContent = "";
});

socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a"),
    isOwn: message.username === username,
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

socket.on("typing", (username) => {
  $typingMessage.textContent = `${username} is typing...`;
});

socket.on("stopTyping", () => {
  $typingMessage.textContent = "";
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    showAlert("An error occurred while joining the room: " + error, "error");
    location.href = "/";
  } else {
    showAlert("You have successfully joined the room!", "success");
  }
});
