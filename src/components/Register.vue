<template>
  <div class="card">
    <h1>Register</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="UserName" />
      </div>
      <div class="input-div">
        <input type="text" placeholder="E-mail" />
      </div>
      <div class="input-div">
        <input type="password" placeholder="Password" v-model="pwd" />
      </div>
      <div class="input-div">
        <input
          type="password"
          placeholder="Check Password"
          v-model="checkPwd"
        />
      </div>
      <div class="button-div">
        <div>
          <span v-show="pwdError">Password not same</span>
        </div>
        <button class="register-button">Register</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="have-account">
        <span>Have an Account?</span>
        <span @click="login()"> Sign In</span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_login.scss";
.button-div span {
  cursor: default;
}
.have-account {
  text-align: center;
  color: #dedede;
  font-size: 12px;

  & span:nth-child(2) {
    cursor: pointer;
  }
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      pwd: "",
      checkPwd: "",
      pwdError: false,
    };
  },
  watch: {
    pwd() {
      if (this.pwd != this.checkPwd) {
        this.pwdError = true;
      } else {
        this.pwdError = false;
      }
    },
    checkPwd() {
      if (this.pwd != this.checkPwd) {
        this.pwdError = true;
      } else {
        this.pwdError = false;
      }
    },
  },
  methods: {
    ...mapActions("Component", ["SetSinginComponent"]),

    login() {
      this.SetSinginComponent("Login")
    },
  },
};
</script>