import { Tweet } from 'next-tweet'
import { useParams } from 'react-router-dom'

export const TweetPage = () => {
  const params = useParams()
  return <Tweet id={params.id!} />
}
