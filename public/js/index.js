const socket = io();

const user = $.deparam(window.location.search);

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("joinRoom", {
    user
  });
});

socket.on("messFromServer", (msg) => {
  // const liTag = $(`<li>${msg.from}: ${msg.mess}</li>`);
  // $("#messages").append(liTag);

  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    mess: msg.mess,
    from: msg.from,
    createdAt: moment(msg.createdAt).format("LT")
  });
  $("#messages").append(html);
});

socket.on("locationFromServer", (msg) => {
  // const liTag = $(
  //   `<li>${msg.from}: <a target="blank" href=${msg.url}>Location</a></li>`
  const template = $("#location-template").html();
  const html = Mustache.render(template, {
    url: msg.url,
    from: msg.from,
    createdAt: moment(msg.createdAt).format(LT)
  });
  $("#messages").append(html);
});

socket.on("disconnect", () => {
  console.log("Disconnect from server");
});

$("#message-form").on("submit", (event) => {
  event.preventDefault();

  socket.emit("messFromClient", {
    from: "User",
    mess: $("[name=message]").val(),
    createdAt: new Date().getTime()
  });
  $("[name=message]").val("");
});

$("#send-location").on("click", () => {
  if (!navigator.geolocation)
    return alert("Your browser doest not support Geolocation");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("locationFromClient", {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  });
});

socket.on("usersInRoom", msg => {
  
})