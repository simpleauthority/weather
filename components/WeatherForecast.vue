<template>
  <apexchart type="line" :series="series" :options="options" />
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  }
}
</script>
