import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ActionRequiredSection, ActivityCalendar, ActivityScheduleItem, HomeAction, HomeEmptyState, HomeHeader, NextActivityCard } from '../components/home/HomeComponents';
import { Text } from '../components/LocalizedText';
import { Activity, activities } from '../data/activities';
import { colors, layout } from '../theme';

type HomeScreenProps = {
  hasActivities?: boolean;
  onMatchPress: () => void;
  onMyActivitiesPress: () => void;
  onNotificationsPress: () => void;
  onPendingPress: () => void;
  onOpenActivity: (activity: Activity) => void;
  onOpenGroup: (activity: Activity) => void;
};

export function HomeScreen({ hasActivities = true, onMatchPress, onMyActivitiesPress, onNotificationsPress, onPendingPress, onOpenActivity, onOpenGroup }: HomeScreenProps) {
  const [view, setView] = useState<'overview' | 'calendar'>('overview');
  const [selectedDay, setSelectedDay] = useState(17);
  const nextActivity = activities[1];
  const relatedActivities = activities;
  const actions = useMemo<HomeAction[]>(() => [
    { id: 'join-request', icon: 'people', color: colors.match, background: colors.matchSoft, title: '2 người muốn tham gia', subtitle: activities[0].title, time: '10 phút trước', onPress: onPendingPress },
    { id: 'poll', icon: 'stats-chart', color: colors.primary, background: colors.primarySoft, title: 'Bình chọn địa điểm mới', subtitle: activities[2].title, time: '1 giờ trước', onPress: () => onOpenGroup(activities[2]) },
    { id: 'expense', icon: 'wallet', color: colors.success, background: colors.successSoft, title: 'Chi phí 120.000đ', subtitle: nextActivity.title, time: '3 giờ trước', onPress: () => onOpenGroup(nextActivity) },
  ], [nextActivity, onOpenGroup, onPendingPress]);

  if (!hasActivities) {
    return (
      <ScrollView contentContainerStyle={styles.emptyScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <HomeHeader activityCount={0} onCalendarPress={() => setView('calendar')} onNotificationsPress={onNotificationsPress} />
          <HomeEmptyState onMatch={onMatchPress} />
        </View>
      </ScrollView>
    );
  }

  if (view === 'calendar') {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <HomeHeader activityCount={relatedActivities.length} onCalendarPress={() => setView('calendar')} onNotificationsPress={onNotificationsPress} showGreeting={false} />
          <View style={styles.calendarHeading}><Text style={styles.pageTitle}>Lịch hoạt động</Text><Pressable onPress={() => setView('overview')}><Text style={styles.switchLink}>Tổng quan</Text></Pressable></View>
          <ActivityCalendar onSelect={setSelectedDay} selectedDay={selectedDay} />

          <SectionHeading title="Hoạt động của ngày đã chọn" />
          <ActivityScheduleItem activity={activities[1]} onPress={() => onOpenActivity(activities[1])} status="Sắp diễn ra" time="19:00\n21:00" />
          <ActivityScheduleItem activity={activities[0]} onPress={() => onOpenGroup(activities[0])} status="Đã tham gia" time="21:00\n23:00" />

          <SectionHeading action="Xem tất cả" onPress={onMyActivitiesPress} title="Hoạt động sắp tới" />
          <ActivityScheduleItem activity={activities[2]} onPress={() => onOpenActivity(activities[2])} status="Đã xác nhận" />
          <ActivityScheduleItem activity={activities[3]} onPress={() => onOpenActivity(activities[3])} status="Bạn tổ chức" />

          <SectionHeading action="Xem tất cả" onPress={onMyActivitiesPress} title="Hoạt động đã tham gia" />
          <ActivityScheduleItem activity={activities[0]} onPress={() => onOpenActivity(activities[0])} status="Đã hoàn thành" />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <HomeHeader activityCount={1} onCalendarPress={() => setView('calendar')} onNotificationsPress={onNotificationsPress} />
        <NextActivityCard activity={nextActivity} onGroup={() => onOpenGroup(nextActivity)} onPlan={() => onOpenActivity(nextActivity)} />
        <ActionRequiredSection actions={actions} />
      </View>
    </ScrollView>
  );
}

function SectionHeading({ action, onPress, title }: { action?: string; onPress?: () => void; title: string }) {
  return <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{title}</Text>{action && <Pressable onPress={onPress}><Text style={styles.switchLink}>{action}</Text></Pressable>}</View>;
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 28 },
  emptyScroll: { flexGrow: 1, paddingBottom: 24 },
  page: { alignSelf: 'center', flex: 1, maxWidth: layout.maxWidth, paddingHorizontal: 16, width: '100%' },
  calendarHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  pageTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  switchLink: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, marginTop: 24 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
});
