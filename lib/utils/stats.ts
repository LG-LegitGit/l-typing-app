export const calculateWPM = (userInput: string, startTime: number | null, endTime: number | null) => {
  if (!startTime) return 0;
  const now = endTime || Date.now();
  const minutes = (now - startTime) / 60000;
  
  // Standard WPM: (characters / 5) / minutes
  const words = userInput.length / 5;
  return minutes > 0 ? Math.round(words / minutes) : 0;
};

export const calculateAccuracy = (totalKeystrokes: number, errors: number) => {
  if (totalKeystrokes === 0) return 100;
  const accuracy = ((totalKeystrokes - errors) / totalKeystrokes) * 100;
  return Math.max(0, Math.round(accuracy));
};