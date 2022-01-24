const express = require('express')
const path = require('path')
const { notes } = require('./db/db')
const fs = require('fs')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.static('public'))
app.use(express.json())

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res) =>{
    let results = notes
    res.json(results)
})
app.post('/api/notes', (req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: notes.length.toString()
    }
    notes.push(note)
    const db = `
    {
        "notes":${JSON.stringify(notes)}
    }
    `
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        db
    )
    
    
    
})  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})