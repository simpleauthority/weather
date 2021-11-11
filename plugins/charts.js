import _ from 'lodash'

export default ({ app }, inject) => {
  inject('toChartSeries', (targets, obj) => {
    const series = []
    for (const target of targets) {
      const data = []

      let multi = false
      for (const entry of obj) {
        const time = _.get(entry, 'time')
        const found = _.get(entry, target.path)
        if (_.isPlainObject(found)) {
          multi = true

          const temp = {}
          for (const [key, value] of Object.entries(found)) {
            temp[key] = {
              time,
              value
            }
          }

          data.push(temp)
        } else {
          data.push([time, found])
        }
      }

      if (multi) {
        const out = {}

        for (const entry of data) {
          for (const [key, value] of Object.entries(entry)) {
            if (_.has(out, key)) {
              out[key].push(value)
            } else {
              out[key] = [value]
            }
          }
        }

        for (const [key, value] of Object.entries(out)) {
          const data = []

          for (const inner of Object.values(value)) {
            if (!_.isPlainObject(inner.value)) {
              data.push([inner.time, inner.value])
            }
          }

          if (!_.isEmpty(data)) {
            series.push({
              name: `${app.$capitalize(key, '_')}`,
              data
            })
          }
        }
      } else {
        series.push({
          name: target.name,
          data
        })
      }
    }

    return series
  })
}
