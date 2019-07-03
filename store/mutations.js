import _ from 'lodash'

export default {
  updateWeatherData(state, value) {
    state.current.weather = _.omit(value.data.currently, [
      'summary',
      'icon',
      'precipType',
      'time',
      'precipIntensityError'
    ])

    state.current.hourlySummary = value.data.hourly.summary

    state.current.weatherForecast.hourly = this.$reduceToDataPoint(
      value.data.hourly.data,
      ['summary', 'icon', 'precipType']
    )

    state.current.weatherForecast.daily = this.$reduceToDataPoint(
      value.data.daily.data,
      ['summary', 'icon', 'precipType']
    )
  },

  updatePlaceData(state, value) {
    const data = value.data
    if (data.results.length === 0) return
    const result = data.results[0]
    state.current.place = {
      annotations: {
        ..._.pick(result.annotations, ['callingcode', 'flag']),
        sunrise: result.annotations.sun.rise.civil,
        sunset: result.annotations.sun.set.civil
      },
      bounds: result.bounds,
      components: result.components,
      geometry: result.geometry
    }
  },

  updatePictureData(state, data) {
    const pictures = []
    Object.keys(data).forEach((key) => {
      pictures.push(data[key].imageinfo[0].url)
    })
    state.bgPictures = pictures
  },

  updateBgPicture(state, url) {
    state.bgPicture = url
  },

  updateLatLon(state, data) {
    state.lastLat = data.lat
    state.lastLon = data.lon
  },

  updateUnits(state, data) {
    state.requestUnits = data
  },

  updateForecastInterest(state, data) {
    state.forecastInterest = data
  },

  updateForecastType(state, data) {
    state.forecastType = data
  },

  toggleLoading(state) {
    state.isLoading = !state.isLoading
  }
}
