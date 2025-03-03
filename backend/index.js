import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connecDB from './config/mongodb.js';

const app = express();
const port = process.env.PORT || 4000;
connecDB();


app.use(express.json());
app.use(cors());

app.get("/" , (req , res)=>{
    res.send("app working")

})

app.listen(port , ()=> console.log('server started on PORT ' + port)
)