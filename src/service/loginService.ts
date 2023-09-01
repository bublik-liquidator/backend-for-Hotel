
const ADMIN_TOKEN = 'Adcg4ddad';
const ADMIN_ID = 1;

const MANAGER_TOKEN = 'Mangergkl4b574cd';
const MANAGER_ID = 2;

const USER_TOKEN = 'UserfV58dcd';
const USER_ID = 3;

import { LoginDTO } from "../dto/login.dto";
import { loginResponse } from "../dto/loginResponse.dto";
var logResponse = new loginResponse();
function loginn(loginRequest:LoginDTO){    
    logResponse.login=loginRequest.login;

    if ((loginRequest.login == 'admin' && loginRequest.password == 'admin')) {
      logResponse.id=(ADMIN_ID);
      logResponse.token=ADMIN_TOKEN;
      return logResponse; // внутри ADMIN_TOKEN + roles[] + login
    }    
    if ((loginRequest.login == 'manager' && loginRequest.password == 'manager')) {
      logResponse.id=(MANAGER_ID);
      logResponse.token=MANAGER_TOKEN;
      return logResponse; // внутри ADMIN_TOKEN + roles[] + login
    } 
    if ((loginRequest.login == 'user' && loginRequest.password == 'user')) {
      logResponse.id=(USER_ID);
      logResponse.token=USER_TOKEN;
      return logResponse; // внутри ADMIN_TOKEN + roles[] + login
    } 
    else {
      return null; // + статус 401, пустой ответ
    }
    
    
}
// if (loginResponse) {
//   res.status(200).send(loginResponse);
// } else {
//   res.status(401).send(); // пустой ответ
// }


export default loginn;

//тоже смаое для юзера


//loginRequest:login pass

//loginResponse: login, roles[], token