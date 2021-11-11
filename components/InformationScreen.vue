<template>
  <b-card class="mx-auto">
    <b-row class="my-2">
      <b-col cols="6">
        <h2><span id="location-tooltip">{{ $createLocationStr(location) }}</span></h2>
        <h3>
          {{ conditions.temperature + $degreeSymbol() }} {{ $temperatureSymbol() }}. {{ $capitalize(conditions.summary[0].description, ' ', true) }} <img :src="`http://openweathermap.org/img/wn/${conditions.summary[0].icon}.png`">
        </h3>
        <h4>
          <small>
            Feels like {{ conditions.feels_like + $degreeSymbol() }} {{ $temperatureSymbol() }}. {{ conditions.cloud_cover }}% clouds. {{ today.probability_of_precipitation * 100 }}% chance of rain.
          </small>
        </h4>
        <div class="my-4">
          <info-item-row v-for="(row, row_idx) in infoItems" :key="`iir${row_idx}`">
            <info-item-column v-for="(col, col_idx) in row" :key="`iir${row_idx}c${col_idx}`" :name="col.name" :icon="col.icon" :text="col.text" />
          </info-item-row>
          <b-tooltip target="cardinal-wind-direction-tooltip" triggers="hover">
            <p>Exact direction: {{ conditions.wind.direction.degrees }}&deg;</p>
          </b-tooltip>
          <b-tooltip target="location-tooltip" triggers="hover">
            {{ $formatCoords(location.latitude, location.longitude) }}
          </b-tooltip>
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
      forecastInterest (state) { return this.$capitalize(state.forecastInterest, '_') }
    }),
    hourlyChart () {
      return {
        labels: this.hourly.map(entry => this.$asHourOfDay12(entry.time)),
        datasets: this.$toChartDataset(this.$store.state.forecastInterest, this.hourly)
      }
    },
    dailyChart () {
      return {
        labels: this.daily.map(entry => this.$asMonthDay(entry.time)),
        datasets: this.$toChartDataset(this.$store.state.forecastInterest, this.daily)
      }
    },
    infoItems () {
      return [
        [
          {
            name: 'Wind',
            icon: 'fai-wind',
            text: `${this.conditions.wind.speed + this.$velocityUnits()} <span class='tooltip-trigger' id='cardinal-wind-direction-tooltip'>${this.conditions.wind.direction.cardinal}</span>`
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
            text: `${this.conditions.dew_point + this.$degreeSymbol()} ${this.$temperatureSymbol()}`
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
            text: this.$asTimeOfDay12(this.today.sun.rise)
          },
          {
            name: 'Sunset',
            icon: 'sunset',
            text: this.$asTimeOfDay12(this.today.sun.set)
          }
        ],
        [
          {
            name: 'Moonrise',
            icon: 'moonrise',
            text: this.$asTimeOfDay12(this.today.moon.rise)
          },
          {
            name: 'Moonset',
            icon: 'moonset',
            text: this.$asTimeOfDay12(this.today.moon.set)
          }
        ]
      ]
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
