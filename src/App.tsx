import { useEffect, useMemo } from 'react';
import Form from './components/Form';
import ActivityList from './components/ActivityList';
import CalorieTracker from './components/CalorieTracker';
import { useActivity } from './hooks/useActivity';

function App() {
  const { state, dispatch } = useActivity();

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-2xl font-medium text-white">
            Contador de calorías
          </h1>
          {canRestartApp() && (
            <button
              className="text-white border rounded-3xl px-4 py-2 hover:bg-white hover:text-black transition-colors"
              onClick={() => dispatch({ type: 'restart' })}
            >
              Reiniciar Aplicación
            </button>
          )}
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-10 ">
        <ActivityList />
      </section>
    </>
  );
}

export default App;
