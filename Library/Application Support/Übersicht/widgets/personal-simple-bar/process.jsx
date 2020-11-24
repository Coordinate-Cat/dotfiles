import Process from './lib/components/Process.jsx'
import Settings from './lib/components/Settings.jsx'
import Error from './lib/components/Error.jsx'

import { parseJson } from './lib/utils.js'
import { getSettings } from './lib/settings.js'

import * as CustomStyles from './lib/styles/CustomStyles.js'

const refreshFrequency = false

const settings = getSettings()

const className = `
  ${CustomStyles.BaseStyles}
  ${CustomStyles.ProcessStyles}
  ${CustomStyles.SettingsStyles}

  ${settings.global.floatingBar ? CustomStyles.FloatingBarOverride : ''}
  ${settings.global.noBarBg ? CustomStyles.NoBarBgOverride : ''}
  ${settings.global.bottomBar ? CustomStyles.BottomBarOverride : ''}
  ${settings.global.floatingBar && settings.global.bottomBar ? CustomStyles.FloatinBottomBarOverride : ''}
`

const { shell } = settings.global

const command = `${shell} personal-simple-bar/lib/scripts/get_process.sh`

const render = ({ output, error }) => {
  if (error) return <Error widget="process" type="error" />
  if (!output) return <Error widget="process" type="noOutput" />

  const data = parseJson(output)
  if (!data) return <Error widget="process" type="noData" />

  const { process } = data
  return (
    <div className="simple-bar simple-bar--process">
      <Process output={process} />
      <Settings />
    </div>
  )
}

export { command, refreshFrequency, className, render }
