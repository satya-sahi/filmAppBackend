


const { Client } = require('pg');
// Connection details
const client = new Client({
    user: 'postgres',        // Replace with your PostgreSQL username
    host: 'localhost',               // Host, use 'localhost' if running locally
    database: 'dvdrental',  // Name of the database you are connecting to
    password: 'password',    // Replace with your PostgreSQL password
    port: 5432,                      // Default PostgreSQL port
});

client.connect()
    .then(() => {
        console.log("Database connection established")
    })
    .catch((error) => {
        console.log("Some error occurred", error)
    })


//Function calls

const getFilms = async (req, res) => {
    try {
        const query = 'SELECT * FROM film where is_active=1;';
        const result = await client.query(query);
        res.status(200).json({
            "message": "Success",
            "response": result.rows
        });
    } catch (error) {
        res.status(500).send({
            "message": "Error",
            "response": error.message
        });
    }
};

const deleteFilm = async (req, res) => {
    try {
        const film_id = req.params.id
        const query = 'update film set is_active=0 where film_id=' + film_id + ', last_update=NOW() returning title'
        const result = await client.query(query);
        res.status(200).json({
            "message": "Success",
            "name": result.rows[0].title
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Error",
            "response": error.message
        });
    }
};

const editFilm = async (req, res) => {
    try {
        let body = req.body
        console.log(req)
        // const query= 'update film set is_active=0 where film_id='+film_id
        const result = await client.query(query);
        res.status(200).json({
            "message": "Success",
            "response": result.rows
        });
    } catch (error) {
        res.status(500).send({
            "message": "Error",
            "response": error.message
        });
    }
};

const getLanguages = async (req, res) => {
    try {
        const query = 'select * from language'
        const result = await client.query(query);
        res.status(200).json({
            "message": "Success",
            "data": result.rows
        });
    } catch (error) {
        res.status(500).send({
            "message": "Error",
            "response": error.message
        });
    }
};

const addFilm = async (req, res) => {
    try {
        let { title, description, releaseYear, rentDuration, language, rentalRate, rating } = req.body
        const query = `Insert into film (title,description, release_year, language_id, rental_duration, rental_rate, rating) values ('${title}', '${description}', ${releaseYear},${language}, ${rentDuration}, ${rentalRate}, '${rating}')`
        console.log(query)
        const result = await client.query(query);
        res.status(200).json({
            "message": "Success",
            "data": result.rows
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Error",
            "response": error.message
        });
    }
}

module.exports = {
    getFilms,
    deleteFilm,
    editFilm,
    getLanguages,
    addFilm
}