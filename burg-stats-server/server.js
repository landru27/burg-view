const sys = require('sys');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

var tailf = require('child_process').spawn("tail", ["-f", "-1", "/tmp/burg-stats.json"]);

wss.on('connection', function connection(ws) {
  sys.log("opened connection");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  tailf.stdout.on('data', function (data) {
    ws.send(format(data));
  });
});

function format (data) {
  var output_data = data.toString();

  return output_data;
}
