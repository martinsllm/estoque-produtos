import { Product } from "../../../domain/product/entity/product"
import { ProductGateway } from "../../../domain/product/gateway/product.gateway"
import { Usecase } from "../usecase"

export type GetProductInputDto = {
    id: string
}

export type GetProductOutputDto = {
    id: string
    name: string
    price: number
    quantity: number
}

export class GetProductUsecase
    implements Usecase<GetProductInputDto, GetProductOutputDto>
{
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new GetProductUsecase(productGateway)
    }

    public async execute(
        input: GetProductInputDto
    ): Promise<GetProductOutputDto> {
        const product = await this.productGateway.listOne(input.id)

        const output = this.presentOutput(product)

        return output
    }

    private presentOutput(product: Product): GetProductOutputDto {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }
    }
}
