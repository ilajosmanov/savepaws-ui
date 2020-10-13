<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ModalWrapper',

  props: {
    title: {
      type: String,
      default: null,
    },
    maxWidth: {
      type: String,
      default: '340px',
    },
  },
});
</script>

<template>
  <div
    class="modal-wrapper"
    v-on="$listeners"
  >
    <div
      class="modal-wrapper__container"
      :style="{
        maxWidth
      }"
      @click.stop
    >
      <h1
        v-if="title"
        class="modal-wrapper__title"
      >
        {{ title }}
      </h1>

      <div class="modal-wrapper__body">
        <slot />
      </div>

      <footer class="modal-wrapper__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background: rgba(51, 51, 51, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper__container {
  background: var(--light);
  border-radius: 20px;
  padding: 18px 23px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-wrapper__body {
  margin: 32px 0;
}

.modal-wrapper__title {
  font-size: 25px;
  line-height: 1.2;
  color: var(--secondary);
  font-weight: normal;
  text-align: center;
}

.modal-wrapper__footer {
  margin-top: auto;
  display: flex;
  justify-content: center;
}
</style>
