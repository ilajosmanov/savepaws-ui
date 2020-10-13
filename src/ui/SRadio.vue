<script>
export default {
  name: 'SRadio',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    checked: {
      type: [String, Number, Boolean],
      default: '',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked() {
      return this.value === this.checked;
    },
  },

  methods: {
    handleChange() {
      this.$emit('change', this.value);
    },
  },
};
</script>

<template>
  <label
    class="s-radio"
    :class="{ bordered }"
  >
    <input
      type="radio"
      class="s-radio__control visually-hidden"
      :checked="isChecked"
      v-bind="$attrs"
      @change="handleChange"
    >

    <span
      class="s-radio__indicator"
      aria-hidden="true"
    />
    <span class="s-radio__label">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss" scoped>
.s-radio {
  display: inline-flex;
  min-width: 80px;
  align-items: center;
  padding: 9px 8px;

  &:focus-within {
    box-shadow: 0px 0px 10px 0px var(--primary-light);
  }

  &.bordered {
    border: 1px solid var(--primary);
    border-radius: 10px;
  }
}

.s-radio__indicator {
  width: 22px;
  height: 22px;
  display: inline-block;
  border: 1px solid #c2c2c2;
  border-radius: 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: var(--primary);
    border-radius: 50%;
    display: none;
  }
}

.s-radio__control {
  &:checked + .s-radio__indicator {
    border-color: var(--primary);

    &::after {
      display: block;
    }
  }
}

.s-radio__label {
  font-size: 16px;
  line-height: 22px;
  color: var(--secondary);
  display: inline-block;
  margin-left: 11px;
}
</style>
