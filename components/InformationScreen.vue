<template>
  <b-card class="mx-auto text-center">
    <b-row>
      <b-col cols="12">
        <b-row class="my-2">
          <b-col cols="4">
            <h2>
              {{ location.city }}, {{ location.country }} {{ location.flag }}
            </h2>
            <h3 v-html="prettyCoordinates" />
            <h3>
              {{ conditions.temperature }}&deg; {{ temperatureSymbol }} <small><em>feels like {{ conditions.feels_like }}&deg; {{ temperatureSymbol }}</em></small>
            </h3>
            <h3><img :src="`http://openweathermap.org/img/wn/${conditions.summary[0].icon}.png`"> {{ currentConditionSummary }}</h3>
            <h3>Chance of Rain Today: {{ today.probability_of_precipitation * 100 }}%</h3>
            <h3>Moonrise: {{ today.moonrise | toTime }}</h3>
          </b-col>
          <b-col cols="4">
            <h3>Dew point: {{ conditions.dew_point }}&deg; {{ temperatureSymbol }}</h3>
            <h3>Humidity: {{ conditions.humidity }}%</h3>
            <h3>Cloud cover: {{ conditions.cloud_cover }}%</h3>
            <h3>Atmospheric pressure: {{ conditions.pressure }} hPa</h3>
            <h3>Sunrise: {{ today.sunrise | toTime }}</h3>
            <h3>Moonset: {{ today.moonset | toTime }}</h3>
          </b-col>
          <b-col cols="4">
            <h3>UV index: {{ conditions.uv_index }}</h3>
            <h3>Visibility: {{ conditions.visibility / 1000 }} km</h3> <!-- OWM always gives visibility in meters -->
            <h3>
              Wind: {{ conditions.wind_speed }} {{ velocityUnit }} <span v-if="hasWindGust">(gusting at {{ conditions.wind_gust_speed }} {{ velocityUnit }})</span>
            </h3>
            <h3>Wind direction: {{ conditions.wind_cardinal_direction }} ({{ conditions.wind_direction }}&deg;)</h3>
            <h3>Sunset: {{ today.sunset | toTime }}</h3>
            <h3>Moon phase: {{ today.moon_phase }} ({{ today.moon_phase_value * 100 }}%)</h3>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col cols="6">
            <h2 class="text-center">
              {{ forecastInterest }} over next 48 hours
            </h2>
            <weather-forecast :chart-data="hourlyChart" :options="chartOptions" />
          </b-col>
          <b-col cols="6">
            <h2 class="text-center">
              {{ forecastInterest }} over next 5 days
            </h2>
            <weather-forecast :chart-data="dailyChart" :options="chartOptions" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import WeatherForecast from './WeatherForecast.vue'

export default {
  name: 'InformationScreen',
  components: { WeatherForecast },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    ...mapState({
      location: state => state.location,
      requestUnits: state => state.requestUnits,
      conditions: state => state.weather.conditions,
      today: state => state.weather.daily[0],
      hourly: state => state.weather.hourly,
      daily: state => state.weather.daily,
      forecastInterest (state) { return this.prettyCapitalizeString(state.forecastInterest, '_') }
    }),
    temperatureSymbol () {
      return this.unitSwitch('F', 'C', 'K')
    },
    distanceUnit () {
      return this.unitSwitch('mi', 'km')
    },
    velocityUnit () {
      return this.unitSwitch('mph', 'm/s')
    },
    hasWindGust () {
      return this.conditions.wind_gust_speed !== 0
    },
    prettyCoordinates () {
      const latitude = this.location.latitude
      const latDirection = Math.sign(latitude) === -1 ? 'South' : 'North'
      const longitude = this.location.longitude
      const lonDirection = Math.sign(longitude) === -1 ? 'West' : 'East'

      return `${Math.abs(latitude)}&deg; ${latDirection}, ${Math.abs(longitude)}&deg; ${lonDirection}`
    },
    currentConditionSummary () { return this.prettyCapitalizeString(this.conditions.summary[0].description) },
    hourlyChart () {
      return {
        labels: this.hourly.map((entry) => {
          const date = new Date(entry.time * 1000)
          let hours = date.getHours()
          const section = date.getHours() >= 12 ? 'PM' : 'AM'
          hours = hours > 12 ? hours - 12 : hours
          hours = hours === 0 ? 12 : hours
          return `${hours} ${section}`
        }),
        datasets: this.createDatasets(this.hourly)
      }
    },
    dailyChart () {
      return {
        labels: this.daily.map((entry) => {
          const date = new Date(entry.time * 1000)
          const month = date.getMonth() + 1
          const day = date.getDate()
          return `${month}/${day}`
        }),
        datasets: this.createDatasets(this.daily)
      }
    }
  },
  methods: {
    unitSwitch (imperial, metric, standard) {
      if (!standard) {
        standard = metric
      }

      switch (this.requestUnits) {
        case 'imperial':
          return imperial
        case 'metric':
          return metric
        case 'standard':
        default:
          return standard
      }
    },
    prettyCapitalizeString (str, delim) {
      if (!delim) {
        delim = ' '
      }

      const split = str.split(delim)

      let out = ''
      split.forEach((piece) => {
        out += `${piece.substring(0, 1).toUpperCase()}${piece.substring(1).toLowerCase()} `
      })

      return out.trim()
    },
    createDatasets (obj) {
      const baseColor = '#ffcd51'

      const flattened = obj.map((entry) => {
        const wanted = entry[this.$store.state.forecastInterest]
        if (_.isObject(wanted)) {
          const temp = {}

          for (const [key, value] of Object.entries(wanted)) {
            temp[key] = value
          }

          return temp
        } else {
          return wanted
        }
      })

      const rgbDistribution = this.getRgbDistribution(baseColor, Object.keys(flattened).length)

      let clean = []

      const temp = {}
      for (const component of flattened) {
        if (component.constructor.name === 'Object') {
          for (const [key, value] of Object.entries(component)) {
            if (_.has(temp, key)) {
              temp[key].push(value)
            } else {
              temp[key] = [value]
            }
          }
        }
      }

      let idx = 0
      for (const [key, value] of Object.entries(temp)) {
        clean.push({
          label: `${this.prettyCapitalizeString(key)} ${this.forecastInterest}`,
          backgroundColor: rgbDistribution[idx],
          data: value
        })

        idx++
      }

      if (_.isEmpty(clean)) {
        clean = [{
          label: this.forecastInterest,
          backgroundColor: baseColor,
          data: flattened
        }]
      }

      return clean
    },
    hex2rgb (hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return { r, g, b }
    },
    rgb2hex (r, g, b) {
      const rgb = (r << 16) | (g << 8) | b
      return '#' + rgb.toString(16).padStart(6, 0)
    },
    getRgbDistribution (base, count) {
      base = this.hex2rgb(base)

      let multiplier = 100
      const percentDiff = 1.25 / count

      const out = []
      for (let i = 0; i < count; i++) {
        if (i !== 0) {
          multiplier -= percentDiff
        }

        out.push(this.rgb2hex(base.r * multiplier, base.g * multiplier, base.b * multiplier))
      }

      return out
    }
  },
  filters: {
    toTime (value) {
      const date = new Date(value * 1000)
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const section = date.getHours() >= 12 ? 'PM' : 'AM'
      hours = hours > 12 ? hours - 12 : hours
      hours = hours === 0 ? 12 : hours
      return `${hours}:${String(minutes).padStart(2, '0')} ${section}`
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
    width: 80%;
    background: rgba(240, 240, 240, 0.75);
}
</style>
