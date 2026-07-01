type AvatarImgProps = {
  src: string
  alt: string
  width: number
  height: number
}

// Replace Twitter CDN URL size suffix to avoid 404s on stale assets
function normalizeAvatarSrc(src: string): string {
  return src.replace(/(\/profile_images\/.+)_normal(\.\w+)$/, '$1_400x400$2')
}

// eslint-disable-next-line jsx-a11y/alt-text -- The alt text is part of `...props`
export const AvatarImg = (props: AvatarImgProps) => (
  <img {...props} src={normalizeAvatarSrc(props.src)} />
)
