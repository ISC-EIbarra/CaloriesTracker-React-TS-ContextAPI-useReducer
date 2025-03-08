import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '../types';
import { categories } from '../data/categories';
import { useActivity } from '../hooks/useActivity';

const InitialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
};

export default function Form() {
  const { state, dispatch } = useActivity();
  const [activity, setActivity] = useState<Activity>(InitialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? parseInt(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({
      ...InitialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-4 bg-white p-4 rounded-2xl"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="category" className="font-medium">
          Categoría
        </label>
        <select
          className="border border-slate-300 p-2 rounded-3xl w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="name" className="font-medium">
          Actividad
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 px-4 py-2 rounded-3xl"
          placeholder="Ejemplo - Comida: Jugo de Naranja, Ensalada, Ejercicio: Pesas, Bicicleta, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="calories" className="font-medium">
          Calorías
        </label>
        <input
          id="calories"
          type="number"
          min={0}
          className="border border-slate-300 px-4 py-2 rounded-3xl"
          placeholder="Ejemplo - Calorías: 300, 500, etc."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          type="submit"
          className="bg-green-600 hover:bg-green-800 transition-colors text-white px-4 py-2 font-medium rounded-3xl cursor-pointer disabled:opacity-50"
          value={
            activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'
          }
          disabled={!isValidActivity()}
        />
      </div>
    </form>
  );
}
