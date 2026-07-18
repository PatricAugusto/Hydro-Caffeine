export const FEEDBACK_WORDS = {
  water: ['GLUG!', 'SPLASH!', 'GULP!'],
  caffeine: ['ZAP!', 'BUZZ!', 'JOLT!'],
} as const;

export function randomFeedback(type: 'water' | 'caffeine'): string {
  const options = FEEDBACK_WORDS[type];
  return options[Math.floor(Math.random() * options.length)];
}