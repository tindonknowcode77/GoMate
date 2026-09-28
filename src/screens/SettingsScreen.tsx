import { ComponentProps, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandLogo } from '../components/BrandLogo';
import { FormField } from '../components/FormField';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Text } from '../components/LocalizedText';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, control, layout, radii } from '../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type SettingsPage = 'root' | 'account' | 'privacy' | 'notifications' | 'appearance' | 'language' | 'password' | 'plus' | 'help' | 'blocked' | 'about';

const profileAvatar = require('../assets/profile-avatar.png');

export function SettingsScreen({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [page, setPage] = useState<SettingsPage>('root');

  if (page === 'root') return <SettingsHome onBack={onBack} onLogout={onLogout} onOpen={setPage} />;
  if (page === 'account') return <AccountSettings onBack={() => setPage('root')} onChangePassword={() => setPage('password')} />;
  if (page === 'privacy') return <PrivacySettings onBack={() => setPage('root')} onBlocked={() => setPage('blocked')} />;
  if (page === 'notifications') return <NotificationSettings onBack={() => setPage('root')} />;
  if (page === 'appearance') return <AppearanceSettings onBack={() => setPage('root')} />;
  if (page === 'language') return <LanguageSettings onBack={() => setPage('root')} />;
  if (page === 'password') return <ChangePasswordScreen onBack={() => setPage('account')} />;
  if (page === 'plus') return <GoMatePlusScreen onClose={() => setPage('root')} />;
  if (page === 'help') return <HelpCenterScreen onBack={() => setPage('root')} />;
  if (page === 'blocked') return <BlockedAccountsScreen onBack={() => setPage('privacy')} />;
  return <AboutScreen onBack={() => setPage('root')} />;
}

function SettingsHome({ onBack, onLogout, onOpen }: { onBack: () => void; onLogout: () => void; onOpen: (page: SettingsPage) => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Cài đặt">
      <SectionLabel label="TÀI KHOẢN" />
      <MenuRow icon="person-outline" label="Tài khoản" onPress={() => onOpen('account')} />
      <MenuRow icon="lock-closed-outline" label="Quyền riêng tư & an toàn" onPress={() => onOpen('privacy')} />
      <MenuRow icon="notifications-outline" label="Thông báo" onPress={() => onOpen('notifications')} />

      <SectionLabel label="TÙY CHỌN" />
      <MenuRow icon="eye-outline" label="Giao diện" onPress={() => onOpen('appearance')} value="Sáng" />
      <MenuRow icon="globe-outline" label="Ngôn ngữ" onPress={() => onOpen('language')} value="Tiếng Việt" />
      <MenuRow icon="star-outline" label="GoMate Plus" onPress={() => onOpen('plus')} />

      <SectionLabel label="HỖ TRỢ" />
      <MenuRow icon="chatbubble-outline" label="Trung tâm trợ giúp" onPress={() => onOpen('help')} />
      <MenuRow icon="shield-checkmark-outline" label="Giới thiệu GoMate" onPress={() => onOpen('about')} />

      <Pressable onPress={onLogout} style={styles.logoutRow}>
        <Ionicons color={colors.danger} name="log-out-outline" size={19} />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </Pressable>
    </SettingsLayout>
  );
}

function AccountSettings({ onBack, onChangePassword }: { onBack: () => void; onChangePassword: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Tài khoản">
      <SectionLabel label="THÔNG TIN CÁ NHÂN" />
      <PlainRow label="Tên" value="Minh Phan" />
      <PlainRow label="Tên người dùng" value="@minhphan" />
      <PlainRow label="Email" value="minh@gomate.app" />
      <PlainRow label="Số điện thoại" value="Thêm số" />
      <SectionLabel label="BẢO MẬT" />
      <PlainRow label="Mật khẩu" onPress={onChangePassword} />
      <PlainRow label="Xác thực hai bước" value="Bật" />
      <PlainRow label="Hoạt động đăng nhập" />
      <SectionLabel label="LIÊN KẾT" />
      <PlainRow label="Tài khoản đã kết nối" value="2 tài khoản" />
    </SettingsLayout>
  );
}

function PrivacySettings({ onBack, onBlocked }: { onBack: () => void; onBlocked: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Quyền riêng tư & an toàn">
      <SectionLabel label="QUYỀN RIÊNG TƯ" />
      <ToggleRow initialValue={false} label="Tài khoản riêng tư" />
      <ToggleRow label="Hiển thị trạng thái hoạt động" />
      <ToggleRow label="Cho phép chia sẻ hoạt động" />
      <ToggleRow label="Hiển thị trong gợi ý" />
      <SectionLabel label="AN TOÀN" />
      <PlainRow label="Tài khoản đã chặn" onPress={onBlocked} value="3" />
      <PlainRow label="Tài khoản đã ẩn" value="2" />
      <PlainRow label="Từ khóa đã ẩn" />
      <PlainRow label="Quản lý báo cáo" />
    </SettingsLayout>
  );
}

function NotificationSettings({ onBack }: { onBack: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Thông báo">
      <Text style={styles.intro}>Chọn những cập nhật bạn muốn nhận từ GoMate.</Text>
      <SectionLabel label="HOẠT ĐỘNG" />
      <ToggleRow label="Yêu cầu tham gia mới" />
      <ToggleRow label="Cập nhật yêu cầu" />
      <ToggleRow label="Tin nhắn mới" />
      <ToggleRow label="Nhắc lịch hoạt động" />
      <ToggleRow label="Thay đổi từ host" />
      <SectionLabel label="KHÁC" />
      <ToggleRow initialValue={false} label="Gợi ý hoạt động phù hợp" />
      <ToggleRow initialValue={false} label="Bản tin hằng tuần" />
      <ToggleRow initialValue={false} label="Tin tức và ưu đãi GoMate" />
    </SettingsLayout>
  );
}

function AppearanceSettings({ onBack }: { onBack: () => void }) {
  const [theme, setTheme] = useState('Sáng');
  const [accent, setAccent] = useState<string>(colors.primary);
  const accents = [colors.primary, '#FF5B4D', '#20B573', '#348CEB', '#FFAA22'];
  return (
    <SettingsLayout onBack={onBack} title="Giao diện">
      <SectionLabel label="CHẾ ĐỘ HIỂN THỊ" />
      <View style={styles.themeRow}>
        {[
          { label: 'Sáng', style: styles.lightPreview },
          { label: 'Tối', style: styles.darkPreview },
          { label: 'Hệ thống', style: styles.systemPreview },
        ].map((item) => (
          <Pressable key={item.label} onPress={() => setTheme(item.label)} style={[styles.themeCard, theme === item.label && styles.themeCardActive]}>
            <View style={[styles.themePreview, item.style]} />
            <Text style={[styles.themeLabel, theme === item.label && styles.themeLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <SectionLabel label="CỠ CHỮ" />
      <View style={styles.sliderTrack}><View style={styles.sliderFill} /><View style={styles.sliderThumb} /></View>
      <SectionLabel label="MÀU NHẤN" />
      <View style={styles.accentRow}>
        {accents.map((color) => <Pressable accessibilityLabel={`Accent ${color}`} key={color} onPress={() => setAccent(color)} style={[styles.accent, { backgroundColor: color }, accent === color && styles.accentActive]} />)}
      </View>
    </SettingsLayout>
  );
}

function LanguageSettings({ onBack }: { onBack: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Ngôn ngữ">
      <Text style={styles.intro}>Chọn ngôn ngữ hiển thị cho ứng dụng GoMate.</Text>
      <View style={styles.languagePanel}><LanguageSwitcher /></View>
    </SettingsLayout>
  );
}

function ChangePasswordScreen({ onBack }: { onBack: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('gomate2026');
  const [newPassword, setNewPassword] = useState('GoMate2026!');
  const [confirmPassword, setConfirmPassword] = useState('GoMate2026!');
  return (
    <SettingsLayout onBack={onBack} title="Đổi mật khẩu">
      <View style={styles.passwordFields}>
        <FormField label="Mật khẩu hiện tại" onChangeText={setCurrentPassword} secureTextEntry value={currentPassword} />
        <FormField label="Mật khẩu mới" onChangeText={setNewPassword} secureTextEntry value={newPassword} />
        <FormField label="Xác nhận mật khẩu mới" onChangeText={setConfirmPassword} secureTextEntry value={confirmPassword} />
      </View>
      <PrimaryButton label="Cập nhật mật khẩu" />
    </SettingsLayout>
  );
}

function HelpCenterScreen({ onBack }: { onBack: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Trung tâm trợ giúp">
      <View style={styles.searchBox}><Ionicons color={colors.textMuted} name="search-outline" size={19} /><TextInput placeholder="Tìm bài viết trợ giúp" placeholderTextColor={colors.textMuted} style={styles.searchInput} /></View>
      <SectionLabel label="CHỦ ĐỀ" />
      <View style={styles.topicGrid}>
        <TopicCard icon="person-outline" label="Tài khoản" />
        <TopicCard icon="lock-closed-outline" label="Quyền riêng tư" />
        <TopicCard icon="calendar-outline" label="Hoạt động" />
        <TopicCard icon="people-outline" label="Kết nối" />
      </View>
      <SectionLabel label="BÀI VIẾT PHỔ BIẾN" />
      <PlainRow label="Cách tạo một hoạt động" />
      <PlainRow label="Đặt lại mật khẩu" />
      <PlainRow label="Quản lý yêu cầu tham gia" />
      <PlainRow label="Báo cáo người dùng hoặc hoạt động" />
    </SettingsLayout>
  );
}

function BlockedAccountsScreen({ onBack }: { onBack: () => void }) {
  const [blocked, setBlocked] = useState([
    { id: '1', name: 'Tài khoản quảng cáo', username: '@promo_daily' },
    { id: '2', name: 'Người dùng ẩn danh', username: '@user_88241' },
    { id: '3', name: 'Tài khoản không phù hợp', username: '@inactive_user' },
  ]);
  return (
    <SettingsLayout onBack={onBack} title="Tài khoản đã chặn">
      <Text style={styles.intro}>Tài khoản đã chặn không thể xem hồ sơ, hoạt động hoặc nhắn tin cho bạn.</Text>
      <View style={styles.blockedList}>
        {blocked.map((item) => (
          <View key={item.id} style={styles.blockedRow}>
            <Image source={profileAvatar} style={styles.blockedAvatar} />
            <View style={styles.blockedCopy}><Text style={styles.blockedName}>{item.name}</Text><Text style={styles.blockedUsername}>{item.username}</Text></View>
            <Pressable onPress={() => setBlocked((current) => current.filter((account) => account.id !== item.id))} style={styles.unblockButton}><Text style={styles.unblockText}>Bỏ chặn</Text></Pressable>
          </View>
        ))}
      </View>
    </SettingsLayout>
  );
}

function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <SettingsLayout onBack={onBack} title="Giới thiệu">
      <View style={styles.aboutBrand}><BrandLogo markOnly /><Text style={styles.aboutName}>GoMate</Text><Text style={styles.version}>Phiên bản 1.0.0 (build 100)</Text></View>
      <View style={styles.aboutLinks}>
        <PlainRow label="Điều khoản dịch vụ" />
        <PlainRow label="Chính sách quyền riêng tư" />
        <PlainRow label="Nguyên tắc cộng đồng" />
        <PlainRow label="Giấy phép nguồn mở" />
        <PlainRow label="Đánh giá GoMate" />
        <PlainRow label="Theo dõi chúng tôi" />
      </View>
      <Text style={styles.madeWith}>Được tạo với sự tận tâm bởi đội ngũ GoMate</Text>
    </SettingsLayout>
  );
}

function GoMatePlusScreen({ onClose }: { onClose: () => void }) {
  const [billing, setBilling] = useState<'month' | 'year'>('year');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.plusPage}>
        <LinearGradient colors={['#DDEEFF', '#F2F8E6', '#A9B2D4']} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} style={styles.plusHero}>
          <Pressable onPress={onClose} style={styles.closeButton}><Ionicons color={colors.primary} name="close" size={23} /></Pressable>
          <Text style={styles.plusTitle}>GoMate Plus</Text>
          <Text style={styles.plusSubtitle}>Mở khóa toàn bộ trải nghiệm GoMate.</Text>
        </LinearGradient>
        <View style={styles.plusBody}>
          <View style={styles.benefits}>
            {['Bộ lọc Match nâng cao', 'Ưu tiên hiển thị hoạt động', 'Không có quảng cáo', 'Huy hiệu thành viên Plus'].map((item) => <View key={item} style={styles.benefitRow}><Ionicons color={colors.google} name="checkmark" size={18} /><Text style={styles.benefitText}>{item}</Text></View>)}
          </View>
          <View style={styles.planRow}>
            <PlanCard active={billing === 'month'} label="Hàng tháng" onPress={() => setBilling('month')} price="99.000đ" suffix="/tháng" />
            <PlanCard active={billing === 'year'} label="Hàng năm" onPress={() => setBilling('year')} price="799.000đ" suffix="/năm · tiết kiệm 33%" />
          </View>
          <PrimaryButton label="Dùng thử miễn phí" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SettingsLayout({ children, onBack, title }: { children: React.ReactNode; onBack: () => void; title: string }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} right={<Ionicons color={colors.text} name="ellipsis-horizontal" size={21} />} title={title} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <Text style={styles.sectionLabel}>{label}</Text>;
}

function MenuRow({ icon, label, onPress, value }: { icon: IconName; label: string; onPress: () => void; value?: string }) {
  return <Pressable onPress={onPress} style={styles.menuRow}><Ionicons color={colors.google} name={icon} size={20} /><Text style={styles.menuLabel}>{label}</Text>{value && <Text style={styles.rowValue}>{value}</Text>}<Ionicons color={colors.google} name="chevron-forward" size={19} /></Pressable>;
}

function PlainRow({ label, onPress, value }: { label: string; onPress?: () => void; value?: string }) {
  return <Pressable onPress={onPress} style={styles.plainRow}><Text style={styles.plainLabel}>{label}</Text>{value && <Text style={styles.rowValue}>{value}</Text>}<Ionicons color={colors.textSecondary} name="chevron-forward" size={20} /></Pressable>;
}

function ToggleRow({ initialValue = true, label }: { initialValue?: boolean; label: string }) {
  const [enabled, setEnabled] = useState(initialValue);
  return <View style={styles.plainRow}><Text style={styles.plainLabel}>{label}</Text><Switch ios_backgroundColor={colors.border} onValueChange={setEnabled} trackColor={{ false: colors.border, true: colors.primary }} value={enabled} /></View>;
}

function PrimaryButton({ label }: { label: string }) {
  return <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>{label}</Text></Pressable>;
}

function TopicCard({ icon, label }: { icon: IconName; label: string }) {
  return <Pressable style={styles.topicCard}><Ionicons color={colors.google} name={icon} size={25} /><Text style={styles.topicLabel}>{label}</Text></Pressable>;
}

function PlanCard({ active, label, onPress, price, suffix }: { active: boolean; label: string; onPress: () => void; price: string; suffix: string }) {
  return <Pressable onPress={onPress} style={[styles.planCard, active && styles.planCardActive]}><Text style={styles.planLabel}>{label}</Text><Text style={styles.planPrice}>{price}</Text><Text style={styles.planSuffix}>{suffix}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  sectionLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, marginTop: 24 },
  menuRow: { alignItems: 'center', flexDirection: 'row', minHeight: 58, paddingHorizontal: 12 },
  menuLabel: { color: colors.text, flex: 1, fontSize: 14, fontWeight: '500', marginLeft: 17 },
  plainRow: { alignItems: 'center', flexDirection: 'row', minHeight: 54 },
  plainLabel: { color: colors.text, flex: 1, fontSize: 14, lineHeight: 20 },
  rowValue: { color: colors.textMuted, fontSize: 12, marginRight: 8 },
  intro: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 420 },
  logoutRow: { alignItems: 'center', flexDirection: 'row', marginHorizontal: 12, marginTop: 30, minHeight: 52 },
  logoutText: { color: colors.danger, fontSize: 14, fontWeight: '600', marginLeft: 17 },
  themeRow: { flexDirection: 'row', gap: 10 },
  themeCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: 'transparent', borderRadius: 13, borderWidth: 2, flex: 1, padding: 9 },
  themeCardActive: { borderColor: colors.google },
  themePreview: { borderRadius: 9, height: 68, width: '100%' },
  lightPreview: { backgroundColor: colors.background },
  darkPreview: { backgroundColor: '#191720' },
  systemPreview: { backgroundColor: '#62616A' },
  themeLabel: { color: colors.text, fontSize: 11, marginTop: 7 },
  themeLabelActive: { color: colors.google, fontWeight: '700' },
  sliderTrack: { backgroundColor: colors.border, borderRadius: 3, height: 5, marginBottom: 8, marginTop: 8, position: 'relative' },
  sliderFill: { backgroundColor: colors.primary, borderRadius: 3, height: 5, width: '55%' },
  sliderThumb: { backgroundColor: colors.white, borderColor: colors.google, borderRadius: 10, borderWidth: 2, height: 20, left: '52%', position: 'absolute', top: -8, width: 20 },
  accentRow: { flexDirection: 'row', gap: 14 },
  accent: { borderRadius: 18, height: 36, width: 36 },
  accentActive: { borderColor: colors.text, borderWidth: 2 },
  languagePanel: { alignSelf: 'flex-start', marginTop: 28 },
  passwordFields: { gap: 18, marginBottom: 44, marginTop: 18 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 999, height: control.buttonHeight, justifyContent: 'center', width: '100%' },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  searchBox: { alignItems: 'center', borderColor: colors.border, borderRadius: 999, borderWidth: 1, flexDirection: 'row', height: 46, marginTop: 8, paddingHorizontal: 15 },
  searchInput: { color: colors.text, flex: 1, fontSize: 14, marginLeft: 8 },
  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: { backgroundColor: colors.surface, borderRadius: radii.input, height: 82, justifyContent: 'center', paddingHorizontal: 16, width: '48.5%' },
  topicLabel: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 8 },
  blockedList: { marginTop: 12 },
  blockedRow: { alignItems: 'center', flexDirection: 'row', minHeight: 65 },
  blockedAvatar: { borderRadius: 22, height: 44, width: 44 },
  blockedCopy: { flex: 1, marginLeft: 10 },
  blockedName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  blockedUsername: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  unblockButton: { backgroundColor: colors.surface, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
  unblockText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  aboutBrand: { alignItems: 'center', paddingTop: 34 },
  aboutName: { color: colors.text, fontSize: 23, fontWeight: '800', marginTop: 4 },
  version: { color: colors.textMuted, fontSize: 12, marginTop: 8 },
  aboutLinks: { marginTop: 60 },
  madeWith: { color: colors.textMuted, fontSize: 11, marginTop: 58, textAlign: 'center' },
  plusPage: { alignSelf: 'center', flex: 1, maxWidth: layout.maxWidth, width: '100%' },
  plusHero: { height: 230, justifyContent: 'flex-end', padding: 22 },
  closeButton: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.68)', borderRadius: 18, height: 36, justifyContent: 'center', position: 'absolute', right: 14, top: 12, width: 36 },
  plusTitle: { color: colors.white, fontSize: 27, fontWeight: '800' },
  plusSubtitle: { color: colors.whiteMuted, fontSize: 14, marginTop: 4 },
  plusBody: { flex: 1, justifyContent: 'space-between', padding: 20 },
  benefits: { gap: 16, paddingTop: 10 },
  benefitRow: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  benefitText: { color: colors.text, fontSize: 13 },
  planRow: { flexDirection: 'row', gap: 10 },
  planCard: { backgroundColor: colors.surface, borderColor: 'transparent', borderRadius: radii.input, borderWidth: 2, flex: 1, padding: 13 },
  planCardActive: { borderColor: colors.google },
  planLabel: { color: colors.textSecondary, fontSize: 11 },
  planPrice: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 5 },
  planSuffix: { color: colors.google, fontSize: 10, marginTop: 4 },
});
