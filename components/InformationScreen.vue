<template>
  <b-card class="mx-auto">
    <b-row class="my-2">
      <b-col cols="6">
        <h2><span id="location-tooltip">{{ locationString }}</span></h2>
        <h3 v-html="conditionsHeading" />
        <h4><small v-html="conditionsSubheading" /></h4>
        <div class="my-4">
          <info-item-row v-for="(row, row_idx) in infoItems" :key="`iir${row_idx}`">
            <info-item-column v-for="(col, col_idx) in row" :key="`iir${row_idx}c${col_idx}`" :name="col.name" :icon="col.icon" :text="col.text" />
          </info-item-row>
          <b-tooltip target="cardinal-wind-direction-tooltip" triggers="hover">
            <p>Exact direction: {{ conditions.wind.direction.degrees }}&deg;</p>
          </b-tooltip>
          <b-tooltip target="location-tooltip" triggers="hover" v-html="prettyCoordinates" />
        </div>
      </b-col>
      <b-col cols="6">
        <h2 class="text-center">
          {{ forecastInterest }} Forecast - 48 Hour
        </h2>
        <weather-forecast :chart-data="hourlyChart" :options="chartOptions" />
      </b-col>
      <!-- <b-col cols="6">
        <h3>Cloud cover: {{ conditions.cloud_cover }}%</h3>
      </b-col> -->
      <!-- <b-col cols="4">
        <h3>Sunset: {{ today.sunset | toTime }}</h3>
        <h3>Moon phase: {{ today.moon.phase.name }} ({{ today.moon.phase.value * 100 }}%)</h3>
      </b-col> -->
    </b-row>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import DOMPurify from 'dompurify'
import WeatherForecast from './WeatherForecast.vue'
import InfoItemRow from './info/InfoItemRow.vue'
import InfoItemColumn from './info/InfoItemColumn.vue'

export default {
  name: 'InformationScreen',
  components: { WeatherForecast, InfoItemRow, InfoItemColumn },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: '#f0f0f0'
          }
        }
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

      return DOMPurify.sanitize(`${Math.abs(latitude)}&deg; ${latDirection}, ${Math.abs(longitude)}&deg; ${lonDirection}`)
    },
    currentConditionSummary () { return this.prettyCapitalizeString(this.conditions.summary[0].description, ' ', true) },
    hourlyChart () {
      return {
        labels: this.hourly.map((entry) => {
          const date = new Date(entry.time)
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
          const date = new Date(entry.time)
          const month = date.getMonth() + 1
          const day = date.getDate()
          return `${month}/${day}`
        }),
        datasets: this.createDatasets(this.daily)
      }
    },
    locationString () {
      let out = ''

      if (!_.isEmpty(this.location.flag)) {
        out += `${this.location.flag} `
      }

      let hadCity = false
      if (!_.isEmpty(this.location.city)) {
        out += `${this.location.city}, `
        hadCity = true
      }

      if (!_.isEmpty(this.location.state) && !hadCity) {
        out += `${this.location.state}, `
      }

      if (!_.isEmpty(this.location.country)) {
        out += this.location.country
      }

      return out
    },
    conditionsHeading () {
      return DOMPurify.sanitize(`${this.conditions.temperature}&deg; ${this.temperatureSymbol}. ${this.currentConditionSummary} <img src="http://openweathermap.org/img/wn/${this.conditions.summary[0].icon}.png" />`)
    },
    conditionsSubheading () {
      return DOMPurify.sanitize(`Feels like ${this.conditions.feels_like}&deg; ${this.temperatureSymbol}. ${this.conditions.cloud_cover}% clouds. ${this.today.probability_of_precipitation * 100}% chance of rain.`)
    },
    infoItems () {
      return [
        [
          {
            name: 'Wind',
            icon: 'fai-wind',
            text: `${this.conditions.wind.speed + this.velocityUnit} <span class='tooltip-trigger' id='cardinal-wind-direction-tooltip'>${this.conditions.wind.direction.cardinal}</span>`
          },
          {
            name: 'Pressure',
            icon: 'fai-weight',
            text: `${this.conditions.pressure}hPa`
          }
        ],
        [
          {
            name: 'Humidity',
            icon: 'fai-faucet',
            text: `${this.conditions.humidity}%`
          },
          {
            name: 'UV Index',
            icon: 'fai-sun',
            text: this.conditions.uv_index.toFixed(0)
          }
        ],
        [
          {
            name: 'Dew Point',
            icon: 'fai-temperature-low',
            text: `${this.conditions.dew_point}&deg; ${this.temperatureSymbol}`
          },
          {
            name: 'Visibility',
            icon: 'fai-eye',
            text: `${this.conditions.visibility / 1000}km`
          }
        ],
        [
          {
            name: 'Sunrise',
            icon: 'sunrise',
            text: this.toTime(this.today.sun.rise)
          },
          {
            name: 'Sunset',
            icon: 'sunset',
            text: this.toTime(this.today.sun.set)
          }
        ],
        [
          {
            name: 'Moonrise',
            icon: 'moonrise',
            text: this.toTime(this.today.moon.rise)
          },
          {
            name: 'Moonset',
            icon: 'moonset',
            text: this.toTime(this.today.moon.set)
          }
        ]
      ]
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
    prettyCapitalizeString (str, delim, startOnly) {
      if (!delim) {
        delim = ' '
      }

      if (!startOnly) {
        startOnly = false
      }

      const split = str.split(delim)

      let out = ''
      let count = 0
      split.forEach((piece) => {
        if (startOnly && count > 0) {
          out += `${piece} `
        } else {
          out += `${piece.substring(0, 1).toUpperCase()}${piece.substring(1).toLowerCase()} `
        }

        count++
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
    },
    toTime (value) {
      const date = new Date(value / 1000)
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
    color: rgb(100, 100, 100);
    background: rgba(240, 240, 240, 0.80);

    table {
      color: inherit;
      font-size: 18px;
    }
}
</style>
