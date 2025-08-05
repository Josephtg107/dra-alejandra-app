import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../lib/auth-context';

const ExerciseCard = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} className="mb-3">
      <View className="bg-gray-200 rounded-lg mx-4 h-24 flex-row items-center">
        <View className="w-1/3 h-20 mx-2">
          <View className="bg-gray-300 rounded-lg w-full h-full items-center justify-center">
            <Text className="text-gray-500 text-sm">Image</Text>
          </View>
        </View>
        <View className="flex-1 h-20 justify-center items-center">
          <Text className="text-black font-semibold text-lg text-center">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function PerfilScreen() {
  const { logout } = useAuth();
  const exerciseCategories = [
    { id: 'visual', title: 'Ejercicio Visual' },
    { id: 'auditivo', title: 'Ejercicio Auditivo' },
    { id: 'motriz', title: 'Ejercicio Motriz' },
    { id: 'cognitivo', title: 'Ejercicio Cognitivo' },
    { id: 'sensorial', title: 'Ejercicio Sensorial' },
  ];

  const handleExercisePress = (exerciseId: string) => {
    // TODO: Navigate to exercise detail
    console.log(`Pressed exercise ${exerciseId}`);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al cerrar sesión');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          {/* Header */}
          <Text className="text-3xl font-bold text-black mb-6">
            Perfil
          </Text>

          {/* Exercise Categories */}
          <View className="space-y-3 mb-8">
            {exerciseCategories.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                onPress={() => handleExercisePress(exercise.id)}
              />
            ))}
          </View>

          {/* Sign Out Button */}
          <View className="items-center">
            <TouchableOpacity 
              onPress={handleSignOut}
              className="bg-blue-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
