import { Stack, Tabs } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { ExerciseProvider } from '../lib/exercise-context';
import './globals.css';

function RootLayoutNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/sign-in" />
        <Stack.Screen name="auth/sign-up" />
      </Stack>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6', // blue-500
        tabBarInactiveTintColor: '#9ca3af', // gray-400
        tabBarLabelStyle: { 
          fontSize: 11, 
          fontWeight: '700',
          marginTop: 4,
        },
        tabBarStyle: { 
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          paddingBottom: 10,
          paddingTop: 8,
          height: 80,
          display: 'flex',
        },
        tabBarShowLabel: true,
        tabBarIconStyle: {
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ 
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#3b82f6' : 'transparent',
            }}>
              <Text style={{ 
                color: focused ? '#ffffff' : color, 
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 20,
              }}>
                🏠
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ejercicios"
        options={{ 
          title: 'Ejercicios',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ 
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#3b82f6' : 'transparent',
            }}>
              <Text style={{ 
                color: focused ? '#ffffff' : color, 
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 20,
              }}>
                💪
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ 
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#3b82f6' : 'transparent',
            }}>
              <Text style={{ 
                color: focused ? '#ffffff' : color, 
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 20,
              }}>
                👤
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="admin-dashboard"
        options={{ 
          title: 'Admin',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ 
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: focused ? '#3b82f6' : 'transparent',
            }}>
              <Text style={{ 
                color: focused ? '#ffffff' : color, 
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 20,
              }}>
                ⚙️
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          href: null, // This hides the auth tab
        }}
      />
      <Tabs.Screen
        name="ejercicio-detail"
        options={{
          href: null, // This hides the ejercicio-detail tab
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ExerciseProvider>
        <RootLayoutNav />
      </ExerciseProvider>
    </AuthProvider>
  );
}
