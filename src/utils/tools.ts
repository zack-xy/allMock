// 生成min～max范围的随机整数
export function randomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
