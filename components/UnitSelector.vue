<template>
  <b-nav-item-dropdown text="Options" right>
    <div id="unit-selector">
      <label>
        <p>Units In:</p>
        <select @change="handleUnitChange">
          <option value="metric" :selected="requestUnits === 'metric'">Metric (&deg;C, m/s)</option>
          <option value="imperial" :selected="requestUnits === 'imperial'">Imperial (&deg;F, mph)</option>
          <option value="standard" :selected="requestUnits === 'standard'">Standard (&deg;K, m/s)</option>
        </select>
      </label>
      <label>
        <p>Choose Data Point:</p>
        <select @change="handleForecastInterestChange">
          <option
            v-for="opt in possibleForecastOptions"
            :key="opt"
            :value="opt"
            :selected="forecastInterest === opt"
          >
            {{ mapToName(opt) }}
          </option>
        </select>
      </label>
    </div>
  </b-nav-item-dropdown>
</template>
<script>
import { mapState } from 'vuex'
import WeatherKeys from '../utility/weather-keys'

export default {
  computed: {
    ...mapState({
      requestUnits: state => state.requestUnits,
      forecastInterest: state => state.forecastInterest,
      possibleForecastOptions: (state) => {
        return Object.keys(state.weather.hourly[0] || {}).filter(key => key !== 'time')
      }
    })
  },
  methods: {
    handleUnitChange (event) {
      this.$store.commit('updateUnits', event.target.value)
      this.$store.dispatch('loadWeatherRequest', this.$store.getters.coordinates)
      if (this.$store.getters.hasError) {
        // TODO: show error? idk
      }
    },
    handleForecastInterestChange (event) {
      this.$store.commit('updateForecastInterest', event.target.value)
    },
    mapToName: key => WeatherKeys.mapToName(key)
  }
}
</script>

<style lang="scss">
#unit-selector {
  padding: 15px;
}
</style>
