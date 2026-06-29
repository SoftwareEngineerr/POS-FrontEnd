import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";
import { Main } from './main';
import { customizeSideBar } from './customizeSideBar';
import { Components } from './components';
import { useSelector } from "react-redux";

export const Themefunc = () => {
  const themedata = useSelector((state) => state.theme);

  return createTheme({
    direction: 'ltr',
    palette: {
      addbutn: {
        data: {
          background: 'lightblue',
          color: 'blue',
          borderRadius: '50%',
          height: "58px",
          position: "fixed",
          right: "63px",
          bottom: "25px",
        },
      },
      primary: {
        main:  '#764ba2' ,
        light: '#e8e3fb',
        dark: '#7a7a7a',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#42a5f5',
        light: '#7551aa1c',
        dark: '#23afdb',
      },
      success: {
        main: '#13DEB9',
        light: '#E6FFFA',
        dark: '#02b3a9',
        contrastText: '#ffffff',
      },
      info: {
        main: '#114cbb',
        light: '#dbeefa',
        dark: '#1682d4',
        contrastText: '#ffffff',
      },
      error: {
        main: '#e50954',
        light: '#fee1ec',
        dark: '#42a5f5',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ec7638',
        light: '#fde3ca',
        dark: '#ae8e59',
        contrastText: '#ffffff',
      },
      purple: {
        A50: '#EBF3FE',
        A100: '#6610f2',
        A200: '#557fb9',
      },
      grey: {
        100: '#F2F6FA',
        200: '#EAEFF4',
        300: '#DFE5EF',
        400: '#7C8FAC',
        500: '#5A6A85',
        600: '#2A3547',
      },
      text: {
        primary: '#2A3547',
        secondary: '#5A6A85',
      },
      sidemenutext: {
        primary: themedata.data == 'white' ? '#2A3547' : '#fff',
        secondary: themedata.data == 'white' ? '#5A6A85' : '#ffffff91',
        background: themedata.data == 'white' ? '#fff' : '#000',
        color: themedata.data == 'white' ? '#000' : '#fff',
        display: {
          display: themedata.display == 'none' ? 'none !important' : 'block',
        },
        width: themedata.display == 'none' ? '70px' : '280px',
      },
      action: {
        disabledBackground: 'rgba(73,82,88,0.12)',
        hoverOpacity: 0.02,
        hover: '#d8ebff',
      },
      divider: '#e5eaef',
      Main: Main(),
      Components,
      customizeSideBar,
    },

    // ✅ Typography with Poppins
    typography: {
      ...typography,
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Poppins", sans-serif' },
      h2: { fontFamily: '"Poppins", sans-serif' },
      h3: { fontFamily: '"Poppins", sans-serif' },
      h4: { fontFamily: '"Poppins", sans-serif' },
      h5: { fontFamily: '"Poppins", sans-serif' },
      h6: { fontFamily: '"Poppins", sans-serif' },
      body1: { fontFamily: '"Poppins", sans-serif' },
      body2: { fontFamily: '"Poppins", sans-serif' },
      button: { fontFamily: '"Poppins", sans-serif' },
    },

    shadows,
  });
};
