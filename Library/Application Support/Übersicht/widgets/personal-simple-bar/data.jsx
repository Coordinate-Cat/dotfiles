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
    <div className="simple-bar simple-bar--data">
      <BrowserTrack output={{ ...browserTrack, spotifyStatus: spotify.spotifyIsRunning }} />
      <Spotify output={spotify} />
      <Music output={music} />
      <Battery output={battery} />
      <Mic output={mic} />
      <Sound output={sound} />
      <Wifi output={wifi} />
      <DateDisplay />
      <Time />
      <a className="github" href="https://github.com/Coordinate-Cat">
        <svg width="14" height="14" className="github-icon" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#e89c54"/>
        </svg>
        Github
      </a>
    </div>
  )
}

export { command, refreshFrequency, className, render }
