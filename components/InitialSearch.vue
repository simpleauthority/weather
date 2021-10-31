<template>
  <div class="initial-search-container d-flex justify-content-center align-items-center">
    <b-card>
      <h2 class="text-center">
        Enter a location to find the weather there!
      </h2>
      <b-form class="my-5" @submit.prevent>
        <b-form-group id="location">
          <b-form-input placeholder="Enter a location (try &quot;Los Angeles, California&quot;)" trim class="d-block mx-auto" @keyup.prevent="handleLocationChange" />
        </b-form-group>
      </b-form>
      <div class="strike">
        <p class="font-weight-bold">
          or
        </p>
      </div>
      <b-button size="lg" variant="dark" class="d-block mx-auto" @click.prevent="$store.dispatch('tryGetUserLocation')">
        Click here to use your location
      </b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'InitialSearch',
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

<style lang="scss" scoped>
.initial-search-container {
    position: absolute;
    top: 30px;
    left: 0;
    height: 60vh; //80vh on alert removal
    width: inherit;

    .card {
        width: 80vh;

        .strike {
            text-align: center;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            margin: 30px 0;

            & > p {
                position: relative;
                display: inline-block;

                &:before, &:after {
                content: '';
                position: absolute;
                top: 50%;
                width: 9999px;
                height: 1px;
                background: $structureColor;
                }

                &:before {
                right: 100%;
                margin-right: 15px;
                }

                &:after {
                left: 100%;
                margin-left: 15px;
                }
            }
        }
    }
}

</style>
