import { Request, Response } from "express"

export type HttpMethod = "get" | "post" | "put"

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: "put" as HttpMethod,
} as const

export interface Route {
    getHandler(): (req: Request, res: Response) => Promise<void>
    getPath(): string
    getMethod(): HttpMethod
}
