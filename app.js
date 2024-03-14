import  express, { response }  from "express";
import {PORT, MongoDBURL} from './config.js'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
const app =express()


app.use(express.json())

const client = new MongoClient(MongoDBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const booksDB = client.db("myBookShop")
const myBooks = booksDB.collection("booksCollection")


app.listen(PORT, ()=>{
    console.log(`Sever started on port ${PORT}`)
})

app.get('/',(req, res)=>{
    return res.status(202).send("<h1>Hello There</h1>")
})

app.get('/shop',(req, res)=>{
    //return res.status(202).send("<h1>HOME</h1>")
    myBooks.find().toArray()
    .then(response=>{
        return res.status(202).send(response)  
    })
})
app.get('/shop/:id',(req, res)=>{
    // return res.status(202).send(`<a href="/"> Book:${data.id}</a>`)
    const data = req.params

    const filter = {
        "_id" : new ObjectId(data.id)
    }
    
    myBooks.findOne()
    .then(response=>{
        return res.status(202).send(response)
    })
})

app.post('/admin/savebook',(req, res)=>{
    const data = req.body
    if (!data.title)
    return res.status(400).send("No title found")

    if (!data.author)
    return res.status(400).send("No author found")

    if (!data.price)
    return res.status(400).send("No price found")

    myBooks.insertOne(data)
    .then(response=>{
        return res.status(201).send(JSON.stringify(response))
    })
    .catch(err=>console.log(err))

})

app.delete('/admin/remove/:id', (req, res)=>{
    const data = req.params

    const filter = {
        "_id" : new ObjectId(data.id)
    }

    myBooks.deleteOne(filter)
    .then(response=>{
        return res.status(202).send(response)
    })
   .catch(err=>console.log(err)) 
})

app.put('/admin/update/:id', (req, res)=>{
    const data = req.params
    const docdata = req.body

    const filter = {
        "_id": new ObjectId(data.id)
    }

    const updDoc = {
        $set: {
            ...docdata
        }
    }

    myBooks.updateOne (filter, updDoc)
    .then(response=>{
        return res.status(200).send(response)
    })
})