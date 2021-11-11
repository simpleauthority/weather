<template>
  <b-col cols="6">
    <span v-b-tooltip.hover class="mx-1" :title="iconTooltip ? iconTooltip : ''">
      <fai v-if="isFontAwesomeIcon" :icon="iconPath" />
      <img v-else class="svg-icon" :src="iconPath">
    </span>
    <p>
      {{ text }}
      <!-- This span spam is kinda gross but, I'll look into it later. Whatever. -->
      <span v-if="hasExtra">
        <span v-for="(piece, idx) in extra" :key="`${name}-extra-${idx}`">
          <span v-if="piece.tooltip" v-b-tooltip.hover :title="piece.tooltip" class="tooltip-trigger">
            {{ piece.text }}
          </span>
          <span v-else>
            {{ piece.text }}
          </span>
        </span>
      </span>
    </p>
  </b-col>
</template>

<script>
export default {
  name: 'InfoItemColumn',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconTooltip: {
      type: String,
      required: false,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    extra: {
      type: Array,
      required: false,
      default: undefined
    }
  },
  computed: {
    isFontAwesomeIcon () {
      return this.icon.startsWith('fai')
    },
    iconPath () {
      return this.isFontAwesomeIcon ? this.icon.substring(4) : require(`../../assets/icons/${this.icon}.svg`)
    },
    hasExtra () {
      return this.extra !== undefined
    }
  }
}
</script>

<style lang="scss" scoped>
    p {
      display: inline-block;
      font-size: 18px;
    }

    .svg-icon {
      width: 24px;
      height: 24px;
      margin-left: -4px;
      margin-right: -4px;
    }

    .tooltip-trigger {
      text-decoration: underline;
      text-decoration-style: dashed;
    }
</style>
