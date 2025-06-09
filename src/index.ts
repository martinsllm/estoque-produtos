import { CreateProductUsecase } from "./application/usecases/product"
import { prisma } from "./data/prisma/prisma"
import { ApiExpress } from "./infra/api/express/api.expres"
import { CreateProductRoute } from "./infra/api/express/routes/product"
import { ProductRepositoryPrisma } from "./infra/repositories/product.repository.prisma"

const productRepositoryPrisma = ProductRepositoryPrisma.create(prisma)

const createProductUsecase = CreateProductUsecase.create(
    productRepositoryPrisma
)

const createProductRoute = CreateProductRoute.create(createProductUsecase)

function main() {
    const port = Number(process.env.PORT)

    const api = ApiExpress.create([createProductRoute])

    api.start(port)
}

main()
