<template>
  <div class="widget">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">
          {{ widgetKey }}
        </h4>
        <div class="card-content">
          <p class="data">
            {{ widgetData }}
          </p>
          <p>{{ widgetCaption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    widgetKey: {
      type: String,
      default: undefined
    },
    widgetData: {
      type: String,
      default: undefined
    },
    widgetCaption: {
      type: String,
      default: undefined
    }
  }
}
</script>
