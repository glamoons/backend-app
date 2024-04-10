import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { Reviews } from './collections/Reviews'
import { Orders } from './collections/Orders'
import { Cart } from './collections/Cart'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Products, Media, Reviews, Orders, Cart],
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
