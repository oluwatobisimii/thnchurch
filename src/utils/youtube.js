// Pulls the video ID out of any common YouTube link format.
export function getYouTubeId(url = '') {
  if (!url) return null;
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

// hqdefault always exists for public videos (maxresdefault doesn't).
export function getYouTubeThumb(url, quality = 'hqdefault') {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : null;
}
