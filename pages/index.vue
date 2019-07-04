<template>
  <main id="app-body">
    <b-row>
      <b-col cols="12">
        <div id="weather-forecast">
          <h2 class="text-center">
            {{ hourlySummary }}
          </h2>
          <WeatherForecast
            :chart-data="weatherForecastData"
            :options="{
              responsive: true,
              maintainAspectRatio: false
            }"
          />
        </div>
      </b-col>
      <b-col cols="12" lg="3">
        <div id="current-place-information">
          <CurrentPlaceInformation />
        </div>
      </b-col>
      <b-col cols="12" lg="9">
        <div id="current-weather-conditions">
          <CurrentWeatherConditions />
        </div>
      </b-col>
    </b-row>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import WeatherForecast from '../components/WeatherForecast'
import CurrentPlaceInformation from '../components/CurrentPlaceInformation'
import CurrentWeatherConditions from '../components/CurrentWeatherConditions'
import WeatherKeys from '../utility/weather-keys'

export default {
  components: {
    WeatherForecast,
    CurrentPlaceInformation,
    CurrentWeatherConditions
  },
  computed: {
    ...mapState({
      hourlySummary: state => state.current.hourlySummary,
      weatherForecastData: state => ({
        labels: state.current.weatherForecast.hourly.time
          .map(value => new Date(Number(value) * 1000))
          .map((date) => {
            const month = date.getMonth() + 1
            const day = date.getDate()
            let hours = date.getHours()
            const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
            hours = hours > 12 ? hours - 12 : hours
            hours = hours === 0 ? 12 : hours
            return { month, day, hours, ampm }
          })
          .map(obj => `${obj.month}/${obj.day} ${obj.hours + obj.ampm}`),
        datasets: [
          {
            label: WeatherKeys.mapToName(state.forecastInterest),
            backgroundColor: '#ffcd51',
            data: state.current.weatherForecast.hourly[state.forecastInterest]
          }
        ]
      })
    })
  }
}
</script>

<style lang="scss">
#app-body {
  margin: 30px 0;

  a {
    mix-blend-mode: multiply;
  }

  #weather-forecast {
    margin-bottom: 8px;
    -webkit-border-bottom-right-radius: 6px;
    -webkit-border-bottom-left-radius: 6px;
    -moz-border-radius-bottomright: 6px;
    -moz-border-radius-bottomleft: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;

    background: #e0dbd2;

    canvas {
      background-blend-mode: luminosity;
      position: relative;
    }

    h2 {
      font-family: 'Boogaloo', cursive;
      margin-bottom: 20px;
      padding: 3px;
      color: #666;
    }
  }

  .widget {
    max-height: 225px;
    overflow: hidden;

    .card {
      margin: 5px;

      .card-body {
        padding: 0;
        margin: 0;
        text-align: center;
        background: #e0dbd2;

        .card-title {
          background: $structureColor;
          color: #99a7bf;
          font-family: 'Boogaloo', cursive;
          font-size: 16px;
          padding: 10px 15px;
          width: 100%;
        }

        .card-content {
          padding: 20px;

          .data {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
