/**
 * @param text the string to be truncated
 * @param truncateLength the maximum length of the text, 6 by default
 * @returns the truncated string
 */
export const getTruncatedString = (
  text: string,
  truncateLength?: number
): string => {
  const length = truncateLength || 6;
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, length)}…`;
};
