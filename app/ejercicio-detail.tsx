import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExercises } from "../lib/exercise-context";

export default function EjercicioDetailScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { exercises } = useExercises();
  const [exercise, setExercise] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId, exercises]);

  const fetchExerciseDetails = async () => {
    try {
      // Find the exercise from our context
      const foundExercise = exercises.find(ex => ex.id === exerciseId);
      
      if (!foundExercise) {
        Alert.alert('Error', 'Ejercicio no encontrado');
        setLoading(false);
        return;
      }

      // Generate exercise details based on the real exercise data
      const exerciseDetails = {
        id: foundExercise.id,
        title: foundExercise.title,
        image: `https://via.placeholder.com/400x250/3b82f6/ffffff?text=${encodeURIComponent(foundExercise.title)}`,
        description: foundExercise.description,
        videoUrl: "https://example.com/exercise-video.mp4", // Placeholder for now
        duration: foundExercise.duration,
        category: foundExercise.category,
        instructions: generateInstructions(foundExercise),
        benefits: generateBenefits(foundExercise.category),
        notes: generateNotes(foundExercise.category)
      };
      
      setExercise(exerciseDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      Alert.alert('Error', 'No se pudo cargar el ejercicio');
      setLoading(false);
    }
  };

  const generateInstructions = (exercise: any) => {
    // Generate specific instructions based on exercise type
    const baseInstructions = [
      "Realizar frente al espejo",
      "Mantener postura correcta",
      "Respirar por la nariz",
      "Labios sellados sin esfuerzo",
      "Lengua arriba + dientes en contacto"
    ];

    // Add specific instructions based on category
    switch (exercise.category) {
      case "Permeabilidad Nasal":
        return [
          "Coloca el triángulo en la parte media de tu lengua",
          "Lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
          "Mantener posición durante el tiempo indicado",
          ...baseInstructions
        ];
      
      case "Deglución Sin Aparato":
        return [
          "Colocar el retractor en la boca",
          "Agregar 5ml de agua sobre la lengua",
          "Lengua arriba succionando",
          "Dientes haciendo contacto",
          "Labios sellados sin esfuerzo",
          "Pasar el agua correctamente",
          ...baseInstructions
        ];
      
      case "Neumatizar Seno Maxilar":
        return [
          "Tener la nariz limpia antes de realizar el ejercicio",
          "NO realizar si tienes mocos, flemas, congestión nasal o dolor de oído",
          "Mantener lengua arriba sellando",
          ...baseInstructions
        ];
      
      case "Labios Con Aparato":
      case "Labios Sin Aparato":
        return [
          "Eliminar hipertonicidad de buccinadores y mentón",
          "Trabajar movilidad y forma de los labios",
          "Trabajar elongación y acortamiento de fibras musculares",
          ...baseInstructions
        ];
      
      case "Lengua Parte Media y Posterior":
      case "Lengua Con Aparato":
      case "Lengua Sin Aparato":
        return [
          "El sujetador NO se muerde",
          "Solo se sostiene con los labios",
          "Trabajar parte media y posterior de la lengua",
          "Estimular músculos laterales del cuello",
          ...baseInstructions
        ];
      
      case "Músculos de la Masticación":
        return [
          "Activar parte sensorial estimulando el ligamento periodontal",
          "Trabajar fuerza muscular",
          "Realizar movimientos peristálticos de la lengua al masticar",
          "Tocar el cachete contrario con la palma de la mano",
          ...baseInstructions
        ];
      
      case "Músculo Buccinador (Tono)":
      case "Músculo Buccinador (Movilidad)":
        return [
          "Aumentar tono muscular",
          "Trabajar problemas de succión",
          "Mejorar hipotonía buccinador",
          "Trabajar movilidad del buccinador",
          ...baseInstructions
        ];
      
      case "Músculo Velo del Paladar":
        return [
          "Estimular velo del paladar",
          "Trabajar istmo de las fauces",
          "Estimular parte posterior lingual",
          ...baseInstructions
        ];
      
      case "Respiratorio Sin Aparato":
        return [
          "Mejorar respiración nasal",
          "Trabajar permeabilidad nasal",
          "Estimular olfato",
          ...baseInstructions
        ];
      
      default:
        return [
          "Seguir las indicaciones específicas del ejercicio",
          "Mantener constancia en la práctica",
          "Realizar en el horario indicado",
          ...baseInstructions
        ];
    }
  };

  const generateBenefits = (category: string) => {
    switch (category) {
      case "Permeabilidad Nasal":
        return [
          "Mejora la respiración nasal",
          "Reduce la congestión nasal",
          "Estimula el desarrollo facial",
          "Mejora la función respiratoria"
        ];
      
      case "Deglución Sin Aparato":
        return [
          "Mejora la función de deglución",
          "Reduce problemas de tragar",
          "Fortalece la lengua",
          "Mejora la coordinación orofacial"
        ];
      
      case "Neumatizar Seno Maxilar":
        return [
          "Estimula el tercio medio de la cara",
          "Desarrolla los senos maxilares",
          "Proyecta el hueso malar",
          "Mejora la respiración nasal"
        ];
      
      case "Labios Con Aparato":
      case "Labios Sin Aparato":
        return [
          "Elimina hipertonicidad de buccinadores",
          "Mejora la movilidad labial",
          "Fortalece los músculos faciales",
          "Mejora la coordinación labial"
        ];
      
      case "Lengua Parte Media y Posterior":
      case "Lengua Con Aparato":
      case "Lengua Sin Aparato":
        return [
          "Fortalece la lengua",
          "Mejora la posición lingual",
          "Estimula la parte sensorial",
          "Mejora la deglución"
        ];
      
      case "Músculos de la Masticación":
        return [
          "Fortalece los músculos masticatorios",
          "Mejora la función masticatoria",
          "Estimula el desarrollo óseo",
          "Mejora la coordinación"
        ];
      
      case "Músculo Buccinador (Tono)":
      case "Músculo Buccinador (Movilidad)":
        return [
          "Aumenta el tono muscular",
          "Mejora la succión",
          "Fortalece los buccinadores",
          "Mejora la movilidad facial"
        ];
      
      case "Músculo Velo del Paladar":
        return [
          "Estimula el velo del paladar",
          "Mejora la función velofaríngea",
          "Fortalece los músculos posteriores",
          "Mejora la resonancia"
        ];
      
      case "Respiratorio Sin Aparato":
        return [
          "Mejora la respiración nasal",
          "Reduce la respiración oral",
          "Estimula el olfato",
          "Mejora la función respiratoria"
        ];
      
      default:
        return [
          "Mejora la función orofacial",
          "Fortalece los músculos",
          "Mejora la coordinación",
          "Promueve el desarrollo facial"
        ];
    }
  };

  const generateNotes = (category: string) => {
    switch (category) {
      case "Deglución Sin Aparato":
        return [
          "Aprox. 2 meses después de ejercicio de ligas en la lengua",
          "Si ya domina los ejercicios de fuerza de la lengua",
          "Si succiona y no tiembla la lengua o la baja",
          "Si mueve labios y lengua al pasar saliva esta usando mucho los buccinadores",
          "Se trabaja proyección de lengua al deglutir, peristalgia de la lengua",
          "No debe sacar el agua entre los dientes sino continua lengua baja"
        ];
      
      case "Neumatizar Seno Maxilar":
        return [
          "Con y sin disyuntor",
          "Estimula tercio medio de la cara, senos maxilares para que el hueso malar se proyecte",
          "Si no puede inflar el globo por la nariz, no tiene la lengua arriba sellando",
          "Si los oídos se tapan o duelen es porque la nariz esta congestionada",
          "Recuerda: tener siempre tu nariz limpia antes de realizar este ejercicio",
          "NO se realiza el ejercicio si tienes mocos, flemas, congestión nasal o dolor de oído"
        ];
      
      case "Labios Con Aparato":
        return [
          "Se elimina hipertonicidad de buccinadores y mentón",
          "Respirador oral y mixto",
          "Problemas de deglución",
          "Después de expansión maxilar",
          "Antes de myobrace"
        ];
      
      case "Lengua Sin Aparato":
        return [
          "Lengua en paladar trabaja fuerza",
          "La liga activa la parte sensorial de la lengua",
          "Primero uso en casa / luego en escuela",
          "Aprender a hablar con la liga",
          "Uso de liga todo el tiempo",
          "En reposo, liga a nivel de rugas palatinas y lengua la detiene",
          "Tardan 2 a 3 meses aplicados",
          "NO se realiza el ejercicio para comer, tomar agua, hacer ejercicio, dormir o si tienen gripa o tos"
        ];
      
      case "Músculos de la Masticación":
        return [
          "Último en trabajar",
          "Morder sujetador: Activa parte sensorial estimulando el ligamento periodontal, hueso alveolar, musculatura",
          "Fuerza: Morder abatelenguas, eyectores, mordedor de bandas y alimento Crunch",
          "Al masticar debe realizar movimientos peristálticos de la lengua"
        ];
      
      case "Músculo Buccinador (Tono)":
        return [
          "Aumentar tono muscular",
          "Problemas de succión",
          "Hipotonía buccinador",
          "Y si NO presenta succión digital o de objetos, etc"
        ];
      
      case "Músculo Velo del Paladar":
        return [
          "Estimula velo del paladar, istmo de las fauces, parte posterior lingual"
        ];
      
      default:
        return [
          "Todos los ejercicios se realizan frente al espejo parado o sentado con las indicaciones mencionadas",
          "Que el paciente solo le aparezcan los ejercicios que va a realizar",
          "Las NOTAS y el TIPO DE EJERCICIO uso personal"
        ];
    }
  };

  const markAsCompleted = async () => {
    try {
      // TODO: Mark exercise as completed in Appwrite
      setIsCompleted(true);
      Alert.alert(
        '¡Ejercicio Completado!',
        'Has completado este ejercicio exitosamente.',
        [
          {
            text: 'Volver al Inicio',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error marking exercise as completed:', error);
      Alert.alert('Error', 'No se pudo marcar el ejercicio como completado');
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Cargando ejercicio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Ejercicio no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="p-4 border-b border-gray-200">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mb-4"
          >
            <Text className="text-blue-500 text-lg">← Volver</Text>
          </TouchableOpacity>
          
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {exercise.title}
          </Text>
          
          <View className="flex-row items-center">
            <Text className="text-gray-500">⏱️ {exercise.duration}</Text>
            <View className="ml-4 bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-700 text-sm font-semibold">{exercise.category}</Text>
            </View>
            {isCompleted && (
              <View className="ml-4 bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 text-sm font-semibold">✓ Completado</Text>
              </View>
            )}
          </View>
        </View>

        {/* Exercise Image */}
        <View className="p-4">
          <Image
            source={{ uri: exercise.image }}
            className="w-full h-48 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Description */}
        <View className="px-4 mb-6">
          <Text className="text-lg text-gray-700 leading-6">
            {exercise.description}
          </Text>
        </View>

        {/* Notes */}
        {exercise.notes && exercise.notes.length > 0 && (
          <View className="px-4 mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Notas Importantes:
            </Text>
            {exercise.notes.map((note: string, index: number) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-orange-500 font-bold mr-3 w-6">
                  •
                </Text>
                <Text className="text-gray-700 flex-1">
                  {note}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Instructions */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Instrucciones:
          </Text>
          {exercise.instructions.map((instruction: string, index: number) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-blue-500 font-bold mr-3 w-6">
                {index + 1}.
              </Text>
              <Text className="text-gray-700 flex-1">
                {instruction}
              </Text>
            </View>
          ))}
        </View>

        {/* Benefits */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Beneficios:
          </Text>
          {exercise.benefits.map((benefit: string, index: number) => (
            <View key={index} className="flex-row items-center mb-2">
              <Text className="text-green-500 mr-3">✓</Text>
              <Text className="text-gray-700">{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Video Placeholder */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Video del Ejercicio:
          </Text>
          <View className="bg-gray-100 rounded-lg p-8 items-center justify-center">
            <Text className="text-gray-500 text-lg mb-2">🎥</Text>
            <Text className="text-gray-600 text-center">
              Video del ejercicio aparecerá aquí
            </Text>
            <Text className="text-gray-500 text-sm mt-2">
              (Se implementará con reproductor de video)
            </Text>
          </View>
        </View>

        {/* Completion Button */}
        {!isCompleted && (
          <View className="px-4 pb-8">
            <TouchableOpacity
              onPress={markAsCompleted}
              className="bg-blue-500 py-4 rounded-lg items-center"
            >
              <Text className="text-white text-lg font-bold">
                Marcar como Completado
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 