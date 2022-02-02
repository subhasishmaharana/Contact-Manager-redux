// call all the required packages
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')

// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let a = file.originalname.split('.')
        cb(null, `${file.fieldname}-${Date.now()}.${a[a.length-1]}`)
    }
})

const upload = multer({ storage: storage })

// Uploading single file
app.post('/uploadfile', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

// Uploading multiple files
app.post('/uploadmultiple', upload.array('files', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files);
})

// Uploading image
app.post('/uploadimage', upload.single('image'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64')
    };
    
    db.collection('images').insertOne(finalImg, (err, result) => {
        console.log(result)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

const { Image } = require('../modules/Image')

// Get all images
app.get('/images', (req, res) => {
    db.collection('images').find().toArray((err, result) => {
        const imgArray = result.map(element => element._id);
        console.log(imgArray);
        if (err) return console.log(err)
        res.send(imgArray)
    })
});

// Get image by id
app.get('/image/:id', (req, res) => {
    var id = req.params.id;
    db.collection('images').findOne({ '_id': ObjectId(id) }, (err, result) => {
        if (err) return console.log(err)
        console.log(result);
        res.contentType('image/jpeg');
        res.send(result.image.buffer)
    })
})
