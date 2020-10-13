<script lang="ts">
import Vue from 'vue';
import SButton from '../../ui/SButton.vue';
import SCollapse from '../../ui/SCollapse.vue';
import SCollapseItem from '../../ui/SCollapseItem.vue';
import { $isSetInfoVisited } from '../../features/app';

export default Vue.extend({
  name: 'HomePage',

  effector: {
    $isSetInfoVisited,
  },

  components: {
    SButton,
    SCollapse,
    SCollapseItem,
  },

  props: {
    from: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    activeTab: '',
  }),

  computed: {
    items() {
      const items = [
        {
          name: 'mission',
          title: 'Наша місія',
          description: 'Врятувати усіх безпритульних собак і котів з вулиці та знайти їм дім.',
        },
        {
          name: 'todo',
          title: 'Як працює додаток',
          description: `
            Якщо ти знайшов тварину, тобі треба заповнити заявку та зачекати приїзд
            служби. Це може зайняти до 20 хвилин.
          `,
        },
        {
          name: 'future',
          title: 'Що буде далі з твариною?',
          description: `
            Коли ти допоміг нам знайти тварину, наша служба відвозить її у притулок,
            де тварину обстежують, приводять у належний вигляд та починають шукати їй дім.
          `,
        },
      ];

      return Object.freeze(items);
    },
  },
});
</script>

<template>
  <div class="page home-page">
    <div
      aria-hidden="true"
      class="home-page__fullscreen-border"
    />

    <div
      class="home-page__main-content"
      :class="{ 'backward': $isSetInfoVisited }"
    >
      <s-button
        v-if="$isSetInfoVisited && from"
        class="home-page__back-to-order"
        :to="{
          name: from,
          direction: 'next'
        }"
      >
        Повернутися до заявки
      </s-button>

      <div class="logo">
        <img
          src="../../assets/img/logo.svg"
          alt="Savepaws логотип"
        >
      </div>

      <figure class="home-page__main-picture">
        <img
          src="../../assets/img/dog.png"
          alt="Зображення з собакою"
        >

        <figcaption class="home-page__descr-wrap">
          <h1 class="home-page__main-title">
            Привіт!
          </h1>

          <h2 class="home-page__sub-title">
            Хто ми?
          </h2>

          <p>
            Ми - група волонтерів, які об’єдналися для того аби врятувати усіх безпритульних тварин в Україні.
            Ми - це (название приютов і орг)
          </p>
          <p>
            Наразі програма тестується тількі у Києві та київській області,
            але ми намагаємося швидше розширювати проект.
          </p>
        </figcaption>
      </figure>

      <div class="home-page__action">
        <s-button
          :to="{
            name: 'FindLocationPage',
            params: {
              direction: 'next'
            }
          }"
        >
          Знайшов тварину
        </s-button>
      </div>
    </div>

    <div class="home-page__info">
      <s-collapse
        v-model="activeTab"
        class="home-page__collapse"
      >
        <s-collapse-item
          v-for="item in items"
          :key="item.name"
          :name="item.name"
          :title="item.title"
        >
          {{ item.description }}
        </s-collapse-item>
        <s-collapse-item
          key="contacts"
          name="contacts"
          title="Зв'язатися з нами"
        >
          Пошта — <a href="mailto:savecatsand@gmail.com">savecatsand@gmail.com</a> <br>
          Служба підтримки — <a href="mailto:ssupport@gmail.com">support@gmail.com</a>
        </s-collapse-item>
      </s-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding: 0 16px;
}

.home-page__back-to-order {
  margin-bottom: 8px;
  padding: 0;
  height: 38px;
}

.home-page__fullscreen-border {
  height: 100%;
  width: 100%;

  @media screen and (max-height: 521px) and (orientation: landscape) {
    display: none;
  }
}

.home-page__main-content {
  padding: 32px 16px 0;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  @media screen and (max-height: 521px) and (orientation: landscape) {
    position: static;
    padding: 32px 0 0 0;
  }

  &.backward {
    padding-top: 8px;
  }
}

.home-page__main-picture {
  margin: 32px 0 auto 0;

  > img {
    max-width: 120px;
    display: block;
    margin: 0 auto;
  }
}

.home-page__descr-wrap {
  margin-top: 32px;
  color: var(--secondary);

  p:nth-of-type(1) {
    margin-top: 16px;
  }

  p {
    line-height: 1.5;
    font-size: 16px;
    font-size: 2vh;

    @media screen and (max-height: 521px) and (orientation: landscape) {
      font-size: 16px;
    }
  }
}

.home-page__main-title {
  font-weight: 500;
  font-size: 4vh;
  line-height: 1.15;
  text-align: center;

  @media screen and (max-height: 521px) and (orientation: landscape) {
    font-size: 32px;
  }
}

.home-page__sub-title {
  font-size: 2.5vh;
  line-height: 1.2;
  font-weight: normal;

  margin-top: 16px;

  @media screen and (max-height: 521px) and (orientation: landscape) {
    font-size: 20px;
  }
}

.home-page__action {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  padding-bottom: 16px;
}

.home-page__info {
  flex-shrink: 0;
  padding-bottom: 16px;
}

.logo {
  display: flex;
  justify-content: center;

  > img {
    display: block;
    max-width: 177px;
  }
}
</style>
