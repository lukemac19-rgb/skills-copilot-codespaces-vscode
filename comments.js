// Create web server
// Create a route for POST /comments
// Read the comments from the file
// Parse the comments from the file
// Add a new comment
// Write the comments to the file

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Something broke!');
    }
    const comments = JSON.parse(data);
    res.send(comments);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Something broke!');
    }
    const comments = JSON.parse(data);
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something broke!');
      }
      res.send(comments);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});