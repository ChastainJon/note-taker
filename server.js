const express = require('express')
const path = require('path')
const { notes } = require('./db/db')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.static('public'))

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res) =>{
    let results = notes
    res.json(results)
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})