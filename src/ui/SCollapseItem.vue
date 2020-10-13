<script>
export default {
  name: 'SCollapseItem',

  inject: ['changeActiveTab', 'getActiveTab'],

  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    isActive() {
      return this.getActiveTab() === this.name;
    },
  },

  methods: {
    handleChange() {
      const name = this.isActive ? '' : this.name;
      this.changeActiveTab(name);
    },
  },
};
</script>

<template>
  <div class="s-collapse-item">
    <header class="s-collapse-item__header">
      <button
        class="s-collapse-item__title-btn"
        :class="{'s-collapse-item__title-btn--active': isActive}"
        @click="handleChange"
      >
        {{ title }}
      </button>
    </header>

    <div
      v-show="isActive"
      class="s-collapse-item__body"
      role="tabpanel"
      :aria-hidden="!isActive"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";

.s-collapse-item {
  width: 100%;
}

.s-collapse-item__body {
  padding: 8px 16px;
  border: 1px solid var(--primary-light);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 5px;

  color: var(--primary-text);
  font-size: 16px;
  line-height: 24px;

  a {
    text-decoration: none;
    color: var(--primary);
  }
}

.s-collapse-item__title-btn {
  @include reset-btn();

  width: 100%;
  display: block;
  padding: 8px 35px 8px 16px;
  border-radius: 10px;

  background: var(--primary-light);
  color: var(--white);

  text-align: left;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 5px;
  position: relative;
  transition: border-radius 0.2s linear;

  &::after {
    content: "";
    width: 12px;
    height: 21px;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    will-change: transform;
    transition: transform 0.1s linear;
    background: url('../assets/vector/arrow-down.svg') center center no-repeat;
    background-size: contain;
  }
}

.s-collapse-item__title-btn--active {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  &::after {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
