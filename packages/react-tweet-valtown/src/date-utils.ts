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
