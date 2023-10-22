/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',  // A soft gray background color
    surface: '#FFFFFF',     // White surface color
    primary: '#6200EE',     // Primary color
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    anchor: 'black',        // Default color for <a> tags in light theme
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    anchor: '#D1D1D1', // Soft white color for <a> tags in dark theme
    // ... any other colors you want to override
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: myCustomLightTheme,
      dark: myCustomDarkTheme,
    }
  },
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
})
