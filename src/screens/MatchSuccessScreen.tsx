import { Text } from '../components/LocalizedText';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Activity } from '../data/activities';
import { colors, layout } from '../theme';

type MatchSuccessScreenProps = {
  activity: Activity;
  onContinue: () => void;
  onMessageHost: () => void;
};

export function MatchSuccessScreen({ activity, onContinue, onMessageHost }: MatchSuccessScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Ionicons color={colors.white} name="checkmark" size={42} />
          </View>
          <Text style={styles.eyebrow}>YÊU CẦU ĐÃ ĐƯỢC GỬI</Text>
          <Text style={styles.title}>Bạn đã chọn một hoạt động tuyệt vời!</Text>
          <Text style={styles.subtitle}>
            Host sẽ nhận được yêu cầu của bạn. Bạn có thể nhắn tin để giới thiệu nhanh về mình.
          </Text>

          <View style={styles.activityCard}>
            <Image source={activity.image} style={styles.image} />
            <View style={styles.activityCopy}>
              <Text numberOfLines={1} style={styles.activityTitle}>{activity.title}</Text>
              <Text numberOfLines={1} style={styles.activityMeta}>{activity.time}</Text>
              <View style={styles.statusRow}>
                <Ionicons color={colors.warning} name="time-outline" size={15} />
                <Text style={styles.statusText}>Đang chờ host xác nhận</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable onPress={onMessageHost} style={({ pressed }) => [styles.primaryWrap, pressed && styles.pressed]}>
            <View style={styles.primaryButton}>
              <Ionicons color={colors.white} name="chatbubble-outline" size={19} />
              <Text style={styles.primaryText}>Nhắn tin cho host</Text>
            </View>
          </Pressable>
          <Pressable onPress={onContinue} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryText}>Tiếp tục match</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 },
  page: { alignSelf: 'center', flex: 1, justifyContent: 'space-between', maxWidth: layout.maxWidth, padding: 22, width: '100%' },
  content: { alignItems: 'center', paddingTop: 54 },
  successIcon: { alignItems: 'center', backgroundColor: colors.success, borderRadius: 42, height: 84, justifyContent: 'center', shadowColor: colors.success, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.24, shadowRadius: 22, width: 84, elevation: 9 },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 1.3, marginTop: 30 },
  title: { color: colors.ink, fontSize: 27, fontWeight: '900', letterSpacing: -0.7, lineHeight: 34, marginTop: 10, maxWidth: 350, textAlign: 'center' },
  subtitle: { color: colors.body, fontSize: 14, lineHeight: 21, marginTop: 12, maxWidth: 340, textAlign: 'center' },
  activityCard: { alignItems: 'center', backgroundColor: colors.background, borderColor: colors.border, borderRadius: 22, borderWidth: 1, flexDirection: 'row', marginTop: 34, padding: 12, width: '100%' },
  image: { borderRadius: 15, height: 78, width: 78 },
  activityCopy: { flex: 1, marginLeft: 13 },
  activityTitle: { color: colors.ink, fontSize: 15, fontWeight: '900' },
  activityMeta: { color: colors.body, fontSize: 12, marginTop: 5 },
  statusRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 8 },
  statusText: { color: colors.warningText, fontSize: 11, fontWeight: '700' },
  actions: { paddingBottom: 8 },
  primaryWrap: { borderRadius: 19 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 19, flexDirection: 'row', gap: 9, height: 56, justifyContent: 'center' },
  primaryText: { color: colors.white, fontSize: 15, fontWeight: '900' },
  secondaryButton: { alignItems: 'center', height: 52, justifyContent: 'center', marginTop: 7 },
  secondaryText: { color: colors.primary, fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
});
