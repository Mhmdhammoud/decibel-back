const slugGenerator = (title: string) => title.replace(/ /g, "-").toLowerCase()
export default slugGenerator
