module.exports = {
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", "sans-serif"],
      header: ["var(--font-header)", "serif"],
      serif: ["Quicksand", "serif"],
    },
    extend: {
      borderWidth: {
        DEFAULT: "5px", // Set default border width to 10px
      },
      borderColor: {
        DEFAULT: "var(--color-border)", // Set default border color to white
      },
      borderRadius: {
        DEFAULT: "1rem",
      },
      colors: {
        primary: "var(--color-primary)",
        primaryDarkMode: "var(--color-primary-dark-mode)",
        secondary: "var(--color-secondary)",
        secondaryDarkMode: "var(--color-secondary-dark-mode)",
        light: "#f7f4f0",
        lightMuted: "#f7f4f0",
        dark: "#2c2c2c",
        darkMuted: "#373737",
        background: "var(--color-background)",
        backgroundDarkMode: "#110d17",
        backgroundAccent: "var(--color-background-accent)",
        backgroundAccentDarkMode: "#343633",
        backgroundHover: "#424242",
      },
    },
  },
};
