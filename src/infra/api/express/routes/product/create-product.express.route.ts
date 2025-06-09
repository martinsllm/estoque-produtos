import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import {
    CreateProductInputDto,
    CreateProductUsecase,
} from "../../../../../application/usecases/product"

export type CreateProductResponseDto = {
    id: string
}

export class CreateProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly productService: CreateProductUsecase
    ) {}

    public static create(productService: CreateProductUsecase) {
        return new CreateProductRoute(
            "/product",
            HttpMethod.POST,
            productService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { name, price, quantity } = req.body

            const input: CreateProductInputDto = {
                name,
                price,
                quantity,
            }

            const output: CreateProductResponseDto =
                await this.productService.execute(input)

            const responseBody = this.present(output)

            res.status(201).json(responseBody).send()
        }
    }
    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: CreateProductResponseDto): CreateProductResponseDto {
        return {
            id: input.id,
        }
    }
}
