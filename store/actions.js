import _ from 'lodash'
import axios from 'axios'

export default {
  tryGetUserLocation ({ dispatch, commit }) {
    commit('clearError')

    if (!navigator.geolocation) {
      commit('setError', 'Geolocation is unavailable or disabled in the your browser')
      return
    }

    commit('toggleLoading')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const options = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          hasParent: true
        }

        try {
          await Promise.all([
            dispatch('loadPlaceInformationRequest', options),
            dispatch('loadWeatherRequest', options)
          ])
        } finally {
          commit('toggleLoading')
        }
      },
      () => {
        commit('appendError', 'Geolocation access was denied. You can always type a location in the search bar instead.')
        commit('toggleLoading')
      },
      {
        enableHighAccuracy: true
      }
    )
  },

  async loadPlaceInformationRequest ({ state, commit }, options) {
    if (!options.hasParent) {
      commit('clearError')
    }

    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/geocode/'
    if (_.has(options, 'place')) {
      url += `${options.place}`
    } else if (_.has(options, 'latitude') && _.has(options, 'longitude')) {
      url += `${options.latitude}/${options.longitude}`
    } else {
      commit('appendError', 'Neither a place name nor geographic coordinates were properly specified. Please try again.')
      return
    }

    try {
      const location = (await axios.get(url)).data
      const coords = _.pick(location, ['latitude', 'longitude'])

      commit('updateLocationData', location)
      commit('updateCoordinates', coords)

      url = `https://api.jacobandersen.dev/wikipedia/geoimage/${coords.latitude}/${coords.longitude}`
      const imageUrls = (await axios.get(url)).data.matches.map(match => match.image.url)
      commit('updatePictureData', imageUrls)
      commit('updateBgPicture', imageUrls[0])
    } catch (error) {
      commit('appendError', 'Failed to geocode the requested place name or geographic coordinates. Please verify it exists and try again.')
    } finally {
      if (!options.hasParent && state.isLoading) {
        commit('toggleLoading')
      }
    }
  },

  async loadWeatherRequest ({ state, commit }, options) {
    if (!options.hasParent) {
      commit('clearError')
    }

    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/weather/'
    if (_.has(options, 'latitude') && _.has(options, 'longitude')) {
      url += `${options.latitude}/${options.longitude}?units=${state.requestUnits}`
    } else {
      throw new Error('Neither a place name nor geographic coordinates were properly specified. Please try again.')
    }

    try {
      const weather = (await axios.get(url)).data
      commit('updateWeatherData', weather)
    } catch (error) {
      commit('appendError', 'Failed to ascertain weather conditions. Please try again.')
    } finally {
      if (!options.hasParent && state.isLoading) {
        commit('toggleLoading')
      }
    }
  }
}
