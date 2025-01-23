const express = require ('express');
const mongoose = require ('mongoose')
const cors = require ('cors')
const {todo} = require ('./model/backend');
const { connect } = require('http2');
const jwt = require  ("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())
const SECRET = "Secret456"

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
app.post('/register',async(req,res,next)=>{
    try {
        let {name,email,password} =req.body
        let emaildata =null
        if(emaildata){
            res.send({message:"Already Account exist for this email",status:201})
            return;
        }else{
            // let token = jwt.sign({id:785632},SECRET,{expiresIn:"5m"})
            // let yi= jwt.sign
            let token = jwt.sign({id:741856},SECRET,{expiresIn:"5m"})

            res.send({message:"Registered Successfully",status:200,token:token})
        }
    } catch (error) {
        next(error)
    }
})
function auth(req,res,next){
    try {
        let token = req.headers.token
        let result = jwt.verify(token,SECRET)
        if(result){
            next()
            return;
        }else{
            res.send({message:"Unauthorized",status:401})
            return
        }
    } catch (error) {
        res.send({message:"Unauthorized",status:401,message:error.message})
    }
}
app.get("/register",auth,(req,res,next)=>{
    res.send({message:"You Have Access",status:200})
})
app.use((error,req,res,next)=>{
    res.send({status:error??500,error:error.message??"server error"})

})
app.listen(3001,()=>console.log("Server 3001 is running"))