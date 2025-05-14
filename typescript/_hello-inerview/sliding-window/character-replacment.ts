/**
 * Longest Repeating Character Replacement
 * Write a function to find the length of the longest substring containing the same letter
 * in a given string s, after performing at most k operations in which you can choose any character
 * of the string and change it to any other uppercase English letter.
 */
export function characterReplacement(s: string, k: number): number {
  const state: Record<string, number> = {};
  let maxFreq = 0;
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    state[char] = (state[char] || 0) + 1;
    maxFreq = Math.max(maxFreq, state[char]);
    if (end - start + 1 > maxFreq + k) {
      const startChar = s[start];
      state[startChar] -= 1;
      start += 1;
    }

    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}
