import React, { useRef, useState } from 'react'
import VideoJS from './VideoPlayer'

function App() {

  const [url, setUrl] = useState('https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8') //'https://5940924978228.streamlock.net/8101/smil:8101.smil/playlist.m3u8'
  const [searchText, setSearchText] = useState(url)
  const playerReference = useRef(null)

  const handleChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleSendUrl = () => {
    setUrl(searchText)
  }

  return (
    <main className='main'>
      
      <div className="input">
        <input type="text" value={url} onChange={handleChangeUrl} />
        <button onClick={handleSendUrl}>Send</button>
      </div>

      <VideoJS
        key={url}
        className='videojs'
        options={{
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [{
            src: url,
            type: 'application/vnd.apple.mpegurl'
          }]
        }}
        onReady={(player: any) => {
          playerReference.current = player
        }}
      />
    </main>
  )
}

export default App
