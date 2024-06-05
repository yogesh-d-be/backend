const express = require('express');

const {addToCart, removeFromCart, getCart, deleteFromCart} = require('../Controller/CartController')
const {verifyToken} = require('../Middleware/Auth')

const cartRouter = express.Router();

cartRouter.post("/add",verifyToken,addToCart)
cartRouter.post("/remove",verifyToken,removeFromCart)
cartRouter.post("/delete",verifyToken,deleteFromCart)
cartRouter.post("/get",verifyToken,getCart)


module.exports = cartRouter;