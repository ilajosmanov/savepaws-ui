<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SIcon',

  props: {
    iconPath: {
      type: [String],
      required: true,
    },
  },
});
</script>

<template>
  <div
    class="s-icon"
    aria-hidden="true"
    focusable="false"
  >
    <img
      :src="iconPath"
      alt="Icon"
    >
  </div>
</template>

<style lang="scss" scoped>
.s-icon {
  width: 24px;
  height: 24px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    max-width: 100%;
  }
}
</style>
