const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.omdln.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(express.json());
app.use(cors());

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollectSion = client.db("emajohnStore").collection("products");
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.post('/addProduct', (req,res) =>{
        const products = req.body;
        productsCollectSion.insertMany(products)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount)
        })
    }) 

    app.get('/products',(req, res) => {
        productsCollectSion.find({})
        .toArray((err, documents) =>{
            res.send(documents);
        })
    })


});

app.listen(port)