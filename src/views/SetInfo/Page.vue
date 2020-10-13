<script lang="ts">
// @ts-expect-error
import { VueMaskDirective } from 'v-mask';
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { getErrorMessage } from './lib/errors';
import SIcon from '../../ui/SIcon.vue';
import SInput from '../../ui/SInput.vue';
import SRadio from '../../ui/SRadio.vue';
import SButton from '../../ui/SButton.vue';
import SUpload from '../../ui/SUpload.vue';
import { setInfoEntered } from '../../features/app';
import {
  $fullName,
  $phoneNumber,
  $numberOfAnimals,
  $description,
  $isWait,
  $photos,
  photosUpdated,
  submitForm,
} from './model';

export default Vue.extend({
  name: 'SetInfoPage',

  directives: {
    mask: VueMaskDirective,
  },

  effector: {
    $fullName,
    $phoneNumber,
    $numberOfAnimals,
    $description,
    $isWait,
    $photos,
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    SIcon,
    SRadio,
    SInput,
    SButton,
    SUpload,
  },

  created() {
    setInfoEntered(true);
  },

  methods: {
    getErrorMessage,
    photosUpdated,
    submitForm,
  },
});
</script>

<template>
  <div class="page set-info-page">
    <header class="set-info-page__header">
      <router-link
        class="set-info-page__backward"
        :to="{
          name: 'FindLocationPage',
          params: {
            direction: 'prev'
          }
        }"
      >
        <s-icon :icon-path="require('../../assets/vector/arrow-left.svg')" />
      </router-link>

      <h1 class="set-info-page__main-title">
        Заявка
      </h1>
    </header>

    <validation-observer
      v-slot="{ invalid }"
      tag="form"
      class="set-info-page__form"
      slim
      @submit.prevent="submitForm"
    >
      <fieldset>
        <legend class="visually-hidden">
          Основна інформація
        </legend>

        <s-input
          v-model="$fullName"
          class="set-info-page__control"
          label="Твоє ім'я"
          name="fullName"
          type="text"
        />

        <validation-provider
          v-slot="{ errors }"
          rules="required|phoneNumber:19"
          name="phoneNumber"
          mode="eager"
          slim
        >
          <s-input
            v-model="$phoneNumber"
            v-mask="`+38 (###) ### ## ##`"
            class="set-info-page__control"
            label="Номер телефону"
            name="phoneNumber"
            type="tel"
            :error-messages="errors"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="numeric|required"
          name="numberOfAnimals"
          slim
        >
          <s-input
            v-model="$numberOfAnimals"
            class="set-info-page__control"
            label="Кількість тварин"
            name="numberOfAnimals"
            :error-messages="errors"
          />
        </validation-provider>

        <s-input
          v-model="$description"
          class="set-info-page__control"
          label="Опиши травми, якщо є"
          name="description"
        />
      </fieldset>

      <fieldset>
        <legend>
          Зачекаєш приїзд служби?
        </legend>

        <div class="s-info-page__radio-group">
          <s-radio
            v-model="$isWait"
            bordered
            label="Так"
            name="wait"
            :value="true"
          />
          <s-radio
            v-model="$isWait"
            bordered
            label="Ні"
            name="wait"
            :value="false"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Фото тварини
        </legend>

        <s-upload
          :value="$photos"
          tip="(Не обов'язково)"
          @input="photosUpdated"
        />
      </fieldset>

      <div class="set-info-page__submit">
        <s-button :disabled="invalid">
          Підтвердити
        </s-button>
      </div>
    </validation-observer>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.set-info-page {
  display: flex;
  flex-direction: column;
  padding-top: 66px;
}

.set-info-page__header {
  display: flex;
  justify-content: center;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;

  width: 100%;
  padding: 18px 0;

  background: var(--light);
}

.set-info-page__backward {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.set-info-page__main-title {
  font-size: 25px;
  line-height: 1.2;
  font-weight: normal;
  color: var(--secondary)
}

.set-info-page__form {
  padding: 14px 20px 24px;
  flex: 1 0;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 375px) {
    padding-left: 52px;
    padding-right: 52px;
  }
}

.set-info-page__control {
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}

fieldset {
  border: none;
  padding: 0;
  margin:  0;
  appearance: none;

  &:not(:nth-of-type(1)) {
    margin-top: 24px;
  }
}

legend {
  padding: 0;
  margin: 0 auto;
  display: table;
  text-align: center;
  color: var(--primary-text);
  appearance: none;

  color: var(--secondary);
  line-height: 1.3;
  font-size: 16px;
}

.s-info-page__radio-group {
  display: flex;
  justify-content: center;
  margin: 12px -12px 0;

  > * {
    margin: 0 12px;
  }
}

.set-info-page__submit {
  display: flex;
  justify-content: center;
  margin-top: auto;
  flex: 1 1 auto;
  padding-top: 60px;

  > button {
    height: 50px;
  }
}
</style>
