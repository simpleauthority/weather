import _ from 'lodash'

export default ({ app }, inject) => {
  inject('toChartDataset', (fcInterest, obj) => {
    const baseColor = '#ffcd51'

    const capitalizedFcInterest = app.$capitalize(fcInterest)

    const flattened = obj.map((entry) => {
      const wanted = entry[fcInterest]
      if (_.isObject(wanted)) {
        const temp = {}

        for (const [key, value] of Object.entries(wanted)) {
          temp[key] = value
        }

        return temp
      } else {
        return wanted
      }
    })

    const rgbDistribution = app.$generateRgbValues(baseColor, Object.keys(flattened).length)

    let clean = []

    const temp = {}
    for (const component of flattened) {
      if (component.constructor.name === 'Object') {
        for (const [key, value] of Object.entries(component)) {
          if (_.has(temp, key)) {
            temp[key].push(value)
          } else {
            temp[key] = [value]
          }
        }
      }
    }

    let idx = 0
    for (const [key, value] of Object.entries(temp)) {
      clean.push({
        label: `${app.$capitalize(key)} ${capitalizedFcInterest}`,
        backgroundColor: rgbDistribution[idx],
        data: value
      })

      idx++
    }

    if (_.isEmpty(clean)) {
      clean = [{
        label: capitalizedFcInterest,
        backgroundColor: baseColor,
        data: flattened
      }]
    }

    return clean
  })
}
