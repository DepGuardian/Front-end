import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';

export const Button = ({ onPress, label, variant = 'primary', icon }) => {
  const buttonStyles = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const textStyles = variant === 'primary' ? styles.primaryText : styles.secondaryText;

  const IconComponent = icon?.family === 'Ionicons' ? Ionicons : FontAwesome;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      {icon?.position === 'left' && (
        <IconComponent 
          name={icon.name} 
          size={15} 
          color={variant === 'primary' ? theme.colors.secondary : theme.colors.primary} 
        />
      )}
      <Text style={[textStyles, icon && { marginHorizontal: theme.spacing.sm }]}>{label}</Text>
      {icon?.position === 'right' && (
        <IconComponent 
          name={icon.name} 
          size={15} 
          color={variant === 'primary' ? theme.colors.secondary : theme.colors.primary} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: theme.colors.secondary,
    ...theme.typography.body,
  },
  secondaryText: {
    color: theme.colors.primary,
    ...theme.typography.body,
  },
});