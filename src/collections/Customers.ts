import { CollectionConfig } from "payload/types";
import { deliveryAddress } from "../fields/deliveryAddress";
import { deliveryData } from "../fields/deliveryData";

export const Customers: CollectionConfig = {
    slug: 'customers',
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
        update: () => true,
      },
    fields: [
        {
            name: 'customerName',
            label: 'Imie i nazwisko',
            type: 'text',
            required: true
        },
        {
            name: 'registrationDate',
            label: 'Data rejestracji',
            type: 'date',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
        },
        {
            name: 'orders',
            label: 'Zamówienia',
            type: 'relationship',
            relationTo: 'orders',
            hasMany: true
        },
        {
            name: 'totalExpenses',
            label: 'Suma wydatków',
            type: 'number',
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'averageOrderValue',
            label: 'Średnia wartość zamówienia',
            type: 'number',
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'currency',
            label: 'Waluta',
            type: 'text',
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'phone',
            label: 'Telefon',
            type: 'text',
        },
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'address',
                    label: "Adres wysyłki",
                    fields: [
                        deliveryAddress
                    ]
                },
                {
                    name: 'billingDetails',
                    label: 'Dane rozliczeniowe',
                    fields: [
                        deliveryData
                    ]
                }
            ]
        }
    ]
}