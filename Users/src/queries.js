const {meetupValidation} = require("./validation/meetup").default;

const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DB_NAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
});


const getMeetup = (request, response) => {
  pool.query("SELECT * FROM meetup ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error; //исключение, те ошибка
    }
    response.status(200).json(results.rows); //запрос выполнен успешно
  });
};

const getMeetupById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("SELECT * FROM meetup WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        
        response.status(200).json(results.rows); //запрос выполнен успешно
    });
};

const createMeetup = (request, response) => {
    const {error} = meetupValidation(request.body);
    if (error) {
        res.send(schema.validate(req.body).error.details);
        return next({type: 'joi', error});
    }
    const {name, description, tag, place, time} = request.body; //request.query//body-parser извлекает всю часть тела входящего потока запросов и предоставляет ее req.body
    pool.query("INSERT INTO meetup(name, description, tag, place, time) VALUES ($1, $2, $3, $4, $5)", [name, description, tag, place, time],
        (error, results) => {
            if (error) {
                throw error;

            }
            
            response.status(201).send(`meetup added with name: ${request.body.name}`); // запрос выполнен успешно и привёл к созданию ресурса
        }
    );
};

const updateMeetup = (request, response) => {
    const {error} = meetupValidation(request.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).json({message: error.details[0].message});
    }
    const id = parseInt(request.params.id);
    const {name, description, tag, place, time} = request.body;

    pool.query(
        "UPDATE meetup SET name = $1, description = $2, tag = $3, place = $4, time = $5 WHERE id = $6", [name, description, tag, place, time, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            
            response.status(200).send(`meetup modified with ID: ${id}`); // запрос выполнен успешно
        }
    );
};

const deleteMeetup = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM Meetup WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        
        response.status(200).send(`Meetup deleted with ID: ${id}`); // запрос выполнен успешно
    });
};

module.exports = {
    getMeetup,
    getMeetupById,
    createMeetup,
    updateMeetup,
    deleteMeetup,
};
