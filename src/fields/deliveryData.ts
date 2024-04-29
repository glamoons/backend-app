import { Field } from "payload/types";

export const deliveryData:Field = {
    name: "deliveryData",
    label: false,
    type: 'group',
    fields: [
        {
            label: 'Dane rozliczeniowe klienta',
            type: 'collapsible',
            required: true,
            fields: [
                {
                    name: 'street',
                    label: 'Ulica',
                    type: 'text',
                },
                {
                    name: 'city',
                    label: 'Miasto',
                    type: 'text',
                },
                {
                    name: 'postalCode',
                    label: 'Kod pocztowy',
                    type: 'text',
                },
                {
                    name: 'country',
                    label: 'Kraj',
                    type: 'text',
                },
                {
                    name: 'companyName',
                    label: 'Nazwa firmy',
                    type: 'text',
                },
                {
                    name: 'vatId',
                    label: 'NIP',
                    type: 'text',
                    minLength: 10,
                }
            ]
        }
    ]
}