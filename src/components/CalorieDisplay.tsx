type CalorieDisplayProps = {
  calories: number;
  text: string;
};

function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
  return (
    <p className="text-white font-medium rounded-full grid grid-cols-1 gap-4 text-center">
      <span className="font-black text-6xl text-orange-500">{calories}</span>
      {text}
    </p>
  );
}

export default CalorieDisplay;
