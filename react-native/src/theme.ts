import { StyleSheet } from 'react-native';

export const colors = {
  light: {
    background: '#ffffff',
    text: '#333333',
    primary: '#2d8659',
    secondary: '#f0f0f0',
    border: '#cccccc',
    surface: '#f8f8f8',
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#2d8659',
    secondary: '#333333',
    border: '#444444',
    surface: '#2d2d2d',
  },
};

export const typography = {
  fontFamily: 'System', // Use system font for now, can be replaced with Inter later
  sizes: {
    small: 12,
    regular: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
  weights: {
    regular: '400',
    bold: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const createStyles = (theme: 'light' | 'dark') => {
  const themeColors = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    text: {
      color: themeColors.text,
      fontFamily: typography.fontFamily,
      fontSize: typography.sizes.regular,
    },
    title: {
      color: themeColors.text,
      fontFamily: typography.fontFamily,
      fontSize: typography.sizes.xlarge,
      fontWeight: 'bold' as const,
    },
    button: {
      backgroundColor: themeColors.secondary,
      padding: spacing.sm,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: themeColors.text,
      fontSize: typography.sizes.regular,
    },
    primaryButton: {
      backgroundColor: themeColors.primary,
      padding: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: typography.sizes.large,
      fontWeight: 'bold' as const,
    },
  });
};
