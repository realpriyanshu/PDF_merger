const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const { PDFmerger } = require('./merger');
const upload = multer({ dest: 'uploads/' });
const port = 2000;
var uniqid = require('uniqid'); 
app.use("/static",express.static('public'))

// Define the path to your HTML file
const indexPath = path.join(__dirname, 'index.html');

// Serve the HTML file at the root path
app.get('/', (req, res) => { 
    res.sendFile(indexPath);
});

// Set up multer for file upload

let id 
// Handle POST request to merge PDFs
app.post('/processpdf', upload.array('pdfs', 2), async function (req, res, next ,id= uniqid()) {
   await PDFmerger(req.files[0].path,req.files[1].path,id)
 res.redirect(`http://localhost:2000/static/${id}_merged.pdf`)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
