import { Product } from "../entity/product"

export interface ProductGateway {
    save(product: Product): Promise<void>
    list(name: string): Promise<Product[]>
    listOne(id: string): Promise<Product>
}
