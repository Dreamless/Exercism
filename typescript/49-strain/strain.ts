export function keep<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = []
  for (let i = 0; i < arr.length; i++) {
    const item: T = arr[i]
    if (predicate(item)) {
      result.push(item)
    }
  }
  return result
}

export function discard<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return keep(arr, (item) => !predicate(item))
}
