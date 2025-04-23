export const toZhDigit = (num: number): string => {
  if (num === 0) return "零";

  const digits = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖"];
  const units = ["", "拾", "佰", "仟"];
  const sections = ["", "萬", "億", "兆", "京"];

  let result = "";
  const negative = num < 0;
  const absNum = Math.abs(num);

  const numStr = absNum.toString();

  const groups: string[] = [];
  for (let i = numStr.length; i > 0; i -= 4) {
    groups.unshift(numStr.substring(Math.max(0, i - 4), i));
  }

  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex];
    let groupResult = "";
    let hasValue = false;
    let hasZero = false;

    for (let i = 0; i < group.length; i++) {
      const digit = parseInt(group[i]);

      if (digit !== 0) {
        // 如果前面有標記了需要加零，則加上"零"
        if (hasZero) {
          groupResult += "零";
          hasZero = false;
        }

        groupResult += digits[digit] + units[group.length - i - 1];
        hasValue = true;
      } else if (i < group.length - 1 && hasValue) {
        // 如果不是最後一位，且前面有值，當前位是0，則標記需要加零
        // 連續的零只標記一次
        hasZero = true;
      }
    }

    // 只有在這個組有值的情況下才添加單位（萬、億等）
    if (hasValue) {
      result +=
        groupResult +
        (groupIndex < groups.length - 1
          ? sections[groups.length - groupIndex - 1]
          : "");
    } else if (groupIndex < groups.length - 1 && result !== "") {
      // 如果這個組沒有值，但不是最後一組，且前面已經有值，則可能需要加零
      // 例如 1000001，處理到 00 這一組時
      result += "零";
    }
  }

  // 處理特殊情況：一十 -> 十
  result = result.replace(/^壹拾/, "拾");

  // 添加負號
  if (negative) {
    result = "負" + result;
  }

  return result;
};
