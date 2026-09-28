import { Text } from './LocalizedText';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  trailing?: ReactNode;
};

export function GradientButton({ label, onPress, style, trailing }: GradientButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.shadow, style, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={['#7042FF', '#4165F5', '#2497F5']}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
        {trailing ?? <Text style={styles.arrow}>→</Text>}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 24,
    shadowColor: '#4076F5',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  gradient: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    height: 58,
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginLeft: 12,
    marginTop: -2,
  },
});
