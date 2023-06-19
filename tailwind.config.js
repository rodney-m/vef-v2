/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./apps/admin-portal/src/**/*.{html,ts}",
    "./apps/website/src/**/*.{html,ts}",
    "./libs/ui/add-on/src/**/*.{html,ts}",
    "./libs/ui/authentication/src/**/*.{html,ts}",
    "./libs/ui/occassions/src/**/*.{html,ts}",
    "./libs/ui/bouquet/src/**/*.{html,ts}",
    "./libs/website-ui/src/**/*.{html,ts}",
    "./libs/ui/layout/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#971c26',
        lightPrimary: '#ac4951'
      }
    },
  },
  plugins: [],
}

