import CalorieDisplay from './CalorieDisplay';
import { useActivity } from '../hooks/useActivity';

function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-medium text-white text-center">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Quemadas (Ejercicio)" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}

export default CalorieTracker;
