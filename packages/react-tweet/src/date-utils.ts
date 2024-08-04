type PartsObject = Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}

const formatter = new Intl.DateTimeFormat('en-US', options)

const partsArrayToObject = (
  parts: ReturnType<typeof formatter.formatToParts>
): PartsObject => {
  const result = {} as PartsObject

  for (const part of parts) {
    result[part.type] = part.value
  }

  return result
}

export const formatDate = (date: Date) => {
  const parts = partsArrayToObject(formatter.formatToParts(date))
  const formattedTime = `${parts.hour}:${parts.minute} ${parts.dayPeriod}`
  const formattedDate = `${parts.month} ${parts.day}, ${parts.year}`
  return `${formattedTime} · ${formattedDate}`
}

export const formatRemainingTime = (date: Date) => {
  const timeDiff = date.getTime() - Date.now()
  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days} days left`
    } else if (hours > 0) {
      return `${hours} hours left`
    } else if (minutes > 0) {
      return `${minutes} minutes left`
    } else {
      return `${seconds} seconds left`
    }
  } else {
    return 'Final results'
  }
}
