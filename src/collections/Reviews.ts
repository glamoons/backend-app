import { CollectionConfig } from "payload/types";

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    fields: [
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            admin: {
                position: 'sidebar'
            },
            required: true
        },
        {
            name: 'author',
            type: 'text',
            localized: true,
            required: true
        },
        {
            name: 'description',
            type: 'richText',
            localized: true,
            required: true
        },
        {
            name: 'email',
            type: 'email',
            required: true
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 5,
            required: true
        }
    ]
}