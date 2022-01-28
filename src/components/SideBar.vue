<template>
  <div>
    <div v-if="SideBar" class="backdrop" @click="SetSideBar(false)" />
    <div class="sidebar" :open="SideBar">
      <div class="login side-item">
        <h3 @click="login">Login</h3>
      </div>
      <hr />
      <div class="side-item"><h4>Experts</h4></div>
      <div class="side-item"><h4>Today’s Best Deals</h4></div>
      <div class="side-item"><h4>Promotions</h4></div>
      <div class="side-item dropdown">
        <h4>Feeback</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div class="side-item dropdown">
        <h4>Customer Services</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div class="side-item dropdown">
        <h4>Language</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0f111070;
  z-index: 1;
}
.sidebar {
  position: fixed;
  height: 100vh;
  width: 250px;
  left: -250px;
  background-color: #0f1110;
  z-index: 1;
  transition: left 0.25s ease;

  .side-item {
    display: flex;
    color: #dedede;
    padding-inline: 15px;
    align-items: center;
    h3,
    h4 {
      margin-block: 10px;
      text-align: left;
    }
  }
  hr {
    width: calc(100% - 20px);
    opacity: 0.8;
  }
  .dropdown {
    justify-content: space-between;
  }
}
.sidebar[open] {
  left: 0px;
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
      this.SetSinginComponent("Login");
    },
  },
};
</script>