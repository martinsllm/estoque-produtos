import { PrismaClient } from "@prisma/client"
import { Product } from "../../domain/product/entity/product"
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
}
