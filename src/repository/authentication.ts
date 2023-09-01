import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Q156ap',
  database: 'postgres'
});

client.connect();

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const result = await client.query('SELECT id, password FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        done(null, { id: user.id });
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const result = await client.query('SELECT id FROM users WHERE id = $1', [payload.sub]);
    if (result.rows.length > 0) {
      done(null, { id: result.rows[0].id });
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ sub: req.user.id }, jwtOptions.secretOrKey);
  res.send({ token });
});

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  //res.send(`Hello user ${req.user.id}`);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
