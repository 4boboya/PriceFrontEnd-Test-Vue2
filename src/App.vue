<template>
  <div>
    <Header />
    <router-view />
    <ChatRoom />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  created() {
    window.addEventListener("resize", this.setWidth)
    this.setWidth()
  },

  methods: {
    ...mapMutations(["SetWidth"]),
    setWidth() {
      this.SetWidth(window.innerWidth)
    }
  }
}
</script>
