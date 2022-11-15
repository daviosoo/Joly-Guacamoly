import express from "express";

import { dataBase } from '../config/dataBase.js'
import { createProductsForm, createProducts } from "../controllers/productsController.js";

const productsRouter = express.Router()

productsRouter.get('/register', createProductsForm)
productsRouter.post('/register', createProducts)

export {
    productsRouter
}