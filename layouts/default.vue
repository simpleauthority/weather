<template>
  <div
    id="weather-app"
    :style="'background-image:url(' + backgroundImage + ')'"
  >
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
    isLoading: state => state.isLoading,
    backgroundImage: state => state.bgPicture
  }),
  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch('tryGetUserLocation')
    })
  }
}
</script>

<style lang="scss">
#weather-app {
  padding: 0 0 25px 0;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'Inconsolata', monospace;

  .loading img {
    padding-top: 40vh;
  }
}
</style>
