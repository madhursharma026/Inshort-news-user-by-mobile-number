module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Scans all files in the 'app' directory and subdirectories
    "./components/**/*.{js,jsx,ts,tsx}", // Scans all files in the 'components' directory and subdirectories
    "./app.js", // Scans the main 'app.js' file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
