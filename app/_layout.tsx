import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState} from 'react';
import { auth } from './firebaseConfig';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(_user => {
      setUser(_user);
    });

    if (loaded) {
      SplashScreen.hideAsync();
    }

    const inAuthGroup = segments[0] === '(tabs)';
    
    if(user && !inAuthGroup){
      router.replace("(tabs)");
    }else if(!user && inAuthGroup){
      router.replace("/(auth)/signIn");
    }

    return unsubscribe;
  }, [loaded, user]);


  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)/signIn" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/recover" options={{ headerShown: true, title: 'Recuperar Senha', headerTintColor: 'white', headerStyle:{backgroundColor: '#432614'}, statusBarStyle:'dark' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
