const express = require ('express');
const mongoose = require ('mongoose')
const cors = require ('cors')
const {todo} = require ('./model/backend');
const { connect } = require('http2');

const app = express()

app.use(cors())
app.use(express.json())

async function connectDB(){
    try{
        const connection = await mongoose.connect('mongodb+srv://aravindad557574:Ff4HpNcVwUSxqWRh@merntodolist.f2y94.mongodb.net/',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(connection.connection.host)

    } catch(error){
        console.log(error.message)
        next(error)

    }
}
connectDB()


app.post('/add',async(req,res,next)=>{
try {
    let note = new todo (req.body)
    let data = await note.save()

    res.send ({message:"add is done",status:200,data:data})
} catch (error) {
   console.log(error)
   next(error) 
}
})

app.get('/todo',async(req,res,next)=>{
    try{
        let data = await todo.find()
        res.send({massage:"list show",status:200,data:data})

    } catch(error){
      console.log(error)
      next(error)

    }
})

app.put("/update/:id",async(req,res,next)=>{
    try {
        let data = await todo.findByIdAndUpdate(req.params.id,{task:req.body.task})
        res.send({message:"update",data:data,status:200})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.delete("/delete/:id",async(req,res,next)=>{
    try {
        let data = await todo.findByIdAndDelete(req.params.id)
        res.send({message:"delete",data:data,status:200})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.use((error,req,res,next)=>{
    res.send({status:error??500,error:error.message??"server error"})

})
app.listen(3001,()=>console.log("Server 3001 is running"))