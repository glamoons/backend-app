import { CollectionConfig } from "payload/types";

export const Cart: CollectionConfig = {
    slug: 'cart',
    fields: [
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true
        },
        {
            name: 'quantity',
            type: 'number',
            required: true
        }
    ]
}