<template>
  <footer id="app-footer" class="fixed-bottom">
    <div class="row">
      <div class="col-4">
        <p>Weather &ndash; &copy; 2021 Jacob Andersen, All Rights Reserved</p>
      </div>
      <div class="col-4">
        <p>
          Powered by
          <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>,
          <a href="http://opencagedata.com/" target="_blank">Open Cage</a>, and
          <a href="https://wikipedia.org">Wikipedia</a>
        </p>
      </div>
      <div class="col-4">
        <p>
          Icons courtesy of various sources (see credits in <a href="github.com/simpleauthority/weather">source</a>)
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
#app-footer {
  background: $structureColor;
  color: $textOnStructureColor;
  text-align: center;
  font-size: 13px;
  line-height: 26px;
  height: 30px;
  //mix-blend-mode: difference;

  a {
    color: inherit;
  }
}
</style>
