export default {
  clearError (state, value) {
    state.error = []
  },

  appendError (state, value) {
    state.error.push(value)
  },

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
    state.lastLatitude = data.latitude
    state.lastLongitude = data.longitude
  },

  updateUnits (state, data) {
    state.requestUnits = data
  },

  updateForecastInterest (state, data) {
    state.forecastInterest = data
  },

  toggleLoading (state) {
    state.isLoading = !state.isLoading
  }
}
