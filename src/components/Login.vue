<template>
  <div class="card">
    <h1>Login</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="Account" />
      </div>
      <div class="input-div">
        <input type="password" placeholder="Password" />
      </div>
      <div class="button-div">
        <div>
          <span @click="register()">Register</span>
          <span @click="forget()">Forget Password?</span>
        </div>
        <button class="login-button">Login</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="third-login">
        <button class="g-signin-button">Google</button>
        <button class="fb-signin-button">Facebook</button>
        <button class="twitter-signin-button">Twitter</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_login.scss";
</style>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["SetSinginComponent"]),

    register() {
      this.SetSinginComponent("Register")
    },
    forget() {
      this.SetSinginComponent("Forget")
    }
  },
};
</script>