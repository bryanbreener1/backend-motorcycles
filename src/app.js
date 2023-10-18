import express from 'express'
import { router } from './routes/routes.js'
import { globalErrorHandler } from './errors/error.controller.js'
import { AppError } from './errors/appError.js'
import { envs } from './config/enviroments/enviroments.js'
import { enableMorgan } from './config/plugins/morgan.plugin.js'

const app = express()
app.use(express.json())
app.use("/api/v1", router)

if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
}


app.all('*',(req, res, next) =>{
    next(new AppError(`the route ${req.originalUrl} does not exist in this server`, 404))
})

app.use(globalErrorHandler)

export default app