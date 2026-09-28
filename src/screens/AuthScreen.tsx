import { Text } from '../components/LocalizedText';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandLogo } from '../components/BrandLogo';
import { FormField } from '../components/FormField';
import { GradientButton } from '../components/GradientButton';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { colors, layout } from '../theme';

type AuthMode = 'login' | 'register';

type AuthScreenProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === 'login';

  const continueAuth = () => {
    if (isLogin) onLogin();
    else onRegister();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View pointerEvents="none" style={styles.purpleGlow} />
      <View pointerEvents="none" style={styles.blueGlow} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>
            <View style={styles.languageRow}><LanguageSwitcher /></View>
            <View style={styles.brandArea}>
              <BrandLogo />
              <View style={styles.promisePill}>
                <Ionicons color="#6258EC" name="sparkles" size={14} />
                <Text style={styles.promiseText}>Kết nối • Trải nghiệm • Đồng hành</Text>
              </View>
              <Text style={styles.title}>
                {isLogin ? 'Chào mừng trở lại' : 'Bắt đầu cùng GoMate'}
              </Text>
              <Text style={styles.subtitle}>
                {isLogin
                  ? 'Đăng nhập để tiếp tục khám phá hoạt động phù hợp.'
                  : 'Tạo tài khoản và gặp những người cùng sở thích.'}
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.tabs}>
                {(['login', 'register'] as AuthMode[]).map((tab) => {
                  const active = mode === tab;
                  return (
                    <Pressable
                      accessibilityRole="tab"
                      accessibilityState={{ selected: active }}
                      key={tab}
                      onPress={() => setMode(tab)}
                      style={styles.tabPressable}
                    >
                      {active ? (
                        <LinearGradient
                          colors={['#7547FA', '#3A80F5']}
                          end={{ x: 1, y: 0 }}
                          start={{ x: 0, y: 0 }}
                          style={styles.activeTab}
                        >
                          <Text style={styles.activeTabText}>
                            {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                          </Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.tabText}>
                          {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.form}>
                {!isLogin && (
                  <FormField
                    icon="person-outline"
                    label="Họ và tên"
                    onChangeText={setName}
                    placeholder="Tên của bạn"
                    value={name}
                  />
                )}
                <FormField
                  icon="mail-outline"
                  keyboardType="email-address"
                  label="Email"
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  value={email}
                />
                <FormField
                  icon="lock-closed-outline"
                  label="Mật khẩu"
                  onChangeText={setPassword}
                  onRightPress={() => setShowPassword((current) => !current)}
                  placeholder="Tối thiểu 8 ký tự"
                  rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  secureTextEntry={!showPassword}
                  value={password}
                />
              </View>

              {isLogin ? (
                <Pressable accessibilityRole="button" style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </Pressable>
              ) : (
                <Text style={styles.termsText}>
                  Bằng việc đăng ký, bạn đồng ý với Điều khoản và Chính sách bảo mật.
                </Text>
              )}

              <GradientButton
                label={isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
                onPress={continueAuth}
                style={styles.primaryButton}
              />

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>hoặc tiếp tục với</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialRow}>
                <SocialButton icon="logo-google" label="Google" />
                <SocialButton icon="logo-apple" label="Apple" />
                <SocialButton icon="logo-facebook" label="Facebook" />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchPrompt}>
                  {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                </Text>
                <Pressable onPress={() => setMode(isLogin ? 'register' : 'login')}>
                  <Text style={styles.switchLink}>{isLogin ? 'Đăng ký' : 'Đăng nhập'}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SocialButton({ icon, label }: { icon: 'logo-google' | 'logo-apple' | 'logo-facebook'; label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
      <Ionicons
        color={label === 'Facebook' ? '#1877F2' : label === 'Google' ? '#4285F4' : '#111827'}
        name={icon}
        size={23}
      />
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FD', flex: 1, overflow: 'hidden' },
  flex: { flex: 1 },
  purpleGlow: { backgroundColor: 'rgba(123,70,248,0.12)', borderRadius: 130, height: 260, position: 'absolute', right: -120, top: -90, width: 260 },
  blueGlow: { backgroundColor: 'rgba(45,143,245,0.09)', borderRadius: 115, bottom: 10, height: 230, left: -145, position: 'absolute', width: 230 },
  scrollContent: { flexGrow: 1, paddingBottom: 24 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  languageRow: { alignItems: 'flex-end', marginTop: 8 },
  brandArea: { alignItems: 'center', paddingBottom: 25, paddingTop: 28 },
  promisePill: { alignItems: 'center', backgroundColor: '#F0EEFF', borderRadius: 15, flexDirection: 'row', gap: 6, marginTop: 2, paddingHorizontal: 12, paddingVertical: 7 },
  promiseText: { color: '#6258EC', fontSize: 11, fontWeight: '700' },
  title: { color: colors.ink, fontSize: 29, fontWeight: '900', letterSpacing: -0.7, marginTop: 21, textAlign: 'center' },
  subtitle: { color: colors.body, fontSize: 14, lineHeight: 21, marginTop: 7, maxWidth: 330, textAlign: 'center' },
  card: { backgroundColor: '#FFFFFF', borderColor: '#EAEDF4', borderRadius: 30, borderWidth: 1, padding: 20, shadowColor: '#20365C', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.08, shadowRadius: 30, elevation: 6 },
  tabs: { backgroundColor: '#F3F4F8', borderRadius: 18, flexDirection: 'row', height: 48, padding: 4 },
  tabPressable: { flex: 1 },
  activeTab: { alignItems: 'center', borderRadius: 15, flex: 1, justifyContent: 'center' },
  activeTabText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  tabText: { color: '#7F899F', fontSize: 14, fontWeight: '700', paddingTop: 10, textAlign: 'center' },
  form: { gap: 14, marginTop: 22 },
  forgotButton: { alignSelf: 'flex-end', paddingVertical: 12 },
  forgotText: { color: '#5C5DEB', fontSize: 12, fontWeight: '700' },
  termsText: { color: colors.body, fontSize: 11, lineHeight: 16, paddingVertical: 12, textAlign: 'center' },
  primaryButton: { marginTop: 4 },
  dividerRow: { alignItems: 'center', flexDirection: 'row', gap: 11, marginVertical: 21 },
  divider: { backgroundColor: '#E8EAF0', flex: 1, height: 1 },
  dividerText: { color: '#9AA3B6', fontSize: 11 },
  socialRow: { flexDirection: 'row', gap: 9 },
  socialButton: { alignItems: 'center', borderColor: '#E5E8EF', borderRadius: 16, borderWidth: 1, flex: 1, gap: 6, minHeight: 66, justifyContent: 'center' },
  socialLabel: { color: '#69748B', fontSize: 10, fontWeight: '600' },
  pressed: { opacity: 0.65 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 21 },
  switchPrompt: { color: colors.body, fontSize: 12 },
  switchLink: { color: '#6258EC', fontSize: 12, fontWeight: '800' },
});
