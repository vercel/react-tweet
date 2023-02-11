export default function formatNumber(n: number): string {
  if (n > 999999) return `${(n / 1000000).toFixed(1)}M`
  if (n > 999) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}
