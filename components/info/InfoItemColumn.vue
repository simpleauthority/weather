<template>
  <b-col cols="6">
    <span class="mx-1">
      <fai v-if="isFontAwesomeIcon" :icon="iconPath" />
      <img v-else class="svg-icon" :src="iconPath">
    </span>
    <p>{{ name }}: <span v-html="sanitizedText" /></p>
  </b-col>
</template>

<script>
import DOMPurify from 'dompurify'

export default {
  name: 'InfoItemColumn',
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    isFontAwesomeIcon () {
      return this.icon.startsWith('fai')
    },
    iconPath () {
      return this.isFontAwesomeIcon ? this.icon.substring(4) : require(`../../assets/icons/${this.icon}.svg`)
    },
    sanitizedText () {
      return DOMPurify.sanitize(this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
    p {
      display: inline-block;
      font-size: 16px;
    }

    .svg-icon {
      width: 24px;
      height: 24px;
      margin-left: -4px;
      margin-right: -4px;
    }
</style>
