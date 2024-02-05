import express, { Express, Request, Response } from "express"
const server: Express = express()
server.use(express.json())
export default server