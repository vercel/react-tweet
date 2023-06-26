import { getTweet } from 'react-tweet/api'
import { Tweet } from '@/components/tweet'

type Props = {
  params: { tweet: string }
}

export const revalidate = 1800

export async function generateMetadata({ params }: Props) {
  const tweet = await getTweet(params.tweet).catch(() => undefined)

  if (!tweet) return { title: 'Next Tweet' }

  const username = ` - @${tweet.user.screen_name}`
  const maxLength = 68 - username.length
  const text =
    tweet.text.length > maxLength
      ? `${tweet.text.slice(0, maxLength)}…`
      : tweet.text

  return { title: `${text}${username}` }
}

export default function Page({ params }: Props) {
  return (
    <div className="max-w-[550px] min-w-[250px]">
      <Tweet id={params.tweet} />
    </div>
  )
}
