import {
    CreateProductUsecase,
    ListProductsUsecase,
} from "./application/usecases/product"
import { prisma } from "./data/prisma/prisma"
import { ApiExpress } from "./infra/api/express/api.expres"
import {
    CreateProductRoute,
    ListProductsRoute,
} from "./infra/api/express/routes/product"
import { ProductRepositoryPrisma } from "./infra/repositories/product.repository.prisma"

const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

const createProductUsecase = CreateProductUsecase.create(
    productRepositoryPrisma
)

const listProductUsecase = ListProductsUsecase.create(productRepositoryPrisma)

const createProductRoute = CreateProductRoute.create(createProductUsecase)

const listProductsRoute = ListProductsRoute.create(listProductUsecase)

function main() {
    const port = Number(process.env.PORT)

    const api = ApiExpress.create([createProductRoute, listProductsRoute])

    api.start(port)
}

main()
