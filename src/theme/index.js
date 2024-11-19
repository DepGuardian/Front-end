import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    background: '#FFFFFF',
    text: '#000000',
    placeholder: '#9F9F9F',
    error: '#FF0000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontFamily: 'Poppins-Bold',
      fontSize: width * 0.08,
      lineHeight: width * 0.1,
    },
    h2: {
      fontFamily: 'Poppins-Bold',
      fontSize: width * 0.06,
      lineHeight: width * 0.08,
    },
    body: {
      fontFamily: 'Poppins-Regular',
      fontSize: width * 0.04,
      lineHeight: width * 0.055,
    },
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
};