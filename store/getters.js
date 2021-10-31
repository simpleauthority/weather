import _ from 'lodash'

export default {
  hasError: state => () => {
    return !_.isEmpty(state.error)
  },

  coordinates: state => () => {
    return {
      latitude: state.lastLatitude,
      longitude: state.lastLongitude
    }
  }
}
