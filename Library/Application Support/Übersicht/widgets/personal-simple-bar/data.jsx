import Time from './lib/components/Time.jsx'
import DateDisplay from './lib/components/Date.jsx'
import Battery from './lib/components/Battery.jsx'
import Sound from './lib/components/Sound.jsx'
import Mic from './lib/components/Mic.jsx'
import Wifi from './lib/components/Wifi.jsx'
import Spotify from './lib/components/Spotify.jsx'
import Music from './lib/components/Music.jsx'
import BrowserTrack from './lib/components/BrowserTrack.jsx'
import Error from './lib/components/Error.jsx'

import { parseJson, getActiveWidgets } from './lib/utils.js'
import { getSettings } from './lib/settings.js'

import * as CustomStyles from './lib/styles/CustomStyles.js'

const refreshFrequency = 10000

const settings = getSettings()


const className = `
  ${CustomStyles.BaseStyles}
  ${CustomStyles.DateStyles}
  ${CustomStyles.TimeStyles}
  ${CustomStyles.BatteryStyles}
  ${CustomStyles.WifiStyles}
  ${CustomStyles.MicStyles}
  ${CustomStyles.SoundStyles}
  ${CustomStyles.SpotifyStyles}
  ${CustomStyles.MusicStyles}
  ${CustomStyles.BrowserTrackStyles}
  ${CustomStyles.SpecterStyles}
  ${CustomStyles.GithubStyles}

  ${settings.global.floatingBar ? CustomStyles.FloatingBarOverride : ''}
  ${settings.global.noColorInData ? CustomStyles.NoColorInDataOverride : ''}
  ${settings.global.noBarBg ? CustomStyles.NoBarBgOverride : ''}
  ${settings.global.bottomBar ? CustomStyles.BottomBarOverride : ''}
  ${settings.global.floatingBar && settings.global.bottomBar ? CustomStyles.FloatinBottomBarOverride : ''}

  ${CustomStyles}
`

const activeWidgets = getActiveWidgets(settings)
const { shell } = settings.global

const command = `${shell} personal-simple-bar/lib/scripts/get_data.sh "${activeWidgets}"`

const render = ({ output, error }) => {
  if (error) return <Error widget="data" type="error" />
  if (!output) return <Error widget="data" type="noOutput" />

  const data = parseJson(output)
  if (!data) return <Error widget="data" type="noData" />

  const { battery, wifi, mic, sound, spotify, music, browserTrack } = data
  return (
    <div className="simple-bar simple-bar--data group">
      <a className="icon-svg" href="figma:">
        <svg width="13" height="13" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M336,176a80,80,0,0,0,0-160H176a80,80,0,0,0,0,160,80,80,0,0,0,0,160,80,80,0,1,0,80,80V176Z" fill="#fff"/><circle cx="336" cy="256" r="80" fill="#fff"/></svg>
      </a>
      <a className="icon-svg-vscode" href="vscode:">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 234 235.1" width="2488" height="2500"><path class="st0" d="M83.3 143.9l-58 45.2L0 176.5V58.7L25.2 46l57.6 45.3L174 0l60 23.9v186.9l-59.7 24.3-91-91.2zm88.9 15.9V75.3l-54.6 42.3 54.6 42.2zM27.3 144.6L56 118.5 27.3 89.9v54.7z" fill="#fff"/></svg>
      </a>
      <a className="icon-svg" href="https://github.com/Coordinate-Cat">
        <svg width="13" height="13" className="github-icon" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#fff"/></svg>
      </a>
      <a className="icon-svg" href="https://twitter.com/home">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" fill="#fff"/></svg>
      </a>
      <div className="data-group">
        <BrowserTrack output={{ ...browserTrack, spotifyStatus: spotify.spotifyIsRunning }} />
        <Spotify output={spotify} />
        <Music output={music} />
        <Battery output={battery} />
        <Mic output={mic} />
        <Sound output={sound} />
        <Wifi output={wifi} />
        <DateDisplay />
        <Time />
      </div>
    </div>
  )
}

export { command, refreshFrequency, className, render }
