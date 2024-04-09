import { Block } from "payload/types";

export const Shape:Block = {
    slug: "shape",
    interfaceName: "Shape",
    fields: [
        {
            name: "shape",
            label: "Kształt",
            type: "select",
            defaultValue: "circle",
            options: [
                {
                    label: "Koło",
                    value: "circle"
                },
                {
                    label: "Kwadrat",
                    value: "square"
                },
                {
                    label: "Prostokąt",
                    value: "rectangle"
                },
            ]
        },
    ],
}