const socket = io()
// console.log(socket)

let name1;
let messageArea = document.querySelector('.message_area')

do {
    name1 = prompt("Please enter your name")
} while (!name1)

let textarea = document.querySelector('#textarea')

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let msge = {
        user: name1,
        message: message.trim()
    }

    // appending 

    appendMessage(msge, 'outgoing')
    scrollToBottom()

    //clear text area after sending

    textarea.value = ''

    // send to server

    socket.emit('message', msge)
}

function appendMessage(msge, type) {
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')

    //generating markup

    let markup = `<h4>${msge.user}</h4>
                <p>${msge.message}</p>
                `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)

}


// Recieve message

socket.on('message', (msge) => {
    appendMessage(msge, 'incoming')
    scrollToBottom()
})

//function to scroll to bottom

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}