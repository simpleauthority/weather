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
    if (options.hasOwnProperty('place')) {
      url += `${options.place}`
    } else if (options.hasOwnProperty('lat') && options.hasOwnProperty('lon')) {
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
        commit('updatePlaceData', resp)
        return state.current.place
      })
      .then((place) => {
        const geom = {
          lat: place.geometry.lat,
          lon: place.geometry.lng
        }

        commit('updateLatLon', geom)
        dispatch('loadBackgroundRequest', geom)
        dispatch('loadWeatherRequest', geom)
      })
  },

  loadBackgroundRequest ({ state, dispatch, commit }, options) {
    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/wikipedia/geoimage/'
    if (options.hasOwnProperty('lat') && options.hasOwnProperty('lon')) {
      url += `${options.lat}/${options.lon}`
    } else { return }

    axios
      .get(url)
      .then((resp) => {
        commit('updatePictureData', resp.data.query.pages)
        return state.bgPictures
      })
      .then((bgPictures) => {
        commit('updateBgPicture', bgPictures[0])
      })
  },

  loadWeatherRequest ({ state, dispatch, commit }, options) {
    if (!state.isLoading) {
      commit('toggleLoading')
    }

    let url = 'https://api.jacobandersen.dev/weather/'
    if (options.hasOwnProperty('lat') && options.hasOwnProperty('lon')) {
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
        commit('updateWeatherData', resp)
      })
      .finally(() => {
        if (state.isLoading) {
          commit('toggleLoading')
        }
      })
  }
}
