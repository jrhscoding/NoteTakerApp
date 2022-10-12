const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

const notes = require('./db/db.json');

app.use(express.static('public'));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    newNote = {
        id: notes.length += 1,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            return res.status(500).json({err});
        }
        res.json(notes);
    });
    // id, title text

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});