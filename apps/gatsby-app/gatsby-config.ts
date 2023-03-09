import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ['gatsby-plugin-pnpm'],
  flags: {
    PARTIAL_HYDRATION: true,
  },
}

export default config
