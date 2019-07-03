<template>
  <header id="app-header">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
      <b-navbar-brand class="brand" href="#">
        Weather
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <InputGatherer />
          <UnitSelector />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import InputGatherer from './InputGatherer'
import UnitSelector from './UnitSelector'

export default {
  components: {
    InputGatherer,
    UnitSelector
  }
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
