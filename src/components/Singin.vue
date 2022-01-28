<template>
  <div class="login">
    <div class="backdrop" @click="close()" />
    <transition name="login">
      <Login v-if="SinginComponent == 'Login'" />
      <Register v-else-if="SinginComponent == 'Register'" />
      <ForgetPWD v-else-if="SinginComponent == 'Forget'" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_login.scss";
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["SinginComponent"]),
  },

  methods: {
    ...mapMutations(["SetSingin", "SetSinginComponent"]),
    close() {
      this.SetSingin(false);
      this.SetSinginComponent("");
    },
  },
};
</script>