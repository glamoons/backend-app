import { CollectionConfig } from "payload/types";

export const Cart: CollectionConfig = {
    slug: 'cart',
    fields: [
        {
            name: 'product',
            type: 'text',
            required: true
        },
        {
            name: 'productVariant',
            type: 'text',
            required: true
        },
        {
            name: 'quantity',
            type: 'number',
            required: true
        }
    ]
}