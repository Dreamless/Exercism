export function longestSubstringWithoutRepeat(s: string): number {
  const seen: Record<string, number> = {};
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    seen[char] = (seen[char] || 0) + 1;

    while (seen[char] > 1) {
      const startChar = s[start];
      seen[startChar] -= 1;
      start += 1;
    }

    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}
