<template>
  <div>
    <div v-if="SideBar" class="backdrop" @click="SetSideBar(false)" />
    <div class="sidebar" :open="SideBar">
      <div class="login">
        <h3 @click="login">Login</h3>
      </div>
      <hr />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0f111070;
  z-index: 40;
}
.sidebar {
  position: fixed;
  height: 100vh;
  width: 200px;
  left: -200px;
  background-color: #0f1110;
  z-index: 50;
  transition: left 0.25s ease;

  h3 {
    margin-block: 10px;
    padding-inline: 15px;
    text-align: left;
  }
  hr {
    width: calc(100% - 20px);
    opacity: .8;
  }
}
.sidebar[open] {
  left: 0px;
}
.login {
  color: #dedede;
}
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["SideBar", "Width"]),
  },

  watch: {
    Width() {
      if (this.Width > 868) this.SetSideBar(false);
    },
  },

  methods: {
    ...mapMutations(["SetSideBar", "SetSingin", "SetSinginComponent"]),
    login() {
      this.SetSingin(true);
      this.SetSinginComponent("Login")
    },
  },
};
</script>