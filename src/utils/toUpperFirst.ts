const toUpperFirst = (_: string) => _
    .split(' ')
    .map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ')
export default toUpperFirst
