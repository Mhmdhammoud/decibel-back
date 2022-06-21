const ToUpperFirst = (_: string | undefined): string | null => {
  if (_) {
    return _.toLowerCase()
      .split(' ')
      .map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
      .join(' ')
      .split('_')
      .join(' ')
  }
  return null
}
declare global {
  interface String {
    toUpperFirst(): string
  }
}
String.prototype.toUpperFirst = function () {
  return this.toLowerCase()
    .split(' ')
    .map((val: String) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ')
    .split('_')
    .join(' ')
}
export default ToUpperFirst
