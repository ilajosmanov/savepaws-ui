<script lang="ts">
import Vue from 'vue';
import ModalWrapper from '../ModalWrapper.vue';
import SButton from '../../ui/SButton.vue';
import SRadio from '../../ui/SRadio.vue';
import { $reason } from './model';

export default Vue.extend({
  name: 'RefuseModal',

  effector: {
    $reason,
  },

  components: {
    ModalWrapper,
    SButton,
    SRadio,
  },
});
</script>

<template>
  <modal-wrapper
    title="Щось пішло не так?"
    @click="$close"
  >
    <form
      id="refuse-form"
      class="refuse-form"
    >
      <div class="refuse-form__item">
        <s-radio
          v-model="$reason"
          name="reason"
          value="dismiss"
          label="Тварина втікла"
        />
      </div>
      <div class="refuse-form__item">
        <s-radio
          v-model="$reason"
          name="reason"
          value="long"
          label="Служба дуже довго їхала"
        />
      </div>
      <div class="refuse-form__item">
        <s-radio
          v-model="$reason"
          name="reason"
          value="cant"
          label="Не зміг залишитись"
        />
      </div>
    </form>

    <template slot="footer">
      <div class="refuse-actions">
        <s-button size="medium">
          Підтвердити
        </s-button>
        <s-button
          type="secondary"
          size="medium"
          @click="$close"
        >
          Скасувати
        </s-button>
      </div>
    </template>
  </modal-wrapper>
</template>

<style lang="scss" scoped>
.refuse-form {
  width: 300px;
}

.refuse-actions {
  display: flex;
  flex-direction: column;

  button:not(:first-child) {
    margin-top: 16px;
  }
}
</style>
