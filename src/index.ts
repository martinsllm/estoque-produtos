import {
    CreateProductUsecase,
    GetProductUsecase,
    ListProductsUsecase,
} from "./application/usecases/product"
import { prisma } from "./data/prisma/prisma"
import { ApiExpress } from "./infra/api/express/api.expres"
import {
    CreateProductRoute,
    ListProductsRoute,
} from "./infra/api/express/routes/product"
import { GetProductRoute } from "./infra/api/express/routes/product/get-product.express.route"
import { ProductRepositoryPrisma } from "./infra/repositories/product.repository.prisma"

const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

const createProductUsecase = CreateProductUsecase.create(
    productRepositoryPrisma
)

const listProductUsecase = ListProductsUsecase.create(productRepositoryPrisma)

const getProductUsecase = GetProductUsecase.create(productRepositoryPrisma)

const createProductRoute = CreateProductRoute.create(createProductUsecase)

const listProductsRoute = ListProductsRoute.create(listProductUsecase)

const getProductRoute = GetProductRoute.create(getProductUsecase)

function main() {
    const port = Number(process.env.PORT)

    const api = ApiExpress.create([
        createProductRoute,
        listProductsRoute,
        getProductRoute,
    ])

    api.start(port)
}

main()
