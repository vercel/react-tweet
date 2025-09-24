export interface HighlightedBadge {
  url: string
}

export interface UserHighlightedLabel {
  description?: string
  badge?: HighlightedBadge
  url?: { url: string; url_type: 'DeepLink' }
  user_label_type: 'BusinessLabel'
  user_label_display_type: 'Badge'
}

export interface TweetUser {
  id_str: string
  name: string
  profile_image_url_https: string
  profile_image_shape: 'Circle' | 'Square' | 'Hexagon'
  screen_name: string
  verified: boolean
  verified_type?: 'Business' | 'Government'
  is_blue_verified: boolean
  highlighted_label?: UserHighlightedLabel
}
