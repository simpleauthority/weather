import axios from 'axios'

export default {
  tryGetUserLocation ({ dispatch, commit }) {
    if (!navigator.geolocation) {
      return
    }

    commit('toggleLoading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch('loadPlaceInformationRequest', {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
      },
      () => {
        commit('toggleLoading')
      }
    )
  },

  loadPlaceInformationRequest ({ state, dispatch, commit }, options) {
    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/geocode/'
    if (Object.prototype.hasOwnProperty.call(options, 'place')) {
      url += `${options.place}`
    } else if (Object.prototype.hasOwnProperty.call(options, 'lat') && Object.prototype.hasOwnProperty.call(options, 'lon')) {
      url += `${options.lat}/${options.lon}`
    } else {
      if (state.isLoading) {
        commit('toggleLoading')
      }
      return
    }

    axios
      .get(url)
      .then((resp) => {
        commit('updateLocationData', resp.data)
        return state.location
      })
      .then((place) => {
        const coords = {
          lat: place.latitude,
          lon: place.longitude
        }

        commit('updateCoordinates', coords)
        dispatch('loadBackgroundRequest', coords)
        dispatch('loadWeatherRequest', coords)
      })
  },

  loadBackgroundRequest ({ state, commit }, options) {
    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/wikipedia/geoimage/'
    if (Object.prototype.hasOwnProperty.call(options, 'lat') && Object.prototype.hasOwnProperty.call(options, 'lon')) {
      url += `${options.lat}/${options.lon}`
    } else { return }

    axios
      .get(url)
      .then((resp) => {
        commit('updatePictureData', resp.data.matches.map(match => match.image.url))
        return state.bgPictures
      })
      .then((bgPictures) => {
        commit('updateBgPicture', bgPictures[0])
      })
  },

  loadWeatherRequest ({ state, commit }, options) {
    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/weather/'
    if (Object.prototype.hasOwnProperty.call(options, 'lat') && Object.prototype.hasOwnProperty.call(options, 'lon')) {
      url += `${options.lat}/${options.lon}/`
      url += `?units=${state.requestUnits}`
    } else {
      if (state.isLoading) {
        commit('toggleLoading')
      }
      return
    }

    axios
      .get(url)
      .then((resp) => {
        commit('updateWeatherData', resp.data)
      })
      .finally(() => {
        if (state.isLoading) {
          commit('toggleLoading')
        }
      })
  }
}
