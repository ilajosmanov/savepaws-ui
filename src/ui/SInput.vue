<script lang="ts">
import Vue, { PropOptions } from 'vue';
import SIcon from './SIcon.vue';

export default Vue.extend({
  name: 'SInput',

  components: {
    SIcon,
  },

  props: {
    label: {
      type: String,
      default: null,
    },
    tip: {
      type: String,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    } as PropOptions<string[]>,
  },

  computed: {
    hasError() {
      return this.errorMessages.length > 0;
    },
  },
});
</script>

<template>
  <label
    class="s-input"
    :class="{ clearable }"
  >
    <span
      v-if="label"
      class="s-input__label"
    >
      {{ label }}

      <span
        v-if="tip"
        class="s-input__tip"
      >
        {{ tip }}
      </span>
    </span>

    <div class="s-input__control-wrapper">
      <div
        class="s-input__control-container"
      >
        <slot v-if="$slots.default" />
        <input
          v-else

          v-bind="$attrs"
          class="s-input__control"
          :class="{ clearable, hasError }"
          @input="$emit('input', $event.target.value)"
          @blur="$emit('blur')"
        >

        <s-icon
          v-if="hasError"
          class="s-input__alert-icon"
          :icon-path="require('../assets/vector/alert.svg')"
        />

        <button
          v-if="clearable"
          class="s-input__clear-btn"
          @click="$emit('clear')"
        >
          <s-icon :icon-path="require('../assets/vector/close.svg')" />
        </button>
      </div>

      <p
        v-if="hasError"
        class="s-input__error-message"
      >
        {{ errorMessages[0] }}
      </p>
    </div>
  </label>
</template>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";

.s-input {
  display: block;
  width: 100%;
}

.s-input__label {
  font-size: 13px;
  line-height: 20px;
  display: block;
  margin-left: 10px;
  margin-bottom: 5px;

  color: var(--secondary);
}

.s-input__tip {
  font-style: italic;
  display: inline-block;
  margin-left: 5px;
  font-size: 12px;
  line-height: 20px;
}

.s-input__control-container {
  position: relative;
}

.s-input__alert-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
}

.s-input__control {
  appearance: none;
  width: 100%;
  border: 1px solid rgba(51, 51, 51, .1);
  outline: none;

  padding: 14px 18px 14px 18px;
  color: var(--secondary);
  font-size: 16px;
  line-height: 20px;
  border-radius: 14px;

  &[type=number] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &.clearable {
    padding-right: 45px;
  }

  &.hasError {
    border-color: var(--danger);
    padding-right: 50px;
  }
}

.s-input__control-wrapper {
  position: relative;
  padding-bottom: 20px;
}

.s-input__error-message {
  position: absolute;
  left: 10px;
  bottom: 0;

  font-size: 12px;
  line-height: 1.66;
  letter-spacing: -0.24px;
  color: var(--danger);
}

.s-input__clear-btn {
  @include reset-btn();

  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
