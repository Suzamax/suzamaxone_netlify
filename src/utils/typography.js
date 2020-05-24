import Typography from "typography"
//import oceanBeachTheme from "typography-theme-ocean-beach"

/*oceanBeachTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}*/

// delete oceanBeachTheme.googleFonts

//const typography = new Typography(oceanBeachTheme)
const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Domine', 'serif'],
  bodyFontFamily: ['Roboto', 'sans-serif'],
  // See below for the full list of options.
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
