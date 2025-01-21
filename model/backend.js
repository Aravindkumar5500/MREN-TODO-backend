const mongoose = require ('mongoose')

const TodoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        default:false
    }

})

const todo = mongoose.model("todo",TodoSchema)
module.exports= {todo}