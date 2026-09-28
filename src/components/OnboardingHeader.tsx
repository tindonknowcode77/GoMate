import { Text } from './LocalizedText';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, layout } from '../theme';
import { BrandLogo } from './BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';

type OnboardingHeaderProps = {
  step: number;
  totalSteps?: number;
  onSkip: () => void;
};

export function OnboardingHeader({ step, totalSteps = 2, onSkip }: OnboardingHeaderProps) {
  const progress = `${Math.min(step / totalSteps, 1) * 100}%` as `${number}%`;

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <LanguageSwitcher />
        <BrandLogo compact />
        <Pressable accessibilityRole="button" onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={[colors.purple, colors.blue, colors.cyan]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={[styles.activeProgress, { width: progress }]}
        />
      </View>
      <Text style={styles.stepText}>{step}<Text> of </Text>{totalSteps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    maxWidth: layout.maxWidth,
    paddingHorizontal: layout.pagePadding,
    width: '100%',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    alignItems: 'flex-end',
    minWidth: 52,
    paddingVertical: 10,
  },
  skip: {
    color: '#6257F6',
    fontSize: 16,
    fontWeight: '700',
  },
  progressTrack: {
    alignSelf: 'center',
    backgroundColor: '#E5E8F6',
    borderRadius: 5,
    height: 8,
    marginTop: 5,
    overflow: 'hidden',
    width: 198,
  },
  activeProgress: {
    height: '100%',
  },
  stepText: {
    color: colors.body,
    fontSize: 14,
    marginTop: 7,
    textAlign: 'center',
  },
});
