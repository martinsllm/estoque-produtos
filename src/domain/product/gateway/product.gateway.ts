import { Product } from "../entity/product"

export interface ProductGateway {
    save(data: Product): Promise<Product>
}
