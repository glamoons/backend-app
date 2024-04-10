import { Block } from "payload/types";
import { Color } from "../Color";
import { Shape } from "../Shape";
import { Size } from "../Size";

export const ProductVariant:Block = {
    slug: "product-variant",
    interfaceName: "variant",
    fields: [
       {
            name: "isDefault",
            type: "checkbox",
            defaultValue: false
       },
       {
            name: "sku",
            type: "text",
            defaultValue: "SHAPE_COLOR_SIZE",
            required: true
        },
       {
            name: "items",
            label: "Wariant",
            type: "blocks",
            blocks: [
                Color,
                Shape,
                Size
            ],
        }
    ]
}