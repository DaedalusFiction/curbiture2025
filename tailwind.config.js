module.exports = {
  theme: {
    //
    fontFamily: {
      // Restaurant
      // header: ["Jost", "sans-serif"],
      sans: ["var(--font-sans)", "sans-serif"],

      // Modern
      header: ["var(--font-header)", "sans-serif"],
      // sans: ["Varta", "sans-serif"],

      // Fancy
      // header: ["Gistesy", "sans-serif"],
      // sans: ["Roxborough", "sans-serif"],

      serif: ["Quicksand", "serif"],
    },
    extend: {
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
        border: "#c1c1c1",
        borderDarkMode: "#767975",
      },
    },
  },
};
