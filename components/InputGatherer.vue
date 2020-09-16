<template>
  <b-nav-form @submit.prevent>
    <b-form-input type="text" placeholder="Search anywhere..." @keyup="handleLocationChange" />
  </b-nav-form>
</template>

<script>
export default {
  methods: {
    handleLocationChange (e) {
      if (e.keyCode !== 13) { return }
      this.$store.dispatch('loadPlaceInformationRequest', {
        place: e.target.value
      })
    }
  }
}
</script>
