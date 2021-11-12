<template>
  <b-nav-form id="input-gatherer" @submit.prevent>
    <b-form-input size="lg" type="text" placeholder="Search anywhere..." @keyup="handleLocationChange" />
  </b-nav-form>
</template>

<script>
export default {
  methods: {
    async handleLocationChange (event) {
      if (event.keyCode !== 13) { return }

      await this.$store.dispatch('loadPlaceInformationRequest', {
        place: event.target.value
      })

      if (this.$store.getters.hasError) {
        // TODO: show error? idk
        return
      }

      await this.$store.dispatch('loadWeatherRequest', this.$store.getters.coordinates)

      if (this.$store.getters.hasError) {
        // TODO: show error? idk
      }
    }
  }
}
</script>
