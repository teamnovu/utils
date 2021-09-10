let id = 0

function generateId() {
  return ++id
}

export default function useId() {
  return generateId()
}
