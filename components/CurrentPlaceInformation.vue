<template>
  <div v-if="hasData">
    <div class="row">
      <div v-for="widget in Object.keys(widgets)" :key="widget" class="col-12">
        <Widget
          :key="widget"
          :widget-key="mapKeyToName(widget)"
          :widget-data="mapKeyToData(widget, widgets)"
          :widget-caption="mapKeyToUnits(widget)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlaceKeys from '../utility/place-keys'
import Widget from './Widget'

export default {
  components: { Widget },
  computed: {
    ...mapState({
      hasData: state => !!Object.keys(state.current.place).length,
      widgets: state => state.current.place.annotations
    })
  },
  methods: {
    mapKeyToName (key) {
      return PlaceKeys.mapToName(key) || `Unknown ${key}`
    },
    mapKeyToData (key, source) {
      return PlaceKeys.mapToData(key, source) || `Unknown ${key}`
    },
    mapKeyToUnits (key, source) {
      return PlaceKeys.mapToCaption(key, source) || `Unknown ${key}`
    }
  }
}
</script>
