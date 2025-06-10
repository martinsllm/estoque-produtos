import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    ListProductsInputDto,
    ListProductsOutputDto,
    ListProductsUsecase,
} from "../../../../../application/usecases/product"

export type ListProductsResponseDto = {
    products: {
        id: string
        name: string
        price: number
        quantity: number
    }[]
}

export class ListProductsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly productService: ListProductsUsecase
    ) {}

    public static create(productService: ListProductsUsecase) {
        return new ListProductsRoute(
            "/products/",
            HttpMethod.GET,
            productService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const name = JSON.stringify(req.query.name)

            let input: ListProductsInputDto = {
                name: "",
            }

            if (name) {
                input = {
                    name: name.replace(/"/g, ""),
                }
            }

            const output = await this.productService.execute(input)

            const responseBody = this.present(output)

            res.status(200).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: ListProductsOutputDto): ListProductsResponseDto {
        const response: ListProductsResponseDto = {
            products: input.products.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            })),
        }

        return response
    }
}
