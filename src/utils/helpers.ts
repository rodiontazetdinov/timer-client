export function countdownFromStart(startTime: number): { timeLeft: string; isExpired: boolean } {
  const thirtyMinutesInSeconds = 3 * 60;
  const currentTime = Math.floor(Date.now() / 1000); // текущее время в секундах
  const endTime = startTime + thirtyMinutesInSeconds; // время окончания

  const timeRemaining = endTime - currentTime;
  const isExpired = timeRemaining <= 0;

  if (isExpired) {
      return {
          timeLeft: "00:00", // если время вышло, возвращаем 00:00
          isExpired: true,
      };
  }

  // Рассчитываем оставшиеся минуты и секунды
  const minutesLeft = Math.floor(timeRemaining / 60);
  const secondsLeft = timeRemaining % 60;

  // Форматируем время в строку 'MM:SS'
  const formattedTimeLeft = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

  return {
      timeLeft: formattedTimeLeft,
      isExpired: false,
  };
}
