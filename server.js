import express  from "express";
import mongoose from "mongoose";
import Cors from "cors";
import cards from "./dbCards.js";


const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:JOFpxDuPZRLAT7xC@cluster0.ldesg.mongodb.net/letsdb?retryWrites=true&w=majority";

app.use(express.json());
app.use(Cors());


mongoose.connect(connection_url,{
    useNewUrlParser:true,
    // useCreateIndex: true,
    useUnifiedTopology:true
});
app.get("/",(req, res) => res.status(200).send("HELLO WORLD!!!!"));

app.post('/lets/cards' , (req,res) =>{
    const dbCard = req.body;
    cards.create(dbCard,(err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    });

});

app.get('/lets/cards', (req,res) =>{
    cards.find((err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    });
});
app.listen(port,() => console.log(`listening on localhost: ${port}`));