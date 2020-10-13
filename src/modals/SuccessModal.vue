<script lang="ts">
import Vue from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import SButton from '../ui/SButton.vue';
import { setInfoEntered } from '../features/app';

export default Vue.extend({
  name: 'SuccessModal',

  components: {
    ModalWrapper,
    SButton,
  },

  methods: {
    async handleSubmit() {
      setInfoEntered(false);
    },
  },
});
</script>

<template>
  <modal-wrapper
    title="Дякуємо тобі!"
    max-width="280px"
    @click="$close"
  >
    <p style="text-align: center;">
      Сподіваємося знайти тварину на локації, яку ти нам залишив.
    </p>

    <template slot="footer">
      <s-button @click="handleSubmit().then($close)">
        Місія завершена
      </s-button>
    </template>
  </modal-wrapper>
</template>
