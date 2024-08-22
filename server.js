// const { log } = require("console")
const express = require("express")
// const { dirname } = require("path")
const { Server } = require("socket.io")
const app = express()
const http = require("http").createServer(app)

http.listen(3000, () => {
    console.log("connected to server");
})

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
    // console.log(__dirname)
})

//socket
const io = new Server(http)

io.on("connection", (socket) => {
    console.log("connected");
    socket.on('message', (msge) => {
        socket.broadcast.emit('message', msge)
    })
})
//  this code is written just to test the pushing of this code to github !!