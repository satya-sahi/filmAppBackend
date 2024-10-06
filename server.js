const express = require('express');
const backendFunctions = require('./mainAPI')
const app = express();
const cors = require('cors')
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200', // Allow your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods
    credentials: true, // Allow credentials
  }));

app.get('/getFilms', backendFunctions.getFilms)
app.put('/editFilm', backendFunctions.editFilm)
app.delete('/deleteFilm/:id', backendFunctions.deleteFilm)
app.get('/languages', backendFunctions.getLanguages)
app.post('/addFilm',backendFunctions.addFilm)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});