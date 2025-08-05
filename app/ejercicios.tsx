import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
          <Text className="text-lg font-bold text-blue-900">{title}</Text>
          <View className="bg-blue-100 px-2 py-1 rounded-full">
            <Text className="text-xs font-semibold text-blue-700">{duration}</Text>
          </View>
        </View>
        <Text className="text-gray-600 text-sm">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function EjerciciosScreen() {
  const exercises = [
    {
      id: '1',
      title: 'Ejercicio de Respiración',
      description: 'Técnicas de respiración para reducir la ansiedad y mejorar la concentración',
      duration: '10 min'
    },
    {
      id: '2',
      title: 'Meditación Guiada',
      description: 'Sesión de meditación para calmar la mente y encontrar paz interior',
      duration: '15 min'
    },
    {
      id: '3',
      title: 'Ejercicios de Estiramiento',
      description: 'Rutina de estiramientos para liberar tensión muscular',
      duration: '8 min'
    },
    {
      id: '4',
      title: 'Visualización Positiva',
      description: 'Ejercicio de visualización para mejorar el estado de ánimo',
      duration: '12 min'
    },
    {
      id: '5',
      title: 'Relajación Muscular',
      description: 'Técnica de relajación progresiva para reducir el estrés',
      duration: '20 min'
    }
  ];

  const handleExercisePress = (exerciseId: string) => {
    console.log(`Starting exercise ${exerciseId}`);
    // TODO: Navigate to exercise detail or start exercise
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          <Text className="text-3xl font-bold text-blue-900 text-center mb-2">
            Ejercicios
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Selecciona un ejercicio para comenzar
          </Text>
          
          <View className="space-y-2">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                description={exercise.description}
                duration={exercise.duration}
                onPress={() => handleExercisePress(exercise.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
