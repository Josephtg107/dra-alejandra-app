import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  isActive: boolean;
}

interface ExerciseContextType {
  exercises: Exercise[];
  activeExercises: Exercise[];
  toggleExerciseStatus: (exerciseId: string) => void;
  updateExercises: (newExercises: Exercise[]) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};

interface ExerciseProviderProps {
  children: ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    // PERMEABILIDAD NASAL
    {
      id: "1",
      title: "Triángulo - Permeabilidad Nasal",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "3 min",
      category: "Permeabilidad Nasal",
      isActive: false
    },
    
    // DEGLUCIÓN SIN APARATO
    {
      id: "2",
      title: "Retractor Cara al Frente",
      description: "Colocamos el retractor en boca + 5ml de agua sobre la lengua + lengua arriba succionando + dientes haciendo contacto + labios sellados sin esfuerzo y pasar el agua",
      duration: "20 veces - 2 veces al día",
      category: "Deglución Sin Aparato",
      isActive: false
    },
    {
      id: "3",
      title: "Retractor Cabeza Hacia Arriba",
      description: "Colocamos en boca el retractor + 5ml de agua sobre la lengua + lengua arriba succionando + dientes haciendo contacto + labios sellados sin esfuerzo y pasar el agua",
      duration: "20 veces - 2 veces al día",
      category: "Deglución Sin Aparato",
      isActive: false
    },
    
    // NEUMATIZAR SENO MAXILAR
    {
      id: "4",
      title: "Inflar Globo #9 con la Boca",
      description: "Agarrar aire por la nariz + inflar cachetes e inflarlo con la boca",
      duration: "5 globos al día",
      category: "Neumatizar Seno Maxilar",
      isActive: false
    },
    {
      id: "5",
      title: "Inflar Globo #9 con la Nariz",
      description: "Introducir el globo dentro de la narina, una vez dentro y sujetándolo con la mano. Taparse la narina contraria + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "3 globos con cada narina - al día",
      category: "Neumatizar Seno Maxilar",
      isActive: false
    },
    {
      id: "6",
      title: "Silbato",
      description: "Colocas el silbato + lengua arriba + dientes en contacto + labios sellados sin esfuerzo + exhalando despacio por la nariz",
      duration: "20 veces - al día",
      category: "Neumatizar Seno Maxilar",
      isActive: false
    },
    {
      id: "7",
      title: "Popote en Vaso con Agua",
      description: "Inhalar aire por nariz + colocar el popote en una fosa nasal para exhalar. Tener boca cerrada + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "Según tolerancia",
      category: "Neumatizar Seno Maxilar",
      isActive: false
    },
    
    // LABIOS CON Y SIN APARATO
    {
      id: "8",
      title: "Pantalla Bucal",
      description: "Se coloca dentro de la boca entre los dientes/labios/cachete. Lengua arriba + dientes en contacto + labios sellados sin esfuerzo. Inflar cachetes e ir sacando el aire despacio + ir jalando el sujetador",
      duration: "20 veces - al día",
      category: "Labios Con Aparato",
      isActive: false
    },
    {
      id: "9",
      title: "Pantalla Bucal Avanzado",
      description: "Se coloca dentro de la boca entre los dientes/labios/cachete. Lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "30 minutos - al día",
      category: "Labios Con Aparato",
      isActive: false
    },
    
    // LABIOS SIN APARATO
    {
      id: "10",
      title: "Sonreír y Serio",
      description: "Sonreír enseñando los dientes y luego serio",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "11",
      title: "Labio Superior sobre Inferior",
      description: "Labio superior sobre el labio inferior y luego el labio inferior sobre el labio superior",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "12",
      title: "Enseñar Muelas",
      description: "Enseñar las muelas del lado derecho y luego las del lado izquierdo",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "13",
      title: "Barrido de Labios",
      description: "Labio de arriba barre al labio de abajo y luego el labio de abajo barre al labio de arriba",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "14",
      title: "Apretar y Relajar Labios",
      description: "Apretar labios y relajar labios",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "15",
      title: "Inflar Labios",
      description: "Inflar labio superior y luego inflar labio inferior",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "16",
      title: "Beso Exagerado",
      description: "Beso exagerado y relajar labios",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "17",
      title: "Vibrar Labios",
      description: "Vibrar labios y relajar labios",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "18",
      title: "Boca de Pez",
      description: "Boca de pez y relajar labios",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "19",
      title: "Masaje Labial",
      description: "Se realizan movimientos hacia abajo del labio superior y a los lados de manera circular. En el labio inferior movimientos hacia arriba y a los lados del labio movimientos circulares",
      duration: "3 minutos",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "20",
      title: "Hilo Dental entre Labios",
      description: "Hilo dental entre los labios cerrados sin esfuerzo",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "21",
      title: "Toquecitos con Palma",
      description: "Labios sellados SIN presión y con palma de la mano dar toquecitos. Lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    {
      id: "22",
      title: "Burbuja",
      description: "Juntar labios superior e inferior y hacer el ruido 'PA-PA-PA' sonido de burbuja",
      duration: "20 veces - 2 veces al día",
      category: "Labios Sin Aparato",
      isActive: false
    },
    
    // LENGUA PARTE MEDIA Y POSTERIOR
    {
      id: "23",
      title: "Triángulo Inicial - Cara Derecha",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "20 veces con cara derecha frente al espejo - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    {
      id: "24",
      title: "Triángulo Intermedio - Cara Derecha",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "40 veces con cara derecha frente al espejo - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    {
      id: "25",
      title: "Triángulo Avanzado - Cara Derecha",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "60 veces con cara derecha frente al espejo - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    {
      id: "26",
      title: "Triángulo Inicial - Cabeza Arriba",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "20 veces con cara hacia arriba hasta donde toca espalda - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    {
      id: "27",
      title: "Triángulo Intermedio - Cabeza Arriba",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "40 veces con cara hacia arriba hasta donde toca espalda - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    {
      id: "28",
      title: "Triángulo Avanzado - Cabeza Arriba",
      description: "Coloca el triángulo en la parte media de tu lengua + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "60 veces con cara hacia arriba hasta donde toca espalda - al día",
      category: "Lengua Parte Media y Posterior",
      isActive: false
    },
    
    // LENGUA CON APARATO
    {
      id: "29",
      title: "Lengua Arriba del Aparato",
      description: "Colocar la lengua detrás de los dientes a nivel de las rugas del paladar + lengua arriba + dientes en contacto + labios sellados sin esfuerzo",
      duration: "Todo el tiempo",
      category: "Lengua Con Aparato",
      isActive: false
    },
    {
      id: "30",
      title: "Masaje Debajo de la Lengua",
      description: "Con cepillo nuby tocar por debajo de la lengua y levantar",
      duration: "20 veces - 2 veces al día",
      category: "Lengua Con Aparato",
      isActive: false
    },
    {
      id: "31",
      title: "Tocar Punta de la Nariz",
      description: "Sacar punta de la lengua e intentar tocar la punta de la nariz",
      duration: "20 veces - 2 veces al día",
      category: "Lengua Con Aparato",
      isActive: false
    },
    
    // LENGUA SIN APARATO
    {
      id: "32",
      title: "Succión de Lengua",
      description: "Lengua en el paladar realizando una succión, SIN bajarla",
      duration: "2 minutos succionado lengua - 3 veces al día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "33",
      title: "Liga",
      description: "Colocar la liga 1 cm atrás de la punta de la lengua y colocarla en la parte anterior del paladar + dientes en contacto + labios sellados sin esfuerzo",
      duration: "Uso Diario - todo el día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "34",
      title: "Liga con Hilo Dental",
      description: "Colocas la liga en el hilo dental y le realizas un nudo. Atora el hilo dental entre los dientes de enfrente y la liga debe quedar en la parte anterior del paladar",
      duration: "Uso Diario - todo el día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "35",
      title: "Liga + Pantalla Bucal Inicial",
      description: "Se coloca la pantalla bucal dentro de la boca entre los dientes/labios/cachete. Lengua CON LA LIGA 1 cm atrás de la punta de la lengua y colocarla en la parte anterior del paladar",
      duration: "50 veces - al día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "36",
      title: "Liga + Pantalla Bucal Intermedio",
      description: "Se coloca la pantalla bucal dentro de la boca entre los dientes/labios/cachete. Lengua CON LA LIGA 1 cm atrás de la punta de la lengua y colocarla en la parte anterior del paladar",
      duration: "30 minutos - al día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "37",
      title: "Pantalla Bucal Avanzado",
      description: "Se coloca la pantalla bucal dentro de la boca entre los dientes/labios/cachete. Lengua succionada en el paladar + dientes en contacto + labios sellados sin esfuerzo",
      duration: "Dormir con la pantalla bucal",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "38",
      title: "Decir AAAAA Continua",
      description: "Sacar lengua y decir 'AAAAA' continua",
      duration: "20 veces - 2 veces al día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "39",
      title: "Decir A-A-A-A Pausado",
      description: "Sacar lengua y decir 'A-A-A-A' pausado",
      duration: "20 veces - 2 veces al día",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    {
      id: "40",
      title: "Masajeador Facial",
      description: "Colocarlo por debajo del mentón",
      duration: "20 veces - durante 20 segundos",
      category: "Lengua Sin Aparato",
      isActive: false
    },
    
    // MÚSCULOS DE LA MASTICACIÓN
    {
      id: "41",
      title: "Morder Abatelenguas",
      description: "Colocar el abatelenguas en la zona más posterior primero del lado derecho, luego del lado izquierdo. Morder por 10 minutos - 2 veces al día",
      duration: "10 minutos - 2 veces al día",
      category: "Músculos de la Masticación",
      isActive: false
    },
    {
      id: "42",
      title: "Morder Sujetador del Triángulo",
      description: "Morder el extremo del sujetador iniciando desde la ultima muela hacia el canino y luego de regreso",
      duration: "1 minuto de cada lado",
      category: "Músculos de la Masticación",
      isActive: false
    },
    {
      id: "43",
      title: "Alimentos Crunch",
      description: "Manzana, pepino o jícama. Masticar 1 pedazo (mínimo) por cada lado. Respirar por la nariz + labios sellados sin esfuerzo",
      duration: "5 a 10 minutos",
      category: "Músculos de la Masticación",
      isActive: false
    },
    
    // MÚSCULO BUCCINADOR (TONO MUSCULAR)
    {
      id: "44",
      title: "Succión con Jeringa 5ml",
      description: "Llenarla de agua y succionar el liquido mientras la sostiene con los labios",
      duration: "Según tolerancia",
      category: "Músculo Buccinador (Tono)",
      isActive: false
    },
    {
      id: "45",
      title: "Succión con Jeringa 10ml",
      description: "Llenarla de yogurt o gelatina y succionar el liquido mientras la sostiene con los labios (1cm adentro)",
      duration: "Según tolerancia",
      category: "Músculo Buccinador (Tono)",
      isActive: false
    },
    {
      id: "46",
      title: "Succión con Popote",
      description: "Yogurt o gelatina y succionar el líquido, sosteniendo el popote con los labios",
      duration: "Según tolerancia",
      category: "Músculo Buccinador (Tono)",
      isActive: false
    },
    {
      id: "47",
      title: "Inflar los Cachetes",
      description: "Inflar los cachetes y con sus dedos ir apretando hacia el interior para sacar el aire despacio",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Buccinador (Tono)",
      isActive: false
    },
    
    // MÚSCULO BUCCINADOR (MOVILIDAD)
    {
      id: "48",
      title: "Cachete Derecho e Izquierdo",
      description: "Cachete derecho inflado y luego cachete izquierdo inflado",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Buccinador (Movilidad)",
      isActive: false
    },
    {
      id: "49",
      title: "Inflar y Desinflar Cachetes",
      description: "Cachete derecho inflado y desinflar con el dedo, luego inflar cachete izquierdo y desinflar con el dedo",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Buccinador (Movilidad)",
      isActive: false
    },
    {
      id: "50",
      title: "Camello",
      description: "Simular masticar moviendo la boca cerrada hacia los lados",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Buccinador (Movilidad)",
      isActive: false
    },
    
    // MÚSCULO VELO DEL PALADAR
    {
      id: "51",
      title: "Sonido de Cochinito",
      description: "Sonido de cochinito",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Velo del Paladar",
      isActive: false
    },
    {
      id: "52",
      title: "Bostezar",
      description: "Bostezar abriendo la boca y luego boca cerrada",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Velo del Paladar",
      isActive: false
    },
    {
      id: "53",
      title: "Ruido de Gárgaras",
      description: "Simular ruido de gárgaras y relajar",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Velo del Paladar",
      isActive: false
    },
    {
      id: "54",
      title: "Inflar Globo y Mantener",
      description: "Llenar el globo de aire con la boca y mantener con los labios, sin sujetarlo con las manos",
      duration: "20 veces - 2 veces al día",
      category: "Músculo Velo del Paladar",
      isActive: false
    },
    {
      id: "55",
      title: "Tararear",
      description: "Tararear con boca cerrada",
      duration: "1 canción",
      category: "Músculo Velo del Paladar",
      isActive: false
    },
    
    // RESPIRATORIO SIN APARATO
    {
      id: "56",
      title: "Apretar Alas de la Nariz",
      description: "Apretar 3 veces alas de la nariz, sueltas y respira",
      duration: "20 veces - 2 veces al día",
      category: "Respiratorio Sin Aparato",
      isActive: false
    },
    {
      id: "57",
      title: "Tapar Fosas Nasales",
      description: "Tapar 1 fosa nasal y respirar, luego tapar la otra fosa nasal y respirar",
      duration: "5 veces de cada lado - 2 veces al día",
      category: "Respiratorio Sin Aparato",
      isActive: false
    },
    {
      id: "58",
      title: "Oler",
      description: "Oler (perfume, flores, diferentes aromas)",
      duration: "5 cosas diferentes durante el día",
      category: "Respiratorio Sin Aparato",
      isActive: false
    },
    
    // OTROS
    {
      id: "59",
      title: "Inhaloterapia - Planta Marrubio",
      description: "En 1 lt de agua hirviendo añadir 1 puño de la planta y dejar hervir. Se deja enfriar, se cuela y se coloca 5-10 ml en nebulizador, respirar por la nariz",
      duration: "Según prescripción",
      category: "Otros",
      isActive: false
    },
    {
      id: "60",
      title: "Aseo Nasal",
      description: "Realizar tu Aseo Nasal diario antes de dormir. 1 disparo en cada fosa nasal, dar masaje e inhalar (Sterimar)",
      duration: "Diario antes de dormir",
      category: "Otros",
      isActive: false
    }
  ]);

  const activeExercises = exercises.filter(exercise => exercise.isActive);

  const toggleExerciseStatus = (exerciseId: string) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, isActive: !ex.isActive }
          : ex
      )
    );
  };

  const updateExercises = (newExercises: Exercise[]) => {
    setExercises(newExercises);
  };

  const value = {
    exercises,
    activeExercises,
    toggleExerciseStatus,
    updateExercises,
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}; 