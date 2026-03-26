// src/utils/videoEmbed.js
export function getVideoEmbed(url) {
  if (!url) return '';

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.split('v=')[1] || url.split('/').pop();
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  }

  // TikTok
  if (url.includes('tiktok.com')) {
    return `<blockquote class="tiktok-embed" cite="${url}" data-video-id="" style="max-width: 605px;min-width: 325px;">
              <section><a href="${url}">View on TikTok</a></section>
            </blockquote>
            <script async src="https://www.tiktok.com/embed.js"></script>`;
  }

  // Instagram
  if (url.includes('instagram.com')) {
    return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14">
              <a href="${url}">View on Instagram</a>
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>`;
  }

  // Facebook
  if (url.includes('facebook.com')) {
    return `<div class="fb-video" data-href="${url}" data-width="500" data-show-text="false"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0"></script>`;
  }

  // Pinterest
  if (url.includes('pinterest.com')) {
    return `<a data-pin-do="embedPin" href="${url}"></a>
            <script async defer src="//assets.pinterest.com/js/pinit.js"></script>`;
  }

  // Fallback: just link out
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
}
