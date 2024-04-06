import { CollectionConfig } from 'payload/types'

export const Products: CollectionConfig = {
  slug: 'products',
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
    unique: true
   },
   {
    name: 'description',
    type: 'richText',
    localized: true,
    required: true
   },
   {
    name: 'gallery',
    type: 'upload',
    relationTo: 'media',
    required: true
   },
   {
    name: 'price',
    type: 'number',
    required: true
   }
  ],
  graphQL: {
    pluralName: 'products',
    singularName: 'product',
}
}
