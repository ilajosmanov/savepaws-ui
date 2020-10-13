<script lang="ts">
import Vue from 'vue';
import { create } from 'vue-modal-dialogs';

import SButton from '../../ui/SButton.vue';
import SMapLayout from '../../ui/SMapLayout.vue';
import RefuseModal from '../../modals/refuse/RefuseModal.vue';
import { LocationMap } from '../../features/map';

const refuseBox = create(RefuseModal);

export default Vue.extend({
  name: 'WaitingPage',

  components: {
    LocationMap,
    SMapLayout,
    SButton,
  },

  methods: {
    refuseBox,
  },

});
</script>

<template>
  <s-map-layout bottom-bar-height="200px">
    <location-map
      slot="map"
      :zoom="16"
      redirect-from="WaitingPage"
    />

    <h1 class="waiting-page__title">
      Прийом, збираємося до тебе!
    </h1>
    <p class="waiting-page__descr">
      Залишайся на місці, ми зв’яжемося з тобою <br> протягом п’яти хвилин.
    </p>
    <s-button
      slot="submit"
      class="waiting-page__submit"
      type="secondary"
      @click="refuseBox"
    >
      Скасувати заявку
    </s-button>
  </s-map-layout>
</template>

<style lang="scss" scoped>
.waiting-page__title {
  font-size: 20px;
  line-height: 1.35;
  color: var(--secondary);
  text-align: center;
  font-weight: normal;
  margin: 0;
}

.waiting-page__descr {
  font-size: 16px;
  line-height: 1.5;
  color: var(--secondary);
  margin-top: 16px;
}
</style>
