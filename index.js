const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = 'dbUser';
const pass = 'EgM64zuLTAwVgJcF';
const uri = "mongodb+srv://dbUser:EgM64zuLTAwVgJcF@cluster0-ilfiw.mongodb.net/onlineStore?retryWrites=true&w=majority";

const users = ['Asad', 'Moin', 'Sabed', 'Susmita', 'Sohana', 'Sabana'];

app.get('/', (req, res) =>{
    const fruit = {
        product: 'ada',
        price: 220
    }
    res.send(fruit);
});

app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
});

//post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log('Testing', product);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, document)=>{
            console.log('Successfully inserted', res)
            res.send(product);
        });
        client.close();
      });
});
app.listen(4000, () => console.log('Listening to port 4000'));