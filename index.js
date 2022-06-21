const express = require('express')
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()
const port = 3000
const Schema = require('validate')

app.use(express.json())
app.use(cors())
const url= 'mongodb://root:password@localhost:27017'

const successMessage = 'The database request was successful'

const responseFormat =  (status, message, data) => {
    return {
        "status": status,
        "message": message,
        "data": data
    }
}
const productRequired = new Schema ({
    title:{
        required:true,
        message: 'title is required'
    },
    price:{
        required:true,
        message: 'price is required'
    },
    image:{
        required:true,
        message:'image is required'
    }
})
const product = new Schema({
    title:{
        type:String,
        length:{min: 5, max:50},
        message: 'title must be between five and 50 characters.'
    },
    price:{
        type:Number
    },
    image:{
        type:String,
        length:{min: 15, max: 300}
    },
    category_id:{
        type:Number
    },
    category:{
        type: String,
        length: {min:3, max: 20}
    },
    character_id:{
        type: Number
    },
    description:{
        type: String
    },
    image2:{
        type: String
    },
    image3:{
        type: String
    },
    is_deleted:{
        type: Boolean
    }
    }
)


app.get('/products', async (req, res) =>{
    let filter_params
    if(req.query.category && req.query.character) {
        filter_params = {
            $and: [
                {character: req.query.character},
                {category: req.query.category}
            ]
        }
    }
     else if (req.query.category && !req.query.character){
        filter_params = {category: req.query.category }
    } else if (!req.query.category && req.query.character){
        filter_params = {character: req.query.character}
    } else {
         filter_params ={}
    }

    const connection = await MongoClient.connect(url)
    const db = connection.db('robot_store')
    const collection = db.collection('products')
    const data = await collection.find(filter_params).project({title:1, image:1, _id:1, price:1}).toArray()

    res.json(data)

})

app.get('/products/:id', async (req, res) =>{
    const userId = ObjectId(req.params.id)
    const connection = await MongoClient.connect(url)
    const db = connection.db('robot_store')
    const collection = db.collection('products')
    const data = await collection.findOne({_id:userId})

    res.json(responseFormat(200,'Your request was successful', data))

})

app.post('/products', async (req, res) => {
    const dataToInsert = {
        title: req.body.title,
        image: req.body.image,
        category_id: req.body.category_id,
        price: req.body.price,
        category: req.body.category,
        character_id: req.body.character_id,
        character: req.body.character,
        description: req.body.description,
        image2: req.body.image2,
        image3: req.body.image3
    }
    let errors = product.validate(dataToInsert)

    errors += productRequired.validate(dataToInsert)


    if (errors.length > 0) {
        let errorMessage = ''
        errors.forEach(error => {
            errorMessage += error
        })
        return res.status(400).json(responseFormat(400, errorMessage, null))

    } else {
        const connection = await MongoClient.connect(url)
        const db = connection.db('robot_store')
        const collection = db.collection('products')

        const result = await collection.insertOne(dataToInsert)

        if (result.insertedId !== null) {
            res.json({message: 'it worked!'})
        } else {
            res.json({message: "it didn't work :("})
        }
    }
})


app.put("/products", async (req, res) =>{
    const idToUpdate = ObjectId(req.body.id)

    const dataToUpdate = {
        title:req.body.title,
        image:req.body.image,
        category_id:req.body.category_id,
        price:req.body.price,
        category: req.body.category,
        character_id: req.body.character_id,
        character: req.body.character,
        description: req.body.description,
        image2: req.body.image2,
        image3: req.body.image3

}

    const connection = await MongoClient.connect(url)
    const db = connection.db('robot_store')
    const collection = db.collection('products')

    const result = await collection.updateOne({_id: idToUpdate}, {$set: dataToUpdate})

    if (result.modifiedCount !== 1){
        res.json({message: 'ur update failed'})
    } else {
        res.json({message:'Update worked'})
    }

})

app.delete('/products', async (req, res) => {
    const idToDelete = ObjectId(req.body.id)

    const connection = await MongoClient.connect(url)
    const db = connection.db('robot_store')
    const collection = db.collection('products')

    const result = await collection.deleteOne({_id: idToDelete})
    if (result.deletedCount === 0) {
        res.json({message: 'delete failed'})
    } else {
        res.json({message: 'delete worked, bye'})
    }

})

app.get('/productcategory', async (req, res) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('robot_store')
    const collection = db.collection('categories')
    const data = await collection.find({}).toArray()
    res.json(data)
})


app.listen(port)