const Contact = require('../modules/Contact')

module.exports.list = (req, res) => { //localhost:3099/contacts?pageNo=1&size=2
    console.log('depakkkkkkkk')
    const { user } = req
    let pageNo= parseInt(req.query.pageNo)
    let size = parseInt(req.query.size)
    let query = {}
    if(pageNo<0 || pageNo === 0){
        response = {"error": true, "message":"invalid page no, should start with 1"}
        return res.json(response)
    }
    query.skip  = size*(pageNo - 1)
    query.limit = size
    
    Contact.find({user: user._id})//.select('createdAt name phone email picture')
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOne({_id: id, user: user._id}).select('createdAt name phone email picture')
        .then((contact) => {
            if(Contact){
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    console.log(req.file)
    const {user } = req
    const body={
        name:req.body.name,
        email:req.body.email,
        picture:req.file.path,
        phone:req.body.phone
    }
    console.log(body)
    body.user = user._id
    const contact = new Contact(body)
    contact.save()
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Contact.findOneAndUpdate({_id: id, user: user._id}, body, {new: true, runValidators: true}).select('createdAt name email phone picture')
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOneAndDelete({_id: id, user: user._id})
        .then((contact) => {
            if(contact){
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}