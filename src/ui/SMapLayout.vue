<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SMapLayout',

  props: {
    bottomBarHeight: {
      type: String,
      default: '185px',
    },
  },
});
</script>

<template functional>
  <div
    v-cloak
    class="s-map-layout"
  >
    <div class="s-map-layout__map-container">
      <slot name="map" />
    </div>

    <div
      class="s-map-layout__bottom-bar"
      :style="{
        height: props.bottomBarHeight
      }"
    >
      <slot />

      <div class="s-map-layout__submit">
        <slot name="submit" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-map-layout {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
}

.s-map-layout__bottom-bar {
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.s-map-layout__submit {
  margin-top: auto;
}
</style>
