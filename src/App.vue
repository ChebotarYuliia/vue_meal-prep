<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content>
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 800 }">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';

export default {
  name: 'App',
  components: {
    AppNavigation,
  },
};
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>
