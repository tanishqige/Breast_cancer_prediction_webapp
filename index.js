console.log('Server-side code running');
let {PythonShell} = require('python-shell')
let fs=require('fs');
const express = require('express');
const app = express();
app.use(express.json());
var http = require( "http" );
const { compileFunction } = require('vm');
const { captureRejectionSymbol } = require('events');
var http_server = http.createServer( app ).listen( 8080 );
var http_io = require( "socket.io" )( http_server );

// serve files from the public directory
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  http_io.on('connection', function(socket) {
  socket.on('message',el=>{
    let id=el;
    const ObjectsToCsv = require('objects-to-csv');
    const list={
      id:id[0],
      ClumpThickness:id[1],
      UniformityofCellSize:id[2],
      UniformityofCellShape:id[3],
      MarginalAdhesion:id[4],
      SingleEpithelialCellSize:id[5],
      BareNuclei:id[6],
      BlandChromatin:id[7],
      NormalNucleoli:id[8],
      Mitoses:id[9]
    };
    const arr=[];
  arr[0]=list;
  const csv = new ObjectsToCsv(arr);
  function asyncCall() {
    let resp;
    console.log('calling');
    csv.toDisk('./list.csv');
    const pyshell = new PythonShell('./predict.py');
    pyshell.on('message', function (response) {
      resp=response;
      console.log(resp);
      socket.send(resp);
    });
    
  }
  asyncCall();
  });
});
