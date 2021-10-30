<template>
  <div v-if="hasData">
    <div class="row">
      <div v-for="widget in Object.keys(widgets)" :key="widget" class="col-12">
        <Widget
          :key="widget"
          :widget-key="mapKeyToName(widget)"
          :widget-data="mapKeyToData(widget, location)"
          :widget-caption="mapKeyToUnits(widget)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import PlaceKeys from '../utility/place-keys'
import Widget from './Widget'

export default {
  components: { Widget },
  computed: mapState({
    hasData: state => !!Object.keys(state.location).length,
    widgets: state => _.omit(state.location, ['latitude', 'longitude', 'flag']),
    location: state => state.location
  }),
  methods: {
    mapKeyToName (key) {
      return PlaceKeys.mapToName(key)
    },
    mapKeyToData (key, source) {
      return PlaceKeys.mapToData(key, source)
    },
    mapKeyToUnits (key, source) {
      return PlaceKeys.mapToCaption(key, source)
    }
  }
}
</script>
