"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADMIN_TOKEN = 'Adcg4ddad';
const ADMIN_ID = 1;
const MANAGER_TOKEN = 'Mangergkl4b574cd';
const MANAGER_ID = 2;
const USER_TOKEN = 'UserfV58dcd';
const USER_ID = 3;
const loginResponse_dto_1 = require("../dto/loginResponse.dto");
var logResponse = new loginResponse_dto_1.loginResponse();
function loginn(loginRequest) {
    logResponse.login = loginRequest.login;
    if ((loginRequest.login == 'admin' && loginRequest.password == 'admin')) {
        logResponse.id = (ADMIN_ID);
        logResponse.token = ADMIN_TOKEN;
        return logResponse; // inside ADMIN_TOKEN + roles[] + login
    }
    if ((loginRequest.login == 'manager' && loginRequest.password == 'manager')) {
        logResponse.id = (MANAGER_ID);
        logResponse.token = MANAGER_TOKEN;
        return logResponse; // inside ADMIN_TOKEN + roles[] + login
    }
    if ((loginRequest.login == 'user' && loginRequest.password == 'user')) {
        logResponse.id = (USER_ID);
        logResponse.token = USER_TOKEN;
        return logResponse; // inside ADMIN_TOKEN + roles[] + login
    }
    else {
        return null; // + status 401, empty response
    }
}
// if (loginResponse) {
//   res.status(200).send(loginResponse);
// } else {
// res.status(401).send(); // empty response
// }
exports.default = loginn;
////the same for the user
//loginRequest:login pass
//loginResponse: login, roles[], token
