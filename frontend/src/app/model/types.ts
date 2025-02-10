interface TypographyStyle {
  fontSize: string;
  fontWeight: string;
}

declare module '@emotion/react' {
  export interface Theme {
    primary: {
      main: string;
      contrastText: string;
      black: string;
      blue: string;
      red: string;
      red_dark: string;
      yellow: string;
    };
    secondary: {
      main: string;
      grey: string;
      dark: string;
      greyscale: string;
      light: string;
    };
    typography: {
      fontFamily: string;
      h1: TypographyStyle;
      h2: TypographyStyle;
      h3: TypographyStyle;
      h4: TypographyStyle;
      body1: TypographyStyle;
      body2: TypographyStyle;
      body3: TypographyStyle;
      body4: TypographyStyle;
      body5: TypographyStyle;
      body6: TypographyStyle;
      body7: TypographyStyle;
    };
  }
}
