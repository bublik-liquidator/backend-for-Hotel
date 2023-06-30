import express from 'express';
const router = express.Router();
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import  loginn  from '../service/loginService';

router.post("/", async (req, res) => {
  var login = loginn(req.body) 
 // loggerr.info("test"); 
  if(login==null){
    res.status(401).send();
  }else{
    return res.json(login);
  } 
});

export default router;
 

