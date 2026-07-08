/**
 * Prettier configuration.
 *
 * The Tailwind plugin sorts utility classes into Tailwind's recommended order
 * on every format. `tailwindFunctions` extends that sorting to classes passed
 * to our helpers (`cn`, `cva`) as well as `className` attributes.
 *
 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss
 * @type {import('prettier').Config}
 */
const config = {
  // Base style (matches how the codebase is already written)
  semi: true,
  singleQuote: false,
  trailingComma: 'es5',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',

  // Tailwind class sorting
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['cn', 'cva'],
}

export default config
