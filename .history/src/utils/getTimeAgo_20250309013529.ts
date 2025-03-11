export default function getTimeAgo(timestamp: number) {
  const now = new Date().getTime();
  
  const messageTime = timestamp * 1000;
  
  const diff = now - messageTime;
  
  const seconds = Math.floor(diff / 1000);
  
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);
  
  const pluralize = (number: number, one: string, few: string, many: string) => {
    if (number % 10 === 1 && number % 100 !== 11) {
      return `${number} ${one}`;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
      return `${number} ${few}`;
    } else {
      return `${number} ${many}`;
    }
  };
  
  if (years > 0) {
    return pluralize(years, 'год', 'года', 'лет') + ' назад';
  } else if (months > 0) {
    return pluralize(months, 'месяц', 'месяца', 'месяцев') + ' назад';
  } else if (days > 0) {
    return pluralize(days, 'день', 'дня', 'дней') + ' назад';
  } else if (hours > 0) {
    return pluralize(hours, 'час', 'часа', 'часов') + ' назад';
  } else if (minutes > 0) {
    return pluralize(minutes, 'минуту', 'минуты', 'минут') + ' назад';
  } else {
    return pluralize(seconds, 'секунду', 'секунды', 'секунд') + ' назад';
  }
}