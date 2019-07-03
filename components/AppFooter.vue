<template>
  <footer id="app-footer" class="fixed-bottom">
    <div class="row">
      <div class="col-4">
        <p>VueWeather &ndash; &copy; 2019 Jacob Andersen, All Rights Reserved</p>
      </div>
      <div class="col-4">
        <p>
          Powered by <a href="https://darksky.net/poweredby/" target="_blank">Dark Sky</a>, <a href="http://opencagedata.com/" target="_blank">Open Cage</a>, and <a href="https://wikipedia.org">Wikipedia</a>
        </p>
        <p>Makes use of <a href="https://openweathermap.org" target="_blank">OpenWeatherMap</a> for weather data</p>
      </div>
      <div class="col-4">
        <p>Loading icon 'double ring' by <a href="https://loading.io/spinner/double-ring">loading.io</a></p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
#app-footer {
        background: $structureColor;
        text-align: center;
        font-size: 13px;
        line-height: 26px;
        height: 30px;
        mix-blend-mode: difference;

        a {
          color: inherit;
        }
}
</style>
