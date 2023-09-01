"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Q156ap',
    database: 'postgres'
});
client.connect();
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query('SELECT id, password FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (yield bcrypt_1.default.compare(password, user.password)) {
                done(null, { id: user.id });
            }
            else {
                done(null, false);
            }
        }
        else {
            done(null, false);
        }
    }
    catch (err) {
        done(err);
    }
})));
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query('SELECT id FROM users WHERE id = $1', [payload.sub]);
        if (result.rows.length > 0) {
            done(null, { id: result.rows[0].id });
        }
        else {
            done(null, false);
        }
    }
    catch (err) {
        done(err);
    }
})));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send('User created');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
}));
app.post('/login', passport_1.default.authenticate('local', { session: false }), (req, res) => {
    const token = jsonwebtoken_1.default.sign({ sub: req.user.id }, jwtOptions.secretOrKey);
    res.send({ token });
});
app.get('/profile', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    //res.send(`Hello user ${req.user.id}`);
});
app.listen(3000, () => console.log('Server listening on port 3000'));
