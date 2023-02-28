const socket=io()
const button=document.getElementById('btn')
const commentinput=document.getElementById('comment')
const showcommentbox=document.querySelector('#showcommentbox')

let username;
do{
    username=prompt("Enter your name")
}while(!username)
// socket.emit('new-user-connected',username)

//event when click on button
button.addEventListener('click',(event)=>{
    event.preventDefault()
    const comment=commentinput.value;
    if(!comment){
        return
    }
    postComment(comment)
})

function postComment(comment){
    let data={
        username:username,
        message:comment
    }
    appendToDOM(data);
    commentinput.value=''
    socket.emit('send',data);  
    syncWithDb(data) 
}

//function to append into DOM
function appendToDOM(data){
    const messagediv=document.createElement('li')
    messagediv.classList.add('commentbox')
    let markup=`<h3>${data.username}</h3>
                 <p'>${data.message}</p>
                 <p id='time'>
                    <i class='fas fa-clock'></i>
                    ${moment(data.time).format('LT')}
                 </p>`
    messagediv.innerHTML=markup
    showcommentbox.prepend(messagediv)//use prepend method to show latest comment first
}

socket.on('receive',info=>{
    appendToDOM(info) 
})

//event for showing live typing of user
commentinput.addEventListener('keyup',(event)=>{
    socket.emit('typing',username)
})

const typingmessage=document.querySelector('#typing')
socket.on('livetyping',username=>{
    typingmessage.innerHTML=`${username} is typing...`
    //calling debounce function with function and time arguments
    debounce(function(){
        typingmessage.innerHTML=''
    },1000)   
})

let timerid;
function debounce(func,timer){
    if(timerid){
        clearTimeout(timerid)
    }
    timerid=setTimeout(() => {
        func()
    }, timer);
}


function syncWithDb(data){
    const headers={
        'Content-Type':'application/json'
    }
    fetch('/api/comments',{method:'Post',body:JSON.stringify(data),headers})
    .then(response=>response.json())
    .then(result =>{
        console.log(result)
    })
}


