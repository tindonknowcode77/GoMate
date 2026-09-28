import { Text } from './LocalizedText';
import { StyleSheet, TextInput, View } from 'react-native';
import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

type IconName = ComponentProps<typeof Ionicons>['name'];

type FormFieldProps = {
  icon: IconName;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: ComponentProps<typeof TextInput>['keyboardType'];
  multiline?: boolean;
  rightIcon?: IconName;
  onRightPress?: () => void;
};

export function FormField({
  icon,
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  multiline,
  rightIcon,
  onRightPress,
}: FormFieldProps) {
  const { translate } = useLanguage();
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, multiline && styles.multilineField]}>
        <Ionicons color={colors.muted} name={icon} size={23} />
        <TextInput
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={onChangeText}
          placeholder={placeholder ? translate(placeholder) : undefined}
          placeholderTextColor="#A4ADC0"
          secureTextEntry={secureTextEntry}
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
        />
        {rightIcon && (
          <Ionicons color={colors.muted} name={rightIcon} onPress={onRightPress} size={23} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 8,
  },
  label: {
    color: '#53617D',
    fontSize: 15,
    fontWeight: '600',
  },
  field: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1.4,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  multilineField: {
    alignItems: 'flex-start',
    minHeight: 76,
    paddingTop: 16,
  },
  input: {
    color: colors.ink,
    flex: 1,
    fontSize: 17,
    marginLeft: 13,
    paddingVertical: 0,
  },
  multilineInput: {
    minHeight: 46,
    textAlignVertical: 'top',
  },
});
