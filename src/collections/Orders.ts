import { CollectionConfig } from 'payload/types'

export const Orders: CollectionConfig = {
    slug: 'orders',
    fields: [
        {
            name: 'lines',
            type: 'json',
            admin: {
                position: 'sidebar'
            },
            required: true
        },
        {
            name: 'status',
            type: 'radio',
             options: [
                {
                    label: 'Cancelled',
                    value: 'cancelled',
                },
                {
                    label: 'Created',
                    value: 'created',
                },
                {
                    label: 'Fulfilled',
                    value: 'fulfilled',
                },
                {
                    label: 'Paid',
                    value: 'paid',
                },
            ]
        },
        {
            name: 'totalAmount',
            type: 'number',
            required: true
        }
    ]
}