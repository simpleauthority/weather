<template>
  <header id="app-header">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
      <b-navbar-nav class="mx-auto">
        <b-navbar-brand class="brand mr-5" href="#" @click.prevent="$store.commit('reset')">
          Weather
        </b-navbar-brand>
        <input-gatherer />
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import InputGatherer from './InputGatherer.vue'
export default {
  name: 'AppHeader',
  components: { InputGatherer }
}
</script>

<style lang="scss">
#app-header {
  height: 0px;
  min-height: 50px;
  background: $structureColor;

  .brand {
    color: #99a7bf;
    font-size: 36px;
    line-height: 48px;
    font-family: 'Londrina Solid', cursive;
    text-align: center;
  }
}
</style>
