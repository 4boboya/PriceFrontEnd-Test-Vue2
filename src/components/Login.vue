<template>
  <div class="card">
    <h1>Login</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="Account" v-model="loginData.account" />
      </div>
      <div class="input-div">
        <input
          type="password"
          placeholder="Password"
          v-model="loginData.password"
        />
      </div>
      <div class="button-div">
        <div>
          <span @click="register()">Register</span>
          <span @click="forget()">Forget Password?</span>
        </div>
        <button class="login-button" @click="login()">Login</button>
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
import { mapState, mapMutations } from "vuex";
import { Login } from "@/api/user.js";
export default {
  data() {
    return {
      loginData: {
        account: "",
        password: "",
        site: "",
        finger: "",
        username: "",
      },
    };
  },
  computed: {
    ...mapState("User", ["Finger"]),
  },
  mounted() {
    this.loginData.finger = this.Finger;
  },
  methods: {
    ...mapMutations("Component", ["SetSinginComponent"]),

    register() {
      this.SetSinginComponent("Register");
    },
    forget() {
      this.SetSinginComponent("Forget");
    },
    async login() {
      await Login(this.loginData).then((res) => {
        console.log(res)
        if (res.code == 10200) {
          console.log('success')
        } else {
          console.log('fail')
        }
      })
    },
  },
};
</script>