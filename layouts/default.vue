<template>
  <div id="weather-app">
    <div v-if="isLoading" class="loading">
      <img
        src="~assets/loading.svg"
        class="loading mx-auto d-block"
        alt="loading"
      >

      <div class="text-center my-5">
        <h2 class="font-weight-bold">
          Please wait... {{ loadingMessage }}
        </h2>
        <p>If the application asks for your location, it is merely to find the weather at your location.</p>
        <p>You may deny the prompt and fill in a location in the search box instead if you prefer that.</p>
      </div>
    </div>
    <div v-else>
      <b-carousel id="background-slider" no-hover-pause no-touch :interval="10000">
        <b-carousel-slide v-for="(backgroundImage, idx) in backgroundImages" :key="`background-image-${idx}`" :style="`background-image: url('${backgroundImage}')`" />
      </b-carousel>
      <AppHeader />
      <b-container fluid>
        <nuxt />
      </b-container>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      loadingMessage: state => state.loadingMessage,
      backgroundImages: (state) => {
        if (_.isEmpty(state.bgPictures)) {
          return [require('../assets/default_bg.jpg')]
        } else {
          return state.bgPictures
        }
      }
    })
  }
}
</script>

<style lang="scss">
#weather-app {
  padding: 0 0 25px 0;
  min-height: 100vh;
  font-family: 'Inconsolata', monospace;

  #background-slider {
    position: absolute;
    z-index: -1000;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;

    .carousel-item {
      filter: blur(2px);
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      height: 100vh;
      width: calc(100% + 8px);
      margin: -4px;
    }
  }

  .loading img {
    padding-top: 40vh;
  }
}
</style>
