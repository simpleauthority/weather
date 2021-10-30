export default {
  updateWeatherData (state, value) {
    state.weather = value
  },

  updateLocationData (state, value) {
    state.location = value
  },

  updatePictureData (state, data) {
    state.bgPictures = data
  },

  updateBgPicture (state, url) {
    state.bgPicture = url
  },

  updateCoordinates (state, data) {
    state.lastLat = data.lat
    state.lastLon = data.lon
  },

  updateUnits (state, data) {
    state.requestUnits = data
  },

  updateForecastInterest (state, data) {
    state.forecastInterest = data
  },

  updateForecastType (state, data) {
    state.forecastType = data
  },

  toggleLoading (state) {
    state.isLoading = !state.isLoading
  }
}
