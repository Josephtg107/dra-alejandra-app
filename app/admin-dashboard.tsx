import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExercises } from "../lib/exercise-context";

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  isActive: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  assignedExercises: string[];
}

export default function AdminDashboardScreen() {
  const { exercises, toggleExerciseStatus } = useExercises();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // TODO: Fetch from Appwrite
      const mockUsers: User[] = [
        {
          id: "1",
          email: "paciente1@example.com",
          name: "José García",
          assignedExercises: ["1", "2"]
        },
        {
          id: "2",
          email: "paciente2@example.com",
          name: "Sarahi García",
          assignedExercises: ["1", "3"]
        },
        {
          id: "3",
          email: "paciente3@example.com",
          name: "Zapata Zapato",
          assignedExercises: ["2"]
        }
      ];

      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const toggleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const assignExercises = async () => {
    if (!selectedUser) {
      Alert.alert('Error', 'Por favor selecciona un usuario');
      return;
    }
    if (selectedExercises.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un ejercicio');
      return;
    }
    if (!expiryDate) {
      Alert.alert('Error', 'Por favor establece una fecha de expiración');
      return;
    }

    try {
      // TODO: Save to Appwrite
      Alert.alert(
        '¡Ejercicios Asignados!',
        `Se han asignado ${selectedExercises.length} ejercicio(s) al usuario seleccionado con fecha de expiración: ${expiryDate}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedExercises([]);
              setExpiryDate("");
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error assigning exercises:', error);
      Alert.alert('Error', 'No se pudieron asignar los ejercicios');
    }
  };

  // Group exercises by category
  const exercisesByCategory = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.category]) {
      acc[exercise.category] = [];
    }
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const categories = Object.keys(exercisesByCategory);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Cargando dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </Text>
            <Text className="text-gray-600">
              Gestiona ejercicios y asigna a pacientes
            </Text>
          </View>

          {/* User Selection */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Seleccionar Paciente:
            </Text>
            <View className="border border-gray-300 rounded-lg">
              {users.map(user => (
                <TouchableOpacity
                  key={user.id}
                  onPress={() => setSelectedUser(user.id)}
                  className={`p-4 border-b border-gray-200 ${
                    selectedUser === user.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </Text>
                      <Text className="text-gray-600">{user.email}</Text>
                      <Text className="text-sm text-gray-500">
                        Ejercicios asignados: {user.assignedExercises.length}
                      </Text>
                    </View>
                    {selectedUser === user.id && (
                      <Text className="text-blue-500 text-lg">✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Exercise Selection by Category */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Gestionar Ejercicios por Categoría:
            </Text>
            <View className="space-y-3">
              {categories.map(category => {
                const categoryExercises = exercisesByCategory[category];
                const activeCount = categoryExercises.filter(ex => ex.isActive).length;
                const isExpanded = expandedCategories.includes(category);
                
                return (
                  <View key={category} className="border border-gray-300 rounded-lg overflow-hidden">
                    <TouchableOpacity
                      onPress={() => toggleCategory(category)}
                      className="p-4 bg-gray-50 flex-row justify-between items-center"
                    >
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-900">
                          {category}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          {activeCount} de {categoryExercises.length} ejercicios activos
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-blue-500 mr-2">
                          {isExpanded ? '▼' : '▶'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                    {isExpanded && (
                      <View className="border-t border-gray-200">
                        {categoryExercises.map(exercise => (
                          <TouchableOpacity
                            key={exercise.id}
                            onPress={() => toggleExerciseSelection(exercise.id)}
                            className={`p-4 border-b border-gray-100 ${
                              selectedExercises.includes(exercise.id) 
                                ? 'bg-blue-50' 
                                : ''
                            }`}
                          >
                            <View className="flex-row justify-between items-center">
                              <View className="flex-1">
                                <View className="flex-row items-center mb-1">
                                  <Text className="text-md font-semibold text-gray-900">
                                    {exercise.title}
                                  </Text>
                                  <View className={`ml-2 px-2 py-1 rounded-full ${
                                    exercise.isActive ? 'bg-green-100' : 'bg-red-100'
                                  }`}>
                                    <Text className={`text-xs font-semibold ${
                                      exercise.isActive ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                      {exercise.isActive ? 'Activo' : 'Inactivo'}
                                    </Text>
                                  </View>
                                </View>
                                <Text className="text-gray-600 text-sm mb-1">{exercise.description}</Text>
                                <Text className="text-xs text-gray-500">
                                  {exercise.duration}
                                </Text>
                              </View>
                              <View className="flex-row items-center">
                                <Switch
                                  value={exercise.isActive}
                                  onValueChange={() => toggleExerciseStatus(exercise.id)}
                                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                                  thumbColor={exercise.isActive ? '#ffffff' : '#ffffff'}
                                />
                                {selectedExercises.includes(exercise.id) && (
                                  <Text className="text-blue-500 text-lg ml-3">✓</Text>
                                )}
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Expiry Date */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Fecha de Expiración:
            </Text>
            <TextInput
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="YYYY-MM-DD"
              className="border border-gray-300 rounded-lg p-4 text-lg"
            />
          </View>

          {/* Assign Button */}
          <TouchableOpacity
            onPress={assignExercises}
            className="bg-blue-500 py-4 rounded-lg items-center mb-6"
          >
            <Text className="text-white text-lg font-bold">
              Asignar Ejercicios
            </Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Acciones Rápidas:
            </Text>
            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => router.push('/create-exercise')}
                className="bg-green-500 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">
                  + Crear Nuevo Ejercicio
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/user-management')}
                className="bg-purple-500 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">
                  👥 Gestionar Usuarios
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/analytics')}
                className="bg-orange-500 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">
                  📊 Ver Estadísticas
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 