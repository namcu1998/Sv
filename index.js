const express = require("express");
const ip = require("ip");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const middleware = require("socketio-wildcard")();
const awake_heroku = require("./awake_heroku");
const { v4: uuidv4 } = require('uuid');
const { get_data_all, get_database } = require('./handle.data');
const { board, webapp } = require("./socket")

const io = new socket(server);
const web_app = io.of("/web_app");

web_app.use(middleware);

function socket_init() {
  get_data_all().map((item) => {
    const ns = io.of(`/${item.namespace}`);
    ns.use(middleware);
  
    // console.log(ns);
    board(item.id, ns, web_app);
    require("./ping_pong")(item.id, ns, web_app);
  });
}

webapp(web_app, socket_init);
get_database(socket_init);

socket_init();

awake_heroku("https://nam-cu.herokuapp.com");

server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on ${ip.address()}:3000`);
});
