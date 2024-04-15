import { CollectionConfig } from 'payload/types'

export const OrdersItems: CollectionConfig = {
    slug: 'orderItems',
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
        update: () => true,
      },
    fields: [
        {
            name: 'order',
            label: 'Id koszyka',
            type: 'relationship',
            relationTo: 'orders',
            required: true
        },
        {
            name: 'quantity',
            label: 'Ilość',
            type: 'number',
            required: true
        },
        {
            name: 'totalAmount',
            label: 'Suma całkowita',
            type: 'number',
            required: true
        },
        {
            name: 'product',
            label: 'Produkt',
            type: 'relationship',
            relationTo: 'products',
            required: true
        },
        {
            name: 'productVariantId',
            label: 'Wariant',
            type: 'text',
            required: true
        },
    ]
}