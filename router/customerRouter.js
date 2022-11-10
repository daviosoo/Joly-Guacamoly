import express from "express";

import { dataBase } from '../config/dataBase.js'
import { createCustomerForm, createCustomer } from "../controllers/customerController.js";

const customerRouter = express.Router()

customerRouter.get('/register', createCustomerForm)
customerRouter.post('/register', createCustomer)

export {
    customerRouter
}