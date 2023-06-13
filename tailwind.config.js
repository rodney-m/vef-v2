/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./apps/admin-portal/src/**/*.{html,ts}",
    "./apps/website/src/**/*.{html,ts}",
    "./libs/ui/authentication/src/**/*.{html,ts}",
    "./libs/ui/occassions/src/**/*.{html,ts}",
    "./libs/ui/layout/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

