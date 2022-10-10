const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})