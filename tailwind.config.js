/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        "gem-onyx": "#323234",
        "gem-crystal": "#FCFAF9",
        "gem-sapphire": "#495363",
      },
    },
  },
  plugins: [],
};
