import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export const VideoJS = (props: any) => {
  const videoReference = React.useRef<any>(null)
  const playerReference = React.useRef<any>(null)
  const {options, onReady} = props
  React.useEffect(() => {
    // Initializing video.js player
    if (!playerReference.current) {
      const videoElement = videoReference.current
      if (!videoElement) return
      const player = playerReference.current =
         videojs(videoElement, options, () => {
           videojs.log('Video player is ready')
           onReady && onReady(player)
         })
    }
  }, [options, videoReference])

  // Destroy video.js player on component unmount
  React.useEffect(() => {
    const player = playerReference.current
    return () => {
      if (player) {
        player.dispose()
        playerReference.current = null
      }
    }
  }, [playerReference])
  // wrap player with data-vjs-player` attribute
  // so no additional wrapper are created in the DOM
  return (
    <div className={props.className} data-vjs-player>
      <video width="640" height="480" ref={videoReference} className='video-js vjs-big-playcentered'/>
    </div>
  )
}
export default VideoJS