import { Field } from "payload/types";

export const deliveryAddress:Field = {
    name: "deliveryAddress",
    label: false,
    type: 'group',
    fields: [
        {
            label: "Adres dostawy",
            type: 'collapsible',
            required: true,
            fields: [
                {
                    name: 'deliveryStreet',
                    label: 'Ulica',
                    type: 'text',
                },
                {
                    name: 'deliveryCity',
                    label: 'Miasto',
                    type: 'text',
                },
                {
                    name: 'deliveryPostalCode',
                    label: 'Kod pocztowy',
                    type: 'text',
                },
                {
                    name: 'deliveryCountry',
                    label: 'Kraj',
                    type: 'text',
                }
            ]
        }
    ]
}