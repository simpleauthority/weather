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

  updateBgPictures (state, data) {
    state.bgPictures = data
  },

  updateUnits (state, data) {
    state.requestUnits = data
  },

  updateForecastInterest (state, data) {
    state.forecastInterest = data
  },

  toggleLoading (state) {
    state.isLoading = !state.isLoading
  },

  setLoadingMessage (state, data) {
    state.loadingMessage = data
  },

  resetLoadingMessage (state) {
    state.loadingMessage = undefined
  },

  reset (state) {
    if (!state.isLoading) {
      this.commit('toggleLoading')
    }

    this.commit('resetLoadingMessage')
    this.commit('clearError')
    this.commit('updateBgPictures', [])
    this.commit('updateUnits', 'metric')
    this.commit('updateForecastInterest', 'temperature')
    this.commit('updateLocationData', {})
    this.commit('updateWeatherData', { current: {}, hourly: [], daily: [] })

    if (state.isLoading) {
      this.commit('toggleLoading')
    }
  }
}
