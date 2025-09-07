export const findMinAvailableNumber = (
  existingTitles: string[],
  baseName: string,
): number => {
  const usedNumbers = new Set<number>()

  existingTitles.forEach((title) => {
    if (title === baseName) {
      usedNumbers.add(0)
    } else {
      const match = title.match(
        new RegExp(
          `^${baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\((\\d+)\\)$`,
        ),
      )
      if (match) {
        usedNumbers.add(parseInt(match[1], 10))
      }
    }
  })

  let number = 0
  while (usedNumbers.has(number)) {
    number++
  }
  return number
}

export const generateTitle = (baseName: string, number: number): string => {
  return number === 0 ? baseName : `${baseName} (${number})`
}

export const generateTabId = (counter: number): string => {
  return `tab${counter}`
}

export const selectTabColor = (tabCount: number, colors: string[]): string => {
  const colorIndex = (tabCount - 1) % colors.length
  return colors[colorIndex]
}
