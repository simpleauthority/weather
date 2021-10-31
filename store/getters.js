import _ from 'lodash'

export default {
  hasError: (state) => {
    return !_.isEmpty(state.error)
  },

  hasData: (state) => {
    return !(_.isEmpty(state.location) || _.isEmpty(state.weather))
  },

  location: (state) => {
    return state.location
  },

  coordinates: (getters) => {
    return _.pick(getters.location, ['latitude', 'longitude'])
  }
}
