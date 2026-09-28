import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme';

export type MainTab = 'home' | 'match' | 'create' | 'messages' | 'profile';
type IconName = ComponentProps<typeof Ionicons>['name'];

type BottomNavProps = {
  activeTab: MainTab;
  onChange: (tab: MainTab) => void;
};

const items: { activeIcon: IconName; icon: IconName; label: string; tab: MainTab }[] = [
  { activeIcon: 'home', icon: 'home-outline', label: 'Trang chủ', tab: 'home' },
  { activeIcon: 'layers', icon: 'layers-outline', label: 'Match', tab: 'match' },
  { activeIcon: 'add', icon: 'add', label: 'Tạo', tab: 'create' },
  { activeIcon: 'chatbubble', icon: 'chatbubble-outline', label: 'Tin nhắn', tab: 'messages' },
  { activeIcon: 'person', icon: 'person-outline', label: 'Hồ sơ', tab: 'profile' },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <View style={styles.nav}>
      {items.map((item) => {
        const active = item.tab === activeTab;
        const create = item.tab === 'create';
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={item.tab}
            onPress={() => onChange(item.tab)}
            style={styles.item}
          >
            {create ? (
              <LinearGradient
                colors={['#9B3FF4', '#5960F3', '#2D8FF5']}
                style={[styles.createIcon, active && styles.activeCreateIcon]}
              >
                <Ionicons color="#FFFFFF" name="add" size={29} />
              </LinearGradient>
            ) : (
              <View style={styles.regularIcon}>
                <Ionicons
                  color={active ? colors.purple : '#8A94A8'}
                  name={active ? item.activeIcon : item.icon}
                  size={22}
                />
                {item.tab === 'messages' && <View style={styles.messageDot} />}
              </View>
            )}
            <Text style={[styles.label, active && styles.activeLabel]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EEF0F5',
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 70,
    paddingHorizontal: 5,
    paddingTop: 7,
    shadowColor: '#1D3156',
    shadowOffset: { width: 0, height: -7 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  item: { alignItems: 'center', flex: 1 },
  regularIcon: { alignItems: 'center', height: 32, justifyContent: 'center', position: 'relative', width: 42 },
  createIcon: { alignItems: 'center', borderRadius: 22, height: 44, justifyContent: 'center', marginTop: -17, shadowColor: '#555CF1', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.24, shadowRadius: 12, width: 44, elevation: 7 },
  activeCreateIcon: { transform: [{ scale: 1.05 }] },
  messageDot: { backgroundColor: '#FF4D6E', borderColor: '#FFFFFF', borderRadius: 5, borderWidth: 1.5, height: 8, position: 'absolute', right: 6, top: 3, width: 8 },
  label: { color: '#8A94A9', fontSize: 9.5, fontWeight: '600', marginTop: 2 },
  activeLabel: { color: colors.purple, fontWeight: '800' },
});
