export const getTime = (time) => {
  if (time) return time.split(" ")[1]
  return ""
}

export const getTodaysDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
