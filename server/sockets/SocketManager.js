exports.socketManager = client => {
  client.emit("connected", "Web sockets connected");
  client.on("user_connected", user => {
    console.log(user._id);
    client.join(user._id);
  });
};

exports.userConnected = user => {
  console.log("connected");
  console.log(user);
};
