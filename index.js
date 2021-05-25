
const express = require('express');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
app.use(express.json());
app.use(cors());


const uri = 'mongodb+srv://tempUser:el8J3B8QNerjHF5L@cluster0.bvffj.mongodb.net/book_shelf?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.log("DB Connect Error", err)
    } else {
        const Reading = client.db('book_shelf').collection('reading');
        const Books = client.db('book_shelf').collection('books');

        app.get('/', (req, res, next) => {
            res.json({ message: "Hello world!" })
        })

        app.get('/books', (req, res, next) => {
            Books.find().toArray((err, data) => {
                res.json({ data });
            })
        })


        app.get('/reading-list/:email',  (req, res, next) => {
            Reading.find({email: req.params.email}).toArray((err, data) => {
                res.json({ data });
            })
        });

        app.post('/add-to-reading-list/', (req, res, next) => {
            const data = req.body;
            Reading.insertOne(data)
            .then(data => {
                res.json({success: !!data.result.ok})
            })
        });

        app.delete('/remove-from-reading-list/:id', (req, res, next) => {
            const id = ObjectID(req.params.id);
            
            Booking.findOneAndDelete({_id: id, bookedBy: user.email})
            .then(data => {
                res.json({success: !!data.value})
            })
        });

    }
})

app.listen(process.env.PORT || 8080 , () => console.log("Server is running on port 8080"))