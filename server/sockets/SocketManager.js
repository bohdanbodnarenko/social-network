const { toggleUserOnline } = require("../controllers/user");

exports.socketManager = client => {
  client.emit("connected", "Web sockets connected");
  client.on("user_connected", async user => {
    if (user) {
      client.on("disconnect", async () => {
        toggleUserOnline(user._id, false);
        client.server.emit("user_status_changed", {
          _id: user._id,
          online: false,
          lastActive: Date.now()
        });
      });
      toggleUserOnline(user._id, true);
      client.join(user._id);
      client.server.emit("user_status_changed", {
        _id: user._id,
        online: true
      });
    }
  });
};
