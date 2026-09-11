/** Time-of-day greeting used on the home screen header. */
export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
