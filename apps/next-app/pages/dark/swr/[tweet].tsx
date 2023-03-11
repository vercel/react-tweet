import { Tweet } from 'react-tweet'
import { useRouter } from 'next/router'
import { TweetPage } from '../../../components/tweet-page'

export default function Page() {
  const { query } = useRouter()
  const id = query.tweet

  return (
    <TweetPage>
      <Tweet apiUrl={id && `/api/tweet/${id}`} />
    </TweetPage>
  )
}
