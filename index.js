import express from "express"
import { dataBase } from "./config/dataBase.js"

import { customerRouter } from './router/customerRouter.js'
import { productsRouter } from './router/productsRouter.js'

import path from 'path'

const port = 3000

const app = express()
app.use(express.urlencoded({extended:true}))

try {

  await dataBase.authenticate()
  dataBase.sync()

  console.log('Conection OK!')

} catch (error) {

  console.log(error)

}

app.use('/public', express.static('public'));

app.use('/customer', customerRouter)
app.use('/products', productsRouter)


app.set('view engine', 'pug')
app.set('views', './views')

app.listen( port , () => {
  console.log(`Server running on port ${ port }`)
})