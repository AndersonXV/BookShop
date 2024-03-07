import  express  from "express";
import {PORT, MonogoDBURL} from './config.js'
const app =express()


app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Sever started on port ${PORT}`)
})

app.get('/',(req, res)=>{
    return res.status(202).send("<h1>Hello There</h1>")
})

app.get('/shop',(req, res)=>{
    return res.status(202).send("<h1>HOME</h1>")
})
app.get('/shop/:id',(req, res)=>{
    const data = req.params
    return res.status(202).send(`<a href="/"> Book:${data.id}</a>`)
})

app.post('/admin/savebook',(req, res)=>{
    const data = req.body
    if (!data.title)
    return res.status(400).send("No title found")

    if (!data.author)
    return res.status(400).send("No author found")

    if (!data.price)
    return res.status(400).send("No price found")

    return res.status(201).send(JSON.stringify(data))
})