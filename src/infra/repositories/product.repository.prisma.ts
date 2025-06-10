import { PrismaClient } from "@prisma/client"
import { Product, ProductProps } from "../../domain/product/entity/product"
import { ProductGateway } from "../../domain/product/gateway/product.gateway"
import { NotFoundError } from "../api/middlewares/errors/helpers/api-errors"

export class ProductRepositoryPrisma implements ProductGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient)
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }

        await this.prismaClient.product.create({
            data,
        })
    }

    public async list(name: string): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany({
            where: {
                name: {
                    startsWith: name,
                    mode: "insensitive",
                },
            },
        })

        const productList = products.map((p: any) => {
            const product = this.present(p)
            return product
        })

        return productList
    }

    public async listOne(id: string): Promise<Product> {
        const product = await this.prismaClient.product.findFirst({
            where: { id },
        })

        if (!product) throw new NotFoundError("Product Not Found")

        const productObject = this.present(product)

        return productObject
    }

    private present(data: ProductProps) {
        const product = Product.with({
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
        })

        return product
    }
}
