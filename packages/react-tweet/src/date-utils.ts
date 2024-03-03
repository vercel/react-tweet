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

type PartsObject = Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>

const partsArrayToObject = (
  parts: ReturnType<typeof formatter.formatToParts>
): PartsObject =>
  parts.reduce(
    (prev, curr) => ({ ...prev, [curr.type]: curr.value }),
    {} as PartsObject
  )

export const formatDate = (date: Date) => {
  const parts = partsArrayToObject(formatter.formatToParts(date))
  const formattedTime = `${parts.hour}:${parts.minute} ${parts.dayPeriod}`
  const formattedDate = `${parts.month} ${parts.day}, ${parts.year}`
  return `${formattedTime} · ${formattedDate}`
}
