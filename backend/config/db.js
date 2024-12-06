const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb+srv://bbhashvika2004:bhashvika@cluster0.zdkoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
            console.log("db connected");
        })
    }
    catch(err){
        console.log("error");
    }
}
module.exports=connectDB;