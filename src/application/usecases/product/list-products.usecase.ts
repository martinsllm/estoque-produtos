import { Product } from "../../../domain/product/entity/product"
import { ProductGateway } from "../../../domain/product/gateway/product.gateway"
import { Usecase } from "../usecase"

export type ListProductsInputDto = {
    name: string
}

export type ListProductsOutputDto = {
    products: {
        id: string
        name: string
        price: number
        quantity: number
    }[]
}

export class ListProductsUsecase
    implements Usecase<ListProductsInputDto, ListProductsOutputDto>
{
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new ListProductsUsecase(productGateway)
    }

    public async execute(
        input: ListProductsInputDto
    ): Promise<ListProductsOutputDto> {
        const products = await this.productGateway.list(input.name)

        const output = this.presentOutput(products)

        return output
    }

    private presentOutput(products: Product[]): ListProductsOutputDto {
        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                }
            }),
        }
    }
}
