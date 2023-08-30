/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-dupe-keys */
const express = require('express');
const path = require('node:path');
const { users, products } = require('../constants');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/historique.json');


router.post('/purchases', (req, res) => {
    const pseudo = req?.body?.pseudo?.length !== 0 ? req.body.pseudo : undefined;
    const ID = req?.body?.id > 0 ? req.body.id : undefined;
    const qty = req?.body?.qty > 0 ? req.body.qty : undefined;

    if (!pseudo || !ID) return res.sendStatus(400); // error code '400 Bad request'

    let userExists = false;

    users.forEach(user => {
    if (user === pseudo) {
    userExists = true;
    }
    });

    const product = products;
    let idExists = false;

    product.forEach(producte => {
    if (producte.id === ID) {
    idExists = true;
    }
    });

    if (!userExists || !idExists){
        return res.sendStatus(400);
    }
  
    const achats = parse(jsonDbPath);
    const lastItemIndex = achats?.length !== 0 ? achats.length - 1 : undefined;
    const lastId = lastItemIndex ? achats[lastItemIndex]?.id : undefined;
    const nextId = lastItemIndex !== 0 ? lastId + 1 : 1;
  
    const newAchat = {
      id: nextId,
      user: pseudo,
      id: ID,
      qty,
    };
  
    achats.push(newAchat);
  
    serialize(jsonDbPath, achats);
  
    return res.json(newAchat);
  });



  router.get('/purchases/:id', (req, res) => {
  
    const achats = parse(jsonDbPath);
    const idInRequest = parseInt(req.params.id, 10);

    let idPresent = false;
    products.forEach(product => {
        if(product.id === idInRequest){
          idPresent = true;
        }
    })

    if (!idPresent){
      return res.sendStatus(400);
    }
    const userTotals = {};

    achats.forEach(achatse => {
    
    if (achatse.id === idInRequest) {
      const qty = parseFloat(achatse.qty);
   
        userTotals[achatse.user] = (userTotals[achatse.user] || 0) + qty;

      }
    });  

    let userMaxQty = "none";
    let qtyMax = 0;
    Object.keys(userTotals).forEach(user => {
      if (userTotals[user] > qtyMax) {
        userMaxQty = user;
        qtyMax = userTotals[user];
      }
    });

  
    
    return res.json(userMaxQty);
  });


  router.get('/recommendations/:user', (req, res) => {
    const userRequest = req.params.user;

    let idPresent = false;
    users.forEach(user => {
        if(user === userRequest){
          idPresent = true;
        }
    })

    if (!idPresent){
      return res.sendStatus(400);
    }

    const recommendations = products[0];
    
    return res.json(recommendations);
  });

  module.exports = router;