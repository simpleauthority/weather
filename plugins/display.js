import _ from 'lodash'

export default ({ app }, inject) => {
  inject('capitalize', (str, delim, startOnly) => {
    if (!delim) {
      delim = ' '
    }

    if (!startOnly) {
      startOnly = false
    }

    const split = str.split(delim)

    let out = ''
    let count = 0
    split.forEach((piece) => {
      if (startOnly && count > 0) {
        out += `${piece} `
      } else {
        out += `${piece.substring(0, 1).toUpperCase()}${piece.substring(1).toLowerCase()} `
      }

      count++
    })

    return out.trim()
  })

  inject('formatCoords', (lat, lon) => {
    const latDirection = Math.sign(lat) === -1 ? 'South' : 'North'
    const lonDirection = Math.sign(lon) === -1 ? 'West' : 'East'

    return `${Math.abs(lat).toFixed(4) + app.$degreeSymbol()} ${latDirection}, ${Math.abs(lon).toFixed(4) + app.$degreeSymbol()} ${lonDirection}`
  })

  inject('degreeSymbol', () => '°')

  inject('generateRgbValues', (base, count) => {
    const r = parseInt(base.slice(1, 3), 16)
    const g = parseInt(base.slice(3, 5), 16)
    const b = parseInt(base.slice(5, 7), 16)

    let multiplier = 100
    const percentDiff = 1.25 / count

    const out = []
    for (let i = 0; i < count; i++) {
      if (i !== 0) {
        multiplier -= percentDiff
      }

      const rgb = ((r * multiplier) << 16) | ((g * multiplier) << 8) | (b * multiplier)
      out.push(`#${rgb.toString(16).padStart(6, 0)}`)
    }

    return out
  })

  inject('createLocationStr', (data) => {
    let out = ''

    if (!_.isEmpty(data.flag)) {
      out += `${data.flag} `
    }

    let hadCity = false
    if (!_.isEmpty(data.city)) {
      out += `${data.city}, `
      hadCity = true
    }

    if (!_.isEmpty(data.state) && !hadCity) {
      out += `${data.state}, `
    }

    if (!_.isEmpty(data.country)) {
      out += data.country
    }

    return out
  })
}
