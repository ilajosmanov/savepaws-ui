<script>
export default {
  name: 'SCollapse',

  model: {
    prop: 'current',
    event: 'change',
  },

  props: {
    current: {
      type: String,
      default: '',
    },
  },

  provide() {
    return {
      changeActiveTab: this.handleChange,
      getActiveTab: this.getActiveTab,
    };
  },

  methods: {
    handleChange(e) {
      this.$emit('change', e);
    },
    getActiveTab() {
      return this.current;
    },
  },
};
</script>

<template>
  <div
    class="s-collapse"
    role="tablist"
  >
    <slot />
  </div>
</template>
