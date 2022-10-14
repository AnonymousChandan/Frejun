const express = require("express")
const listSchema = require("../Model/listSchema")
const router = express.Router()
router.get("/", (req, res) => {
    res.status(200).send("Blog Controllers")
})
router.post("/post", (req, res) => {
    listSchema.create({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category
    }).then((data) => {
        res.status(200).send(`Success ${data} Saved Successfully`)
    }).catch((err) => {
        res.status(401).send(err)
    })
})
router.get('/post', async (req, res) => {
    const limitValue = req.query.limit || 3
    const skipValue = req.query.limit || 0
    const posts = await listSchema.find({}).limit(limitValue).skip(skipValue)
    res.status(200).send(posts)
})
router.put("/modify/:id", (req, res) => {
    const id = req.params.id
    listSchema.find({ "_id": id }).then((data) => {
        let arr = []
        const response = data[0].body.split(" ")
        for (let i = 0; i < response.length; i++) {
            if (response[i].charAt(0) === "a" || response[i].charAt(0) === "A") {
                arr.push(response[i])
            }
        }
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (response[i] == arr[j]) {
                    response[i] = arr[j].slice(0, -3) + "*"
                }
            }
        }
        let output = response.join(" ")
        listSchema.updateMany({ "_id": req.params.id, output }, { $set: { body: output } }).then((data) => {
            res.status(200).send(`Success ${data} Updated Successfully`)
        }).catch((err) => {
            res.status(403).send(err)
        })
    }).catch((err) => {
        console.log(err)
    })
})
module.exports = router
