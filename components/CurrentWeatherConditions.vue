<template>
  <div v-if="hasData">
    <b-row no-gutters="">
      <div v-for="widget in Object.keys(widgets)" :key="widget" class="col-6 col-lg-3">
        <Widget
          :key="widget"
          :widget-key="mapKeyToName(widget)"
          :widget-data="mapKeyToData(widget, widgets)"
          :widget-caption="mapKeyToUnits(widget, units, widgets)"
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Widget from './Widget'

export default {
  components: { Widget },
  computed: {
    ...mapState({
      hasData: state => !!Object.keys(state.current.weather).length,
      units: state => state.requestUnits,
      widgets: state => state.current.weather
    })
  },
  methods: {
    mapKeyToName: function (key) {
      return this.$wMapToName(key) || `Unknown ${key}`
    },
    mapKeyToData: function (key, source) {
      return this.$wMapToData(key, source) || `Unknown ${key}`
    },
    mapKeyToUnits: function (key, units, source) {
      return this.$wMapToCaption(key, units, source) || `Unknown ${key}`
    }
  }
}
</script>
