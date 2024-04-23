import type { Config } from 'tailwindcss'
import flowbitePlugin from "flowbite/plugin";
import flowbite from "flowbite-react/tailwind"

export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      width: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
} satisfies Config

