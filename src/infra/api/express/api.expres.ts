import { Api } from "../api"
import express, { Express } from "express"
import { errorMiddleware } from "../middlewares/errors/error.middleware"
import { Route } from "./routes/route"

export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())
        this.addRoutes(routes)
        this.app.use(errorMiddleware)
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()
            this.app[method](path, handler)
        })
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    }
}
