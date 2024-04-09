import { Block } from "payload/types";

export const Size:Block = {
    slug: 'size',
    interfaceName: 'Size',
    fields: [
        {
            name: "size",
            label: "Rozmiar",
            type: "select",
            defaultValue: "30",
            options: [
                {
                    label: "30cm",
                    value: "30"
                },
                {
                    label: "40cm",
                    value: "40"
                },
                {
                    label: "50cm",
                    value: "50"
                },
                {
                    label: "60cm",
                    value: "60"
                },
                {
                    label: "70cm",
                    value: "70"
                },
                {
                    label: "80cm",
                    value: "80"
                },
            ]
        },
    ]
}