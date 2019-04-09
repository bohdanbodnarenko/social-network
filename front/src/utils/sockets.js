import io from "socket.io-client";

const socket = io.connect("ws://localhost:8080");
socket.on("hello", data => console.log(data));