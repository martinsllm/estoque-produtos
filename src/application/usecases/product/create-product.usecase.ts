import z from "zod"
import { ProductGateway } from "../../../domain/product/gateway/product.gateway"
import { CreateProductSchema } from "../../validation/product/product.schema"
import { Usecase } from "../usecase"
import { Product } from "../../../domain/product/entity/product"

export type CreateProductInputDto = z.infer<typeof CreateProductSchema>

export type CreateProductOutputDto = {
    id: string
}

export class CreateProductUsecase
    implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new CreateProductUsecase(productGateway)
    }

    public async execute(
        input: CreateProductInputDto
    ): Promise<CreateProductOutputDto> {
        CreateProductSchema.parse(input)

        if (!input.quantity) input.quantity = 0

        const product = Product.create({
            name: input.name,
            price: input.price,
            quantity: input.quantity,
        })

        await this.productGateway.save(product)

        const output = this.presentOutput(product)

        return output
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        return {
            id: product.id,
        }
    }
}
