<template>
  <div class="chat" :show="show">
    <div class="chat-title" @click="open()">Chat Room</div>
    <div class="chat-content">
      <div class="chat-message">
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
      </div>
      <hr />
      <div class="chat-input">
        <textarea />
        <button v-if="show" class="submit" @click="submit()">
          <icon :icon="['far', 'paper-plane']" class="fa-lg"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  position: fixed;
  bottom: -10px;
  right: 30px;
  transition: all 0.2s ease;

  .chat-title {
    cursor: default;
    background-color: #7e0234;
    opacity: 0.7;
    height: 35px;
    width: 200px;
    line-height: 35px;
    padding-inline: 30px;
    font-weight: bold;
    color: #dedede;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  .chat-input {
    position: relative;
  }

  .chat-content {
    height: 0px;
    padding: 5px 10px;
    background-color: #0f1110;
    transition: height 0.2s ease;
  }

  .chat-message {
    height: 300px;
    color: #dedede;
  }

  textarea {
    resize: none;
    width: 190px;
    height: 70px;
    border-radius: 5px;
    padding-right: 45px;
    background-color: #FFFFFF10;
    color: #dedede;
  }

  .submit {
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 30px;
    background-color: transparent;
    color: #618730;
    outline: unset;
    border: unset;
    padding: 5px;

    svg {
      transition: all 0.2s ease;
    }

    &:hover {
      animation: hover-dowm 0.3s linear;

      svg {
        filter: drop-shadow(1px 1px 5px #b2ce8e );
      }
    }
  }
}

.chat[show] {
  bottom: 10px;
  box-shadow: 1.5px 1.5px 15px #ffffff45;

  .chat-title {
    opacity: 1;
  }
  .chat-content {
    height: 400px;
    background-color: #0f1110;
  }
}
</style>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    submit() {
      console.log(12)
    }
  },
};
</script>