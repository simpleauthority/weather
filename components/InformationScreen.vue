<template>
  <b-card class="mx-auto">
    <b-row class="my-2">
      <b-col cols="6">
        <h2 v-b-tooltip.hover :title="$formatCoords(location.latitude, location.longitude)">
          {{ $createLocationStr(location) }}
        </h2>
        <h3>
          {{ conditions.temperature + $degreeSymbol() }} {{ $temperatureSymbol(requestUnits) }}. {{ $capitalize(conditions.summary[0].description, ' ', true) }} <img :src="`http://openweathermap.org/img/wn/${conditions.summary[0].icon}.png`">
        </h3>
        <h4>
          <small>
            Feels like {{ conditions.feels_like + $degreeSymbol() }} {{ $temperatureSymbol(requestUnits) }}. {{ conditions.cloud_cover }}% clouds. {{ today.probability_of_precipitation * 100 }}% chance of rain.
          </small>
        </h4>
        <div class="mt-4">
          <info-item-row v-for="(row, row_idx) in infoItems" :key="`iir${row_idx}`">
            <info-item-column
              v-for="(col, col_idx) in row"
              :key="`iir${row_idx}c${col_idx}`"
              :name="col.name"
              :icon="col.icon"
              :icon-tooltip="col.icon_tooltip"
              :text="col.text"
              :extra="col.extra"
            />
          </info-item-row>
        </div>
      </b-col>
      <b-col cols="6">
        <b-row class="d-flex justify-content-end mb-4">
          <b-dropdown size="sm" variant="outline-dark" class="mr-3">
            <template #button-content>
              <fai icon="search" />
              {{ forecastTypeFormatted }}
            </template>
            <b-dropdown-item v-for="(type, idx) in ['hourly', 'daily']" :key="`fc-type-option-${idx}`" :disabled="type === forecastType" @click.prevent="handleForecastTypeChange(type)">
              {{ $capitalize(type, '_') }}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown size="sm" variant="outline-dark" class="mr-3">
            <template #button-content>
              <fai icon="info-circle" />
              {{ forecastInterestFormatted }}
            </template>
            <b-dropdown-item-button v-for="(interest, idx) in possibleForecastInterests" :key="`interest-option-${idx}`" :disabled="interest === forecastInterest" @click.prevent="handleForecastInterestChange(interest)">
              {{ $capitalize(interest, '_') }}
            </b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown size="sm" variant="outline-dark">
            <template #button-content>
              <fai icon="cog" />
              {{ requestUnitsFormatted }}
            </template>
            <b-dropdown-item-button v-for="(unit, idx) in ['metric', 'imperial', 'standard']" :key="`unit-option-${idx}`" :disabled="unit === requestUnits" @click.prevent="handleUnitChange(unit)">
              {{ $unitSummary(unit) }}
            </b-dropdown-item-button>
          </b-dropdown>
        </b-row>
        <b-row>
          <weather-forecast :series="selectedChart" :options="chartOptions" />
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import WeatherForecast from './WeatherForecast.vue'
import InfoItemRow from './info/InfoItemRow.vue'
import InfoItemColumn from './info/InfoItemColumn.vue'

export default {
  name: 'InformationScreen',
  components: { WeatherForecast, InfoItemRow, InfoItemColumn },
  computed: {
    ...mapState({
      location: state => state.location,
      requestUnits: state => state.requestUnits,
      requestUnitsFormatted (state) { return this.$capitalize(state.requestUnits) },
      conditions: state => state.weather.conditions,
      today: state => state.weather.daily[0],
      hourly: state => state.weather.hourly,
      daily: state => state.weather.daily,
      forecastType: state => state.forecastType,
      forecastTypeFormatted (state) { return this.$capitalize(state.forecastType) },
      forecastInterest: state => state.forecastInterest,
      forecastInterestFormatted (state) { return this.$capitalize(state.forecastInterest, '_') },
      possibleForecastInterestsHourly: (state) => {
        return Object.keys(_.omit(state.weather.hourly[0] || {}, ['time', 'summary'])) || []
      },
      possibleForecastInterestsDaily: (state) => {
        return Object.keys(_.omit(state.weather.daily[0] || {}, ['time', 'summary', 'sun', 'moon'])) || []
      }
    }),
    possibleForecastInterests () {
      return this.forecastType === 'hourly' ? this.possibleForecastInterestsHourly : this.possibleForecastInterestsDaily
    },
    chartOptions () {
      return {
        title: {
          text: `${this.forecastInterestFormatted} - Next ${this.forecastType === 'hourly' ? '48 Hours' : '8 Days'}`
        },
        tooltip: {
          x: {
            format: this.forecastType === 'hourly' ? 'dd MMM h:mm TT' : 'dd MMM'
          },
          fixed: {
            enabled: true,
            position: 'topLeft',
            offsetX: -200,
            offsetY: -50
          }
        },
        markers: {
          size: 1
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          },
          labels: {
            datetimeUTC: false,
            datetimeFormatter: {
              day: 'dd MMM',
              hour: 'h:mm TT'
            }
          }
        },
        colors: ['#347aeb', '#b434eb', '#eb3453', '#5934eb', '#34eb56', '#eb6834']
      }
    },
    selectedChart () {
      return this.forecastType === 'hourly' ? this.hourlyChart : this.dailyChart
    },
    hourlyChart () {
      return this.$toChartSeries([{ name: this.forecastInterestFormatted, path: this.forecastInterest }], this.hourly)
    },
    dailyChart () {
      return this.$toChartSeries([{ name: this.forecastInterestFormatted, path: this.forecastInterest }], this.daily)
    },
    infoItems () {
      return [
        [
          {
            name: 'Wind',
            icon: 'fai-wind',
            icon_tooltip: 'Current speed and direction of the wind - Tip: Hover the name of the direction to see exact direction.',
            text: `${this.conditions.wind.speed + this.$velocityUnits(this.requestUnits)}`,
            extra: [
              {
                text: this.conditions.wind.direction.cardinal,
                tooltip: `Exact wind direction: ${this.conditions.wind.direction.degrees + this.$degreeSymbol()}`
              }
            ]
          },
          {
            name: 'Pressure',
            icon: 'pressure',
            icon_tooltip: 'Current atmospheric pressure (nominal value is 1013.25 hPa).',
            text: `${this.conditions.pressure}hPa`
          }
        ],
        [
          {
            name: 'Humidity',
            icon: 'humidity',
            icon_tooltip: 'Current atmospheric humidity. High humidity can amplify how the weather feels. Hot weather will feel hotter, and cold weather colder.',
            text: `${this.conditions.humidity}%`
          },
          {
            name: 'UV Index',
            icon: 'uv_index',
            icon_tooltip: 'Current UV Index - 0 is low risk and 10 is very high risk - Anywhere above a 5 or 6 indicates you should be wearing sunscreen! Do not go outside around 12-4pm without proper protection if the UV Index reads higher than 6.',
            text: this.conditions.uv_index.toFixed(0)
          }
        ],
        [
          {
            name: 'Dew Point',
            icon: 'dew',
            icon_tooltip: 'Current dew point - The temperature at which water vapor turns into liquid water (dew) that forms on plants.',
            text: `${this.conditions.dew_point + this.$degreeSymbol()} ${this.$temperatureSymbol(this.requestUnits)}`
          },
          {
            name: 'Visibility',
            icon: 'fai-eye',
            icon_tooltip: 'Current visibility - How far you can see, given no other obstructions.',
            text: `${this.conditions.visibility / 1000}km`
          }
        ],
        [
          {
            name: 'Sunrise',
            icon: 'sunrise',
            icon_tooltip: 'Time of today\'s sunrise.',
            text: this.$asTimeOfDay12(this.today.sun.rise)
          },
          {
            name: 'Sunset',
            icon: 'sunset',
            icon_tooltip: 'Time of today\'s sunset.',
            text: this.$asTimeOfDay12(this.today.sun.set)
          }
        ],
        [
          {
            name: 'Moonrise',
            icon: 'moonrise',
            icon_tooltip: 'Time of today\'s moonrise.',
            text: this.$asTimeOfDay12(this.today.moon.rise)
          },
          {
            name: 'Moonset',
            icon: 'moonset',
            icon_tooltip: 'Time of today\'s moonset.',
            text: this.$asTimeOfDay12(this.today.moon.set)
          }
        ]
      ]
    }
  },
  methods: {
    handleForecastTypeChange (newType) {
      this.$store.commit('updateForecastType', newType)
    },
    handleForecastInterestChange (newInterest) {
      this.$store.commit('updateForecastInterest', newInterest)
    },
    handleUnitChange (newUnit) {
      this.$store.commit('updateUnits', newUnit)
      this.$store.dispatch('loadWeatherRequest', this.$store.getters.coordinates)
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
