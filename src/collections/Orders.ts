import { CollectionConfig } from 'payload/types'

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
        update: () => true,
      },
    fields: [
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
            name: 'stripeCheckoutID',
            label: 'Stripe Checkout ID',
            type: 'text',
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'totalAmount',
            type: 'number',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
    ]
}