var express = require('express');
const { serialize, parse } = require('../utils/json');
const { register, login } = require('../models/users');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/users.json';

router.post('/register', (req, res) => {
    const username = req?.body?.username?.lenght !== 0 ? req.body.username : undefined;
    const password = req?.body?.password?.lenght !== 0 ? req.body.password : undefined;
    
  if (!username || !password) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = register(username, password);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  return res.json(authenticatedUser);

});

router.post('/login', (req,res) => {
    const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
    const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  
    if (!username || !password) return res.sendStatus(400); // 400 Bad Reques
  
    const authenticatedUser = login(username, password);
  
    if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized
  
    return res.json(authenticatedUser);
});

module.exports = router;
