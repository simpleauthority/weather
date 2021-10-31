<template>
  <main id="app-body">
    <b-row v-if="!hasData">
      <b-col>
        <initial-search />
      </b-col>
    </b-row>
    <div v-else>
      <information-screen />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import InitialSearch from '~/components/InitialSearch'
import InformationScreen from '~/components/InformationScreen'

export default {
  components: { InitialSearch, InformationScreen },
  computed: mapGetters(['hasData'])
}
</script>

<style lang="scss" scoped>
#app-body {
  margin-top: 30px;

}
</style>
