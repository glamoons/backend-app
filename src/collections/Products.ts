import { CollectionConfig } from 'payload/types'
import { Color } from '../variants/Color'
import { Shape } from '../variants/Shape'
import { Size } from '../variants/Size'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true,
  },
  fields: [
   {
     name: 'name',
     type: 'text',
     localized: true,
     required: true,
     unique: true
   },
   {
    name: 'slug',
    type: 'text',
    localized: true,
    required: true,
    unique: true,
    admin: {
      position: 'sidebar',
    }
   },
   {
    name: 'description',
    type: 'richText',
    localized: true,
    required: true
   },
   {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true
   },
   {
    name: 'price',
    type: 'number',
    required: true
   },
   {
    name: 'rating',
    type: 'number',
    min: 0,
    max: 5,
    admin: {
        position: 'sidebar'
    }
   },
   {
    name: 'variants',
    type: 'blocks',
    required: true,
    blocks: [Color, Shape, Size]
   }
  ],
  graphQL: {
    pluralName: 'products',
    singularName: 'product',
}
}
