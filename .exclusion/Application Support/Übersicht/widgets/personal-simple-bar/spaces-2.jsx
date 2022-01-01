import Spaces from './lib/components/Spaces.jsx'
import Error from './lib/components/Error.jsx'

import { parseJson } from './lib/utils.js'
import { getSettings } from './lib/settings.js'

import * as CustomStyles from './lib/styles/CustomStyles.js'

const refreshFrequency = false

const settings = getSettings()

const className = `
  ${CustomStyles.BaseStyles}
  ${CustomStyles.SpacesStyles}

  ${settings.global.floatingBar ? CustomStyles.FloatingBarOverride : ''}
  ${settings.global.noBarBg ? CustomStyles.NoBarBgOverride : ''}
  ${settings.global.bottomBar ? CustomStyles.BottomBarOverride : ''}
  ${settings.global.floatingBar && settings.global.bottomBar ? CustomStyles.FloatinBottomBarOverride : ''}
`

const { shell } = settings.global

const command = `${shell} personal-simple-bar/lib/scripts/get_spaces.sh`

const render = (state) => {
  const { output, error } = state
  if (error) return <Error widget="spaces-2" type="error" />
  if (!output) return <Error widget="spaces-2" type="noOutput" />

  const data = parseJson(output)
  if (!data) return <Error widget="spaces-2" type="noData" />

  return (
    <div className="simple-bar simple-bar--spaces">
      <Spaces output={data.spaces} SIP={data.SIP} displayId={2} />
    </div>
  )
}

export { command, refreshFrequency, className, render }
