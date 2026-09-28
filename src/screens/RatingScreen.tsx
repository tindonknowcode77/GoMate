import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../components/LocalizedText';
import { GradientButton } from '../components/GradientButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Activity } from '../data/activities';
import { communityMembers } from '../data/people';
import { colors, layout, radii } from '../theme';

export function RatingScreen({ activity, onBack, onComplete }: { activity: Activity; onBack: () => void; onComplete: () => void }) {
  const [experience, setExperience] = useState(5);
  const [memberRatings, setMemberRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title="Đánh giá" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.page}>
          <View style={styles.hero}><View style={styles.icon}><Ionicons color={colors.match} name="heart" size={30} /></View><Text style={styles.title}>Trải nghiệm của bạn thế nào?</Text><Text style={styles.subtitle}>{activity.title}</Text><Stars value={experience} onChange={setExperience} /></View>
          <View style={styles.card}><Text style={styles.cardTitle}>Nhận xét (không bắt buộc)</Text><TextInput multiline onChangeText={setComment} placeholder="Chia sẻ điều bạn thích hoặc góp ý..." placeholderTextColor={colors.textMuted} style={styles.input} value={comment} /></View>
          <View style={styles.card}><Text style={styles.cardTitle}>Đánh giá thành viên</Text>{communityMembers.slice(0, 3).map((member) => <View key={member.id} style={styles.memberRow}><View style={styles.avatar}><Text style={styles.avatarText}>{member.initial}</Text></View><Text style={styles.memberName}>{member.name}</Text><Stars compact value={memberRatings[member.id] ?? 0} onChange={(value) => setMemberRatings((current) => ({ ...current, [member.id]: value }))} /></View>)}</View>
          <GradientButton label="Hoàn tất" onPress={onComplete} trailing={<Ionicons color={colors.white} name="checkmark" size={19} />} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stars({ value, onChange, compact = false }: { value: number; onChange: (value: number) => void; compact?: boolean }) {
  return <View style={[styles.stars, compact && styles.compactStars]}>{[1,2,3,4,5].map((star) => <Pressable key={star} onPress={() => onChange(star)}><Ionicons color={star <= value ? colors.warning : colors.border} name={star <= value ? 'star' : 'star-outline'} size={compact ? 18 : 32} /></Pressable>)}</View>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { paddingBottom: 28 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  hero: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.largeCard, borderWidth: 1, padding: 22 },
  icon: { alignItems: 'center', backgroundColor: colors.matchSoft, borderRadius: 28, height: 60, justifyContent: 'center', width: 60 },
  title: { color: colors.text, fontSize: 21, fontWeight: '900', marginTop: 16, textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 6 },
  stars: { flexDirection: 'row', gap: 8, marginTop: 18 },
  compactStars: { gap: 2, marginTop: 0 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.card, borderWidth: 1, marginVertical: 7, padding: 16 },
  cardTitle: { color: colors.text, fontSize: 14, fontWeight: '900', marginBottom: 10 },
  input: { backgroundColor: colors.background, borderRadius: radii.input, color: colors.text, minHeight: 92, padding: 13, textAlignVertical: 'top' },
  memberRow: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', minHeight: 58 },
  avatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 18, height: 38, justifyContent: 'center', width: 38 },
  avatarText: { color: colors.primary, fontSize: 13, fontWeight: '900' },
  memberName: { color: colors.text, flex: 1, fontSize: 12.5, fontWeight: '700', marginLeft: 10 },
});
