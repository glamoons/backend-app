import { CollectionConfig } from "payload/types";

export const Cart: CollectionConfig = {
    slug: 'cart',
    fields: [
        {
            name: 'productId',
            filterOptions: ({ id }) => {
                if (id) {
                    return {
                        productId: {
                            equals: id
                        }
                    }
                    
                }
            },
            type: 'relationship',
            relationTo: 'products',
        },
        {
            name: 'productVariantId',
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