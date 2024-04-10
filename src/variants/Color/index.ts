import { Block } from "payload/types";

export const Color:Block = {
    slug: "color",
    interfaceName: "Color",
    labels: {
        singular: "Color",
        plural: "Colors"
    },
    fields: [
        {
            name: "color",

            type: "select",
            defaultValue: "coldWhite",
            hasMany: true,
            options: [
                {
                    label: "Zimny biały",
                    value: "coldWhite"
                },
                {
                    label: "Ciepły biały",
                    value: "warmWhite"
                }
            ]
        }
    ]
}