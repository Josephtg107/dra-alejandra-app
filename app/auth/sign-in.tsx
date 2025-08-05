import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, loginAccount } from '../../lib/appwrite';
import { useAuth } from '../../lib/auth-context';

export default function SignInScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await loginAccount(email, password);
      const userData = await getCurrentUser();
      login({
        $id: userData.$id,
        name: userData.name,
        email: userData.email,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
            Bienvenido de vuelta
          </Text>
          <Text className="text-gray-600 text-center">
            Inicia sesión en tu cuenta
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Contraseña</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Tu contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className={`rounded-lg py-3 mt-6 ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-center text-lg">
                Iniciar Sesión
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="mt-8 items-center">
          <Text className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Text 
              className="text-blue-500 font-semibold"
              onPress={handleSignUp}
            >
              Regístrate aquí
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
