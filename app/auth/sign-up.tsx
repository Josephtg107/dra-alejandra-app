import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAccount } from '../../lib/appwrite';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    try {
      await createAccount(email, password, name);
      Alert.alert(
        'Cuenta creada', 
        'Tu cuenta ha sido creada exitosamente. Por favor verifica tu email antes de iniciar sesión.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/sign-in')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
            Crear cuenta
          </Text>
          <Text className="text-gray-600 text-center">
            Únete a nuestra comunidad
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-2">Nombre completo</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Tu nombre completo"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

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
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Confirmar contraseña</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            className={`rounded-lg py-3 mt-6 ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-center text-lg">
                Crear cuenta
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View className="mt-8 items-center">
          <Text className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Text 
              className="text-blue-500 font-semibold"
              onPress={handleSignIn}
            >
              Inicia sesión aquí
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
