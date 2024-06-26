import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");
// /** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            // ここでlineLengthを変更します
            maxWidth: 'none', // 例: 折り返しを無効にする場合
            // または特定の値に設定する場合
            // maxWidth: theme('spacing.96'), // 96の代わりに好きな値を指定
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    nextui()
  ],
}
export default config
