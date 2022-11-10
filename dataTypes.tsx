// Shop
export interface product {
    id: number,
    sku: number,
    category_id: number,
    name: string,
    price: number,
    parametrs: string
}
export interface category {
    id: number,
    name: string,
    products:  product[]
}
// Form
export interface productFields {
    id: number,
    sku: number,
    category_id: number,
    name: string,
    price: number,
    parametrs: string
}