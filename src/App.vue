<template>
  <div>
    <Header />
    <router-view />
    <ChatRoom />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Finger from "@/library/Finger.js"
export default {
  created() {
    window.addEventListener("resize", this.setWidth)
    this.setWidth()
  },

  mounted() {
    Finger.Create()
  },

  methods: {
    ...mapMutations("Component", ["SetWidth"]),
    setWidth() {
      this.SetWidth(window.innerWidth)
    }
  }
}
</script>
