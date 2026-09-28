import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthScreen } from './src/screens/AuthScreen';
import { MainApp } from './src/screens/MainApp';
import { ProfileScreen } from './src/screens/ProfileScreen';

type Screen = 'auth' | 'profile' | 'main';

export default function App() {
  const [screen, setScreen] = useState<Screen>('auth');

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen === 'auth' && (
        <AuthScreen
          onLogin={() => setScreen('main')}
          onRegister={() => setScreen('profile')}
        />
      )}
      {screen === 'profile' && (
        <ProfileScreen
          onFinish={() => setScreen('main')}
          onSkip={() => setScreen('main')}
        />
      )}
      {screen === 'main' && <MainApp />}
    </SafeAreaProvider>
  );
}
