import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav, MainTab } from '../components/BottomNav';
import { Activity, activities } from '../data/activities';
import { PersonProfile } from '../data/people';
import { ChatScreen } from './ChatScreen';
import { CreateActivityScreen } from './CreateActivityScreen';
import { EditProfileScreen } from './EditProfileScreen';
import { ActivityFilters, FilterScreen } from './FilterScreen';
import { HomeScreen } from './HomeScreen';
import { HostMembersScreen } from './HostMembersScreen';
import { ManageActivitiesScreen } from './ManageActivitiesScreen';
import { MatchHubScreen } from './MatchHubScreen';
import { MatchScreen } from './MatchScreen';
import { MatchSuccessScreen } from './MatchSuccessScreen';
import { MemberProfileScreen } from './MemberProfileScreen';
import { Conversation, MessagesScreen } from './MessagesScreen';
import { MyActivitiesScreen } from './MyActivitiesScreen';
import { NotificationsScreen } from './NotificationsScreen';
import { PendingActivitiesScreen } from './PendingActivitiesScreen';
import { UserProfileScreen } from './UserProfileScreen';

type PeopleSource =
  | { name: 'discover' }
  | { name: 'pending' };

type FullScreenRoute =
  | { name: 'discover' }
  | { name: 'filter' }
  | { name: 'pending' }
  | { name: 'manage' }
  | { name: 'notifications' }
  | { name: 'myActivities' }
  | { name: 'editProfile' }
  | { name: 'chat'; conversation: Conversation; returnTo?: 'discover' }
  | { name: 'hostMembers'; activity: Activity; source: PeopleSource }
  | { name: 'memberProfile'; person: PersonProfile; source: 'manage' | 'hostMembers'; activity?: Activity; peopleSource?: PeopleSource }
  | { name: 'matchSuccess'; activity: Activity }
  | null;

export function MainApp() {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [route, setRoute] = useState<FullScreenRoute>(null);
  const [filters, setFilters] = useState<ActivityFilters>();
  const filteredActivities = useMemo(() => {
    if (!filters) return activities;
    return activities.filter((activity) => {
      const distance = Number.parseFloat(activity.distance);
      return distance <= filters.distance
        && (filters.categories.length === 0 || filters.categories.includes(activity.category));
    });
  }, [filters]);

  if (route?.name === 'discover') {
    return <MatchScreen activityItems={filteredActivities} onBack={() => setRoute(null)} onFilterPress={() => setRoute({ name: 'filter' })} onMatched={(activity) => setRoute({ name: 'matchSuccess', activity })} onViewPeople={(activity) => setRoute({ name: 'hostMembers', activity, source: { name: 'discover' } })} />;
  }
  if (route?.name === 'filter') {
    return <FilterScreen initialFilters={filters} onApply={(next) => { setFilters(next); setRoute({ name: 'discover' }); }} onClose={() => setRoute({ name: 'discover' })} />;
  }
  if (route?.name === 'pending') {
    return <PendingActivitiesScreen onBack={() => setRoute(null)} onOpen={(activity) => setRoute({ name: 'hostMembers', activity, source: { name: 'pending' } })} />;
  }
  if (route?.name === 'manage') {
    return <ManageActivitiesScreen onBack={() => setRoute(null)} onViewProfile={(person) => setRoute({ name: 'memberProfile', person, source: 'manage' })} />;
  }
  if (route?.name === 'hostMembers') {
    const { activity, source } = route;
    return <HostMembersScreen activity={activity} onBack={() => setRoute(source)} onViewProfile={(person) => setRoute({ name: 'memberProfile', person, source: 'hostMembers', activity, peopleSource: source })} />;
  }
  if (route?.name === 'memberProfile') {
    const current = route;
    return <MemberProfileScreen person={current.person} onBack={() => {
      if (current.source === 'manage') setRoute({ name: 'manage' });
      else if (current.activity && current.peopleSource) setRoute({ name: 'hostMembers', activity: current.activity, source: current.peopleSource });
      else setRoute(null);
    }} />;
  }
  if (route?.name === 'notifications') return <NotificationsScreen onBack={() => setRoute(null)} />;
  if (route?.name === 'myActivities') return <MyActivitiesScreen onBack={() => setRoute(null)} />;
  if (route?.name === 'editProfile') return <EditProfileScreen onBack={() => setRoute(null)} onSaved={() => setRoute(null)} />;
  if (route?.name === 'chat') {
    const current = route;
    return <ChatScreen conversation={current.conversation} onBack={() => setRoute(current.returnTo === 'discover' ? { name: 'discover' } : null)} />;
  }
  if (route?.name === 'matchSuccess') {
    const activity = route.activity;
    return <MatchSuccessScreen activity={activity} onContinue={() => setRoute({ name: 'discover' })} onMessageHost={() => setRoute({ name: 'chat', conversation: { id: activity.id, name: activity.host, activity: activity.title, message: 'Bắt đầu cuộc trò chuyện', time: '', unread: 0 }, returnTo: 'discover' })} />;
  }

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.safeArea}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen onMatchPress={() => setActiveTab('match')} onMyActivitiesPress={() => setRoute({ name: 'myActivities' })} onNotificationsPress={() => setRoute({ name: 'notifications' })} />}
        {activeTab === 'match' && <MatchHubScreen onDiscover={() => setRoute({ name: 'discover' })} onManage={() => setRoute({ name: 'manage' })} onPending={() => setRoute({ name: 'pending' })} />}
        {activeTab === 'create' && <CreateActivityScreen onCreated={() => setRoute({ name: 'myActivities' })} />}
        {activeTab === 'messages' && <MessagesScreen onOpenChat={(conversation) => setRoute({ name: 'chat', conversation })} />}
        {activeTab === 'profile' && <UserProfileScreen onEdit={() => setRoute({ name: 'editProfile' })} onMyActivities={() => setRoute({ name: 'myActivities' })} onNotifications={() => setRoute({ name: 'notifications' })} />}
      </View>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { flex: 1 },
});
