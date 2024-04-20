import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { Media } from './collections/Media'
import { OrdersItems } from './collections/OrderItems'
import { Orders } from './collections/Orders'
import { Products } from './collections/Products'
import { Reviews } from './collections/Reviews'
import Users from './collections/Users'
import { Customers } from './collections/Customers'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Products, Media, Reviews, Orders, OrdersItems, Customers],
  // csrf: ["https://dev.glamoons.com", 'http://localhost:3000'],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: false,
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    migrationDir: path.join(__dirname, 'migrations'),
  }),
})
