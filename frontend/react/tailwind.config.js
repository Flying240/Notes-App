export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript, TypeScript, and JSX/TSX files in src folder
        "./index.html", // Include the root HTML file
    ],
    theme: {
        extend: {
            // Custom colors for the project
            colors: {
                primary: "#3490DC", // Primary brand color
                secondary: "#2ECC71", // Secondary accent color
            },
        },
    },
    plugins: [], // Add Tailwind CSS plugins here as needed
};