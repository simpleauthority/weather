<template>
  <b-nav-item-dropdown text="Options" right>
    <div id="unit-selector">
      <label>
        <p>Units In:</p>
        <select @change="handleUnitChange">
          <option value="si" :selected="requestUnits === 'si'">Metric</option>
          <option value="us" :selected="requestUnits === 'us'">Imperial</option>
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
          >{{ mapToName(opt) }}</option>
        </select>
      </label>
      <label>
        <p>Choose Forecast Type:</p>
        <select @change="handleForecastTypeChange">
          <option
            value="hourly"
            :selected="forecastType === 'hourly'"
          >Hourly</option>
          <option
            value="daily"
            :selected="forecastType === 'daily'"
          >Daily</option>
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
      forecastType: state => state.forecastType,
      possibleForecastOptions: state =>
        Object.keys(state.current.weatherForecast.hourly).filter(
          key => key !== 'time'
        )
    })
  },
  methods: {
    handleUnitChange (e) {
      this.$store.commit('updateUnits', e.target.value)
      const state = this.$store.state
      this.$store.dispatch('loadWeatherRequest', {
        lat: state.lastLat,
        lon: state.lastLon
      })
    },
    handleForecastInterestChange (e) {
      this.$store.commit('updateForecastInterest', e.target.value)
    },
    handleForecastTypeChange (e) {
      this.$store.commit('updateForecastType', e.target.value)
    },
    mapToName: key => WeatherKeys.mapToName(key)
  }
}
</script>

<style lang="scss">
#unit-selector {
  padding: 15px;
  //input, select {
  //  &:focus {
  //    border-color: #ddd;
  //  }
  //}
}
</style>
