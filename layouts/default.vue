<template>
  <div>
    <div id="weather-app">
      <div v-if="isLoading" class="loading">
        <img
          src="~assets/loading.svg"
          class="loading mx-auto d-block"
          alt="loading"
        >
      </div>
      <div v-else>
        <AppHeader />
        <b-container>
          <nuxt />
        </b-container>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  computed: mapState({
    isLoading: state => state.isLoading
  })
}
</script>

<style lang="scss">
html,body {
 height: 100vh;
  #app {
    padding: 0 0 25px 0;
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;

    #weather-app {
      font-family: 'Inconsolata', monospace;

      .loading img {
        padding-top: 40vh;
      }
    }
  }
}
</style>
