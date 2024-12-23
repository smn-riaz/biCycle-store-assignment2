import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import productRouter from './module/product/product.router'
import orderRouter from './module/order/order.router'

const app:Application = express()


app.use(express.json())
app.use(cors())


app.get('/', (req:Request, res:Response)=> {
    res.send("App is running")
})



app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)




export default app