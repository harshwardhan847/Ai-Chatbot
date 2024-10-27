export function splitCodeFromText(
  text: string
): Array<{ isCode: boolean; text: string; language?: string }> {
  const regex = /```(\w+)?\s*([\s\S]+?)```|([\s\S]+?(?=```|$))/g;
  const parts = [];
  let lastIndex = 0;

  while (true) {
    const match = regex.exec(text);
    if (!match) break;

    if (match[2]) {
      if (match.index > lastIndex) {
        const nonCodeText = text.substring(lastIndex, match.index);
        parts.push({ isCode: false, text: nonCodeText });
      }
      parts.push({
        isCode: true,
        text: match[2],
        language: match[1] || undefined,
      });
      lastIndex = regex.lastIndex;
    } else if (match[3]) {
      parts.push({ isCode: false, text: match[3] });
      lastIndex = regex.lastIndex;
    }
  }

  return parts;
}
