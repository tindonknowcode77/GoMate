import { useCallback, useMemo, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeActivityCard } from '../components/ActivityCard';
import { Activity, activities } from '../data/activities';
import { colors } from '../theme';

type MatchScreenProps = {
  activityItems?: Activity[];
  onFilterPress: () => void;
  onMatched: (activity: Activity) => void;
  onViewPeople: (activity: Activity) => void;
  onBack: () => void;
};

export function MatchScreen({
  activityItems = activities,
  onFilterPress,
  onMatched,
  onViewPeople,
  onBack,
}: MatchScreenProps) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(() => new Animated.ValueXY());
  const [deckHeight, setDeckHeight] = useState(0);
  const contentWidth = width;
  const hasResults = activityItems.length > 0;
  const deckActivities = hasResults ? activityItems : activities;
  const currentActivity = deckActivities[currentIndex % deckActivities.length];
  const nextActivity = deckActivities[(currentIndex + 1) % deckActivities.length];

  const finishSwipe = useCallback(() => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((current) => (current + 1) % deckActivities.length);
  }, [deckActivities.length, position]);

  const swipe = useCallback((direction: 'left' | 'right') => {
    Animated.timing(position, {
      duration: 240,
      toValue: { x: direction === 'right' ? width * 1.25 : -width * 1.25, y: 8 },
      useNativeDriver: true,
    }).start(() => {
      finishSwipe();
      if (direction === 'right') onMatched(currentActivity);
    });
  }, [currentActivity, finishSwipe, onMatched, position, width]);

  const panResponder = useMemo(
    () => PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => (
        Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.15
      ),
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy * 0.16 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 95) swipe('right');
        else if (gesture.dx < -95) swipe('left');
        else {
          Animated.spring(position, {
            friction: 6,
            tension: 50,
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
    [position, swipe],
  );

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-9deg', '0deg', '9deg'],
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [0, 80, 150],
    outputRange: [0, 0.45, 1],
    extrapolate: 'clamp',
  });
  const skipOpacity = position.x.interpolate({
    inputRange: [-150, -80, 0],
    outputRange: [1, 0.45, 0],
    extrapolate: 'clamp',
  });

  if (!hasResults) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.page, { width: contentWidth }]}> 
          <DiscoveryHeader onBack={onBack} onFilter={onFilterPress} />
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons color="#5D5CEF" name="options-outline" size={29} />
            </View>
            <Text style={styles.emptyTitle}>Chưa tìm thấy hoạt động phù hợp</Text>
            <Text style={styles.emptyText}>Hãy mở rộng khoảng cách hoặc chọn thêm loại hoạt động để tiếp tục Match.</Text>
            <Pressable onPress={onFilterPress} style={({ pressed }) => [styles.emptyButton, pressed && styles.pressed]}>
              <Ionicons color="#FFFFFF" name="options" size={18} />
              <Text style={styles.emptyButtonText}>Chỉnh bộ lọc</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.page, { width: contentWidth }]}> 
        <DiscoveryHeader onBack={onBack} onFilter={onFilterPress} />
        <View onLayout={(event: LayoutChangeEvent) => setDeckHeight(event.nativeEvent.layout.height)} style={styles.deck}> 
          {deckHeight > 0 && (
            <>
              <View style={styles.nextCard}><SwipeActivityCard activity={nextActivity} fullScreen height={deckHeight} onViewPeople={() => undefined} /></View>
              <Animated.View {...panResponder.panHandlers} style={[styles.currentCard, { transform: [...position.getTranslateTransform(), { rotate }] }]}>
                <SwipeActivityCard activity={currentActivity} fullScreen height={deckHeight} onViewPeople={() => onViewPeople(currentActivity)} />
                <View style={styles.counterOverlay}><Text style={styles.counterText}>{(currentIndex % deckActivities.length) + 1}/{deckActivities.length}</Text></View>
                <Animated.View style={[styles.swipeBadge, styles.skipBadge, { opacity: skipOpacity }]}><Text style={styles.skipBadgeText}>BỎ QUA</Text></Animated.View>
                <Animated.View style={[styles.swipeBadge, styles.likeBadge, { opacity: likeOpacity }]}><Text style={styles.likeBadgeText}>THAM GIA</Text></Animated.View>
              </Animated.View>
            </>
          )}
          <View style={styles.actions}>
            <Pressable accessibilityLabel="Bỏ qua hoạt động" onPress={() => swipe('left')} style={({ pressed }) => [styles.skipAction, pressed && styles.pressed]}><Ionicons color="#F04D69" name="close" size={31} /></Pressable>
            <Pressable accessibilityLabel="Xác nhận tham gia hoạt động" onPress={() => swipe('right')} style={({ pressed }) => [styles.likeActionShadow, pressed && styles.pressed]}><LinearGradient colors={['#A33AF5', '#4F5FF4', '#288FF5']} style={styles.likeAction}><Ionicons color="#FFFFFF" name="checkmark" size={31} /></LinearGradient></Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function DiscoveryHeader({ onBack, onFilter }: { onBack: () => void; onFilter: () => void }) {
  return (
    <View style={styles.discoveryHeader}>
      <View style={styles.headerLeft}>
        <Pressable accessibilityLabel="Quay lại" onPress={onBack} style={styles.headerButton}><Ionicons color={colors.ink} name="arrow-back" size={21} /></Pressable>
        <Pressable accessibilityLabel="Mở bộ lọc" onPress={onFilter} style={styles.headerButton}><Ionicons color={colors.ink} name="options-outline" size={21} /></Pressable>
      </View>
      <Text style={styles.headerTitle}>GoMate Match</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  page: { alignSelf: 'center', flex: 1 },
  discoveryHeader: { alignItems: 'center', flexDirection: 'row', height: 58, paddingHorizontal: 12 },
  headerLeft: { flexDirection: 'row', gap: 7, width: 90 },
  headerButton: { alignItems: 'center', backgroundColor: '#F4F5F9', borderColor: '#E9EBF1', borderRadius: 14, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  headerTitle: { color: colors.ink, flex: 1, fontSize: 16, fontWeight: '900', textAlign: 'center' },
  headerSpacer: { width: 90 },
  counterOverlay: { backgroundColor: 'rgba(14,24,45,0.65)', borderRadius: 13, paddingHorizontal: 10, paddingVertical: 7, position: 'absolute', right: 16, top: 16 },
  counterText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  deck: { flex: 1, overflow: 'hidden', position: 'relative' },
  nextCard: { opacity: 0.45, position: 'absolute', width: '100%' },
  currentCard: { height: '100%', position: 'absolute', width: '100%' },
  swipeBadge: { backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 12, paddingHorizontal: 13, paddingVertical: 8, position: 'absolute', top: 28 },
  skipBadge: { left: 22, transform: [{ rotate: '-9deg' }] },
  likeBadge: { right: 22, transform: [{ rotate: '9deg' }] },
  skipBadgeText: { color: '#F04D69', fontSize: 17, fontWeight: '900' },
  likeBadgeText: { color: '#4D6CF4', fontSize: 17, fontWeight: '900' },
  actions: { alignItems: 'center', bottom: 18, flexDirection: 'row', gap: 34, justifyContent: 'center', left: 0, position: 'absolute', right: 0 },
  skipAction: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#EBEDF3', borderRadius: 28, borderWidth: 1, height: 56, justifyContent: 'center', shadowColor: '#273A5D', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.1, shadowRadius: 15, width: 56, elevation: 5 },
  likeActionShadow: { borderRadius: 34, elevation: 8, shadowColor: '#555BEE', shadowOffset: { width: 0, height: 9 }, shadowOpacity: 0.27, shadowRadius: 15 },
  likeAction: { alignItems: 'center', borderRadius: 31, height: 62, justifyContent: 'center', width: 62 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
  emptyState: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingBottom: 80, paddingHorizontal: 28 },
  emptyIcon: { alignItems: 'center', backgroundColor: '#EFEEFF', borderRadius: 27, height: 64, justifyContent: 'center', width: 64 },
  emptyTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginTop: 20, textAlign: 'center' },
  emptyText: { color: colors.body, fontSize: 13, lineHeight: 20, marginTop: 8, maxWidth: 310, textAlign: 'center' },
  emptyButton: { alignItems: 'center', backgroundColor: '#5E5CEB', borderRadius: 17, flexDirection: 'row', gap: 8, marginTop: 22, paddingHorizontal: 18, paddingVertical: 13 },
  emptyButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
});
