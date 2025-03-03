import mongoose from "mongoose";

const connecDB = async ()=>{
     mongoose.connection.on('connected' , ()=> {
        console.log('Mongodb Connected');
        
     })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)


}

export default connecDB;