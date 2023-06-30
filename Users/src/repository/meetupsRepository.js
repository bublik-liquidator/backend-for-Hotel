const schema = require("../validation/meetup");
const pino = require("pino");
const pretty = require("pino-pretty");
const loggerr = pino(pretty());
const db = require("../config/dbProvider");

const paginate = require("../pagination/pagination");

loggerr.info(process.env.POSTGRESQL_PORT);

async function getAll(page, size) {
  const { rows } = await db.pool.query(
    'SELECT * FROM meetup ORDER BY id OFFSET $1 LIMIT $2',
    [(page - 1) * size, size]
  ); 
  return rows;  
}


function save(req, res) {
  
   {
    meetup = req.body;
    const { name, description, tag, place, time } = meetup;
    db.pool.query(
      "INSERT INTO meetup(name, description, tag, place, time) VALUES ($1, $2, $3, $4, $5)",
      [name, description, tag, place, time],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
    meetupsData.push(meetup);
    return meetup;
  }
}

async function getById(id) {
  const query = "SELECT * FROM meetup WHERE id = $1";
  const values = [id];
  const { rows } = await db.pool.query(query, values);
  loggerr.info("meetupID name " + rows[0].name);
  return rows[0];
}

async function deleteById(id) {
  const query = {
    text: "DELETE FROM meetup WHERE id = $1",
    values: [id],
  };

  try {
    const res = await db.pool.query(query);
    return res.rowCount;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
