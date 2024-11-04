export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("filtersState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error while loading state from localStorage", err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("filtersState", serializedState)
  } catch (err) {
    console.error("Error while saving state to localStorage", err)
  }
}
