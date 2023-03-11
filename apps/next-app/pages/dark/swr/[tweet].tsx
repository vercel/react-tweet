import { Tweet } from 'react-tweet'
import { useRouter } from 'next/router'
import { TweetPage } from '../../../components/tweet-page'

export default function Page() {
  const { query } = useRouter()
  return (
    <TweetPage>
      <Tweet apiUrl={`/api/tweet/${query.tweet}`} />
    </TweetPage>
  )
}
