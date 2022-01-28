<template>
  <div class="card">
    <h1>Forget Password</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="E-mail" />
      </div>
      <div class="button-div">
        <div/>
        <button class="register-button">Submit</button>
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
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("Component", ["SetSinginComponent"]),

    login() {
      this.SetSinginComponent("Login")
    },
  },
};
</script>