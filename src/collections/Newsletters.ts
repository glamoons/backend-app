import { CollectionConfig } from "payload/types";

export const Newsletters: CollectionConfig = {
    slug: 'newsletter',
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
        update: () => true,
      },
    fields: [
        {
            name: 'listIds',
            type: 'array',
            required: true,
            minRows: 1,
            labels: {
                singular: 'List ID',
                plural: 'List IDs'
            },
            fields: [
                {
                    name: 'listId',
                    type: 'text',
                    required: true
                },
                {
                    name: 'title',
                    label: 'Tytuł',
                    type: 'text',
                }
            ]
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
        },
    ]
}