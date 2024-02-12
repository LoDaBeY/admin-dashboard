export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          BGColor: {
            main: "#ffffff",
          },

          text: {
            primary: "#000000",
          },


          Drwertext: {
            primary: "#ffffff",
          },
        }
      : {
          // palette values for dark mode
          BGColor: {
            main: "#001a33",
          },


          text: {
            primary: "#ffd480",
          },
          Drwertext: {
            primary: "#0d0d0d",
          },
        }),
  },
});
