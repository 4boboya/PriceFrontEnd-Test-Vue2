<template>
  <div class="footer">
    <div class="type">
      <div>Help <span class="pc-show">Center</span></div>
      <div>Feeback</div>
      <div>Promotions</div>
      <div>Policy & Agreement</div>
      <div>About <span class="pc-show">Us</span></div>
    </div>
    <div class="copy">
      <h3>Copy Right © 2021 zbdigital</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_common.scss";
.footer {
  height: 104px;
  border-top: 1px solid #c4c4c430;
  color: #dedede;
  margin-top: 20px;
}

@include mixin-phone {
  .footer {
    width: calc(100vw - 30px);
    font-size: 8px;
  }
  .type {
    padding: 20px 10px !important;
  }
  .pc-show {
    display: none;
  }
}
@include mixin-pc {
  .footer {
    width: calc(100vw - 230px);
  }
}
.type {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  & > div {
    cursor: pointer;
  }
  & > div:hover {
    transform: scale(1.1);
  }
}
.copy {
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin: unset;
  }
}
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["Width"]),
  },
}
</script>