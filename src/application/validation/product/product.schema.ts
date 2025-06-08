import z from "zod"

export const CreateProductSchema = z.object({
    name: z.string().min(5),
    price: z.number().positive(),
    quantity: z.number().positive().optional(),
})
