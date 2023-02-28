const mongoose=require('mongoose')

const schema=mongoose.Schema

//creating schema "CommentSchema"
const CommentSchema=new schema({ 
    username:{type:String,required:true},
    comment:{type:String,required:true}
},{timestamps:true})

const Comment=mongoose.model('ComentCollection',CommentSchema) //creating model "Comment"
module.exports = Comment; //exporting Comment model