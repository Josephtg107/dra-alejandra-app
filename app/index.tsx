import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExercises } from "../lib/exercise-context";

const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Buenos días";
  } else if (hour >= 12 && hour < 20) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
};

const ExerciseCard = ({ title, description, duration, onPress }: { 
  title: string; 
  description: string; 
  duration: string; 
  onPress: () => void 
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="mb-4">
      <View className="bg-blue-50 rounded-lg mx-4 p-4 border border-blue-200">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-blue-900 flex-1 mr-2">{title}</Text>
          <View className="bg-blue-100 px-2 py-1 rounded-full flex-shrink-0 w-20">
            <Text className="text-xs font-semibold text-blue-700" numberOfLines={1} ellipsizeMode="tail">
              {duration}
            </Text>
          </View>
        </View>
        <Text className="text-gray-600 text-sm">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Index() {
  const greeting = getGreeting();
  const name = "Jose"; // This would come from your auth/user state
  const { activeExercises } = useExercises();

  const handleExercisePress = (exerciseId: string) => {
    // Navigate to exercise detail
    router.push(`/ejercicio-detail?exerciseId=${exerciseId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          {/* Welcome Message */}
          <Text className="text-3xl font-bold text-black text-center mb-5">
            ¡Bienvenido, {name}!
          </Text>

          {/* Streak Counter */}
          <View className="flex-row items-center justify-center mb-6">
            <Text className="text-2xl mr-2">🔥</Text>
            <Text className="text-lg font-semibold text-black">
              3 días seguidos
            </Text>
          </View>

          {/* Exercise Cards */}
          {activeExercises.length > 0 ? (
            <View className="space-y-2">
              {activeExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.title}
                  description={exercise.description}
                  duration={exercise.duration}
                  onPress={() => handleExercisePress(exercise.id)}
                />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-12">
              <Text className="text-2xl font-bold text-gray-400 mb-2">
                No exercises for now!
              </Text>
              <Text className="text-gray-500 text-center">
                Please activate some exercises from the Admin panel
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

