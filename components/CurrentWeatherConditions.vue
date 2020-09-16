<template>
  <div v-if="hasData">
    <b-row no-gutters="">
      <div
        v-for="widget in Object.keys(widgets)"
        :key="widget"
        class="col-6 col-lg-3"
      >
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
import WeatherKeys from '../utility/weather-keys'
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
    mapKeyToName (key) {
      return WeatherKeys.mapToName(key) || `Unknown ${key}`
    },
    mapKeyToData (key, source) {
      return WeatherKeys.mapToData(key, source) || `Unknown ${key}`
    },
    mapKeyToUnits (key, units, source) {
      return WeatherKeys.mapToCaption(key, units, source) || `Unknown ${key}`
    }
  }
}
</script>
