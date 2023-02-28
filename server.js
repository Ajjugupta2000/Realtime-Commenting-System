const express=require('express')
const app=express()
const http=require('http').createServer(app)


const port=3000

app.use(express.static(__dirname+'/static') )



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

http.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})


const io=require('socket.io')(http) 
io.on('connection',(socket)=>{
    // console.log('socket connected')
    // socket.on('new-user-connected',name =>{
    //     console.log("new user",name)
    // })
    socket.on('send',info=>{
        // console.log(info)
        socket.broadcast.emit('receive',info)
    })

    socket.on('typing',username=>{
        socket.broadcast.emit('livetyping',username)
    })
})

//connecting server with database
const dbconnect=require('./db')
dbconnect()

//importing comment.js file to get model
const Comment=require('./models/comment')
console.log(Comment)
app.use(express.json())
//Routes
app.post('/api/comments',(req,res)=>{
    const comment=new Comment({
        username:req.body.username,
        comment:req.body.message
    })
    comment.save().then(response=>{
        res.send(response)
    })
})
 

 