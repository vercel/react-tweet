import type { Tweet } from './types'

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com'

export async function getTweet(id: string): Promise<Tweet | undefined> {
  const url = new URL(`${SYNDICATION_URL}/tweet-result`)

  url.searchParams.set('id', id)
  url.searchParams.set('lang', 'en')
  url.searchParams.set(
    'features',
    [
      'tfw_timeline_list:',
      'tfw_follower_count_sunset:true',
      'tfw_tweet_edit_backend:on',
      'tfw_refsrc_session:on',
      'tfw_show_business_verified_badge:on',
      'tfw_duplicate_scribes_to_settings:on',
      'tfw_show_blue_verified_badge:on',
      'tfw_legacy_timeline_sunset:true',
      'tfw_show_gov_verified_badge:on',
      'tfw_show_business_affiliate_badge:on',
      'tfw_tweet_edit_frontend:on',
    ].join(';')
  )

  const res = await fetch(url)

  if (res.ok) return res.json()
  if (res.status === 404) {
    console.log('JSON', await res.json())
    return
  }

  throw new Error(
    `Fetch for the embedded tweets of "${id}" failed with code: ${res.status}`
  )
}
