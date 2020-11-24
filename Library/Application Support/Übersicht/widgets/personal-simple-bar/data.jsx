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
    </div>
  )
}

export { command, refreshFrequency, className, render }
