import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    GetProductInputDto,
    GetProductOutputDto,
    GetProductUsecase,
} from "../../../../../application/usecases/product"

export type GetProductResponseDto = {
    id: string
    name: string
    price: number
    quantity: number
}

export class GetProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly productService: GetProductUsecase
    ) {}

    public static create(productService: GetProductUsecase) {
        return new GetProductRoute(
            "/product/:id",
            HttpMethod.GET,
            productService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { id } = req.params

            let input: GetProductInputDto = {
                id,
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

    private present(input: GetProductOutputDto): GetProductResponseDto {
        const response: GetProductResponseDto = {
            id: input.id,
            name: input.name,
            price: input.price,
            quantity: input.quantity,
        }

        return response
    }
}
