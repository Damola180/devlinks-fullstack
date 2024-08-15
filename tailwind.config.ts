import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "vector-3": "url('/Vector (3).png')",
        "vector-profile": "url('/profile hover.png')",
        "vector-2": "url('/Vector (2).png')",
        "unactive-link": "url('/unactive link.png')",
        "preview-bg": "url('/Union.png')",
        "github-bg": "url('/github img.png')",
        inlink: "url('/inlink.png')",
      },
      boxShadow: {
        custom: "0px 0px 32px 0px #633CFF40",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      bermuda: "#737373",

      Color1: "#633CFF",
      Color2: "#D9D9D9",
      Color3: "#BEADFF",
      Color4: "#888888",
      Color5: " #FF3939",
      Color6: "#EFEBFF",
      Color7: "#BEADFF",
      Color8: " #FAFAFA",
      Color9: "#333333",
      Color10: "#EEEEEE",
    },
  },
  plugins: [],
};
export default config;
