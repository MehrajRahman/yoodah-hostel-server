
const express = require('express');
var cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjr0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {
  try {
    await client.connect();

    const database = client.db('yoodha-hostel');
    const foodCollection = database.collection('foods');
    const studentCollection = database.collection('student');
    const serveCollection = database.collection('serveFood');


    // Food

    app.get("/food", async(req,res)=>{
      const cursor = foodCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods)
    })

    app.post("/food", async(req, res)=>{
      console.log("hitted", req.body)
      const foodItem = req.body;
      const result  = await foodCollection.insertOne(foodItem);
      console.log("hitted", req.body);
      console.log("hitted", result);
      res.send("hit the post");
    })

    app.delete("/food/:id", async(req, res)=>{
      const id  = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await  foodCollection.deleteOne(query);
      console.log("deleting", result);
      res.send("deleted");
    })

    app.put("/food/:id", async(req, res)=>{
      const id  = req.params.id;
      const updatedinfo = req.body;
      const filter = {_id:ObjectId(id)};
      const options = {upsert:true};
      const updateData = {
        $set:{
          name: updatedinfo.name,
          price: updatedinfo.price
        }
      }
      const result = foodCollection.updateOne(filter, updateData, options)
      console.log("Updating", req.body);
      res.send(updatedinfo);
    })

    // STUDENT

    // const database = client.db('yoodha-hostel');
    
    console.log("connected to db");

    // const food = {name:"Pasta", price:"170tk" }

    // Food

    app.get("/student", async(req,res)=>{
      const cursor = studentCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods)
    })

    app.post("/student", async(req, res)=>{
      console.log("hitted", req.body)
      const foodItem = req.body;
      const result  = await studentCollection.insertOne(foodItem);
      console.log("hitted", req.body);
      console.log("hitted", result);
      res.send("hit the post");
    })

    app.delete("/student/:id", async(req, res)=>{
      const id  = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await  studentCollection.deleteOne(query);
      console.log("deleting", result);
      res.send("deleted");
    })

    app.put("/student/:id", async(req, res)=>{
      const id  = req.params.id;
      const updatedinfo = req.body;
      const filter = {_id:ObjectId(id)};
      const options = {upsert:true};
      const updateData = {
        $set:{
          name: updatedinfo.name,
          price: updatedinfo.price
        }
      }
      const result = studentCollection.updateOne(filter, updateData, options)
      console.log("Updating", req.body);
      res.send(updatedinfo);
    })




    // Serve Food

    app.get("/serveFood", async(req,res)=>{
      const cursor = serveCollection.find({});
      const foods = await cursor.toArray();
      res.send(foods)
    })

    app.post("/serveFood", async(req, res)=>{
      console.log("hitted", req.body)
      const foodItem = req.body;
      const result  = await serveCollection.insertOne(foodItem);
      console.log("hitted", req.body);
      console.log("hitted", result);
      res.send("hit the post");
    })

    app.delete("/serveFood/:id", async(req, res)=>{
      const id  = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await  serveCollection.deleteOne(query);
      console.log("deleting", result);
      res.send("deleted");
    })

    app.put("/serveFood/:id", async(req, res)=>{
      const id  = req.params.id;
      const updatedinfo = req.body;
      const filter = {_id:ObjectId(id)};
      const options = {upsert:true};
      const updateData = {
        $set:{
          name: updatedinfo.name,
          price: updatedinfo.price
        }
      }
      const result = serveCollection.updateOne(filter, updateData, options)
      console.log("Updating", req.body);
      res.send(updatedinfo);
    })
    // foodCollection.insertOne(food)
    // .then(()=>{
    //   console.log("added success")
    // })
    // console.error(err);
    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);
    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
