export interface ProductProps {
    id: string
    name: string
    price: number
    quantity: number
}

export class Product implements ProductProps {
    private constructor(private props: ProductProps) {}

    public static create(props: Omit<ProductProps, "id">) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name: props.name,
            price: props.price,
            quantity: props.quantity,
        })
    }

    public static with(props: ProductProps) {
        return new Product(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get price() {
        return this.props.price
    }

    public get quantity() {
        return this.props.quantity
    }

    public decreaseQuantity(quantity: number) {
        if (this.props.quantity) this.props.quantity -= quantity
    }

    public increaseQuantity(quantity: number) {
        this.props.price += quantity
    }
}
