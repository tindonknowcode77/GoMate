import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  subtitle?: string;
};

export function ScreenHeader({ title, onBack, right, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBack && (
          <Pressable accessibilityLabel="Quay lại" onPress={onBack} style={styles.backButton}>
            <Ionicons color={colors.ink} name="arrow-back" size={22} />
          </Pressable>
        )}
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', minHeight: 64, paddingHorizontal: 14 },
  side: { minWidth: 44 },
  right: { alignItems: 'flex-end' },
  backButton: { alignItems: 'center', backgroundColor: '#F5F6FA', borderRadius: 15, height: 40, justifyContent: 'center', width: 40 },
  copy: { alignItems: 'center', flex: 1 },
  title: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  subtitle: { color: colors.body, fontSize: 10, marginTop: 2 },
});
