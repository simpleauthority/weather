import _ from 'lodash'

export default ({ app }, inject) => {
  inject('reduceToDataPoint', (obj, omissions) => {
    const out = {}
    obj
      .map(current => _.omit(current, omissions))
      .forEach((current) => {
        Object.keys(current).forEach((key) => {
          if (out[key] === undefined) {
            out[key] = [current[key]]
          } else {
            out[key].push(current[key])
          }
        })
      })
    return out
  })
}
