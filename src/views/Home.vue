<template>
  <div>
    <SideBar />
    <HotGame v-if="Width > 868" />
    <transition name="login">
      <div v-if="Singin">
        <Singin />
      </div>
    </transition>
    <AdvBar />
    <div class="content">
      <div class="control-bar">
        <div v-if="Width > 868" class="control-type">
          <div :active="page == 'Live'" @click="page = 'Live'">Live</div>
          <span>|</span>
          <div :active="page == 'Analysis'" @click="page = 'Analysis'">
            Analysis & Predictions
          </div>
          <span >|</span>
          <div :active="page == 'Forums'" @click="page = 'Forums'">Forums</div>
          <span>|</span>
          <div :active="page == 'Results'" @click="page = 'Results'">
            Results
          </div>
        </div>
        <div v-else class="control-type">
          <div v-show="!Memo" class="control-gametype" @click="showLise = !showLise">{{ current }}</div>
          <transition name="gametype">
            <div v-if="showLise" class="type-options">
              <div @click="current = 'Live'">Live</div>
              <div @click="current = 'Analysis'">Analysis & Predictions</div>
              <div @click="current = 'Results'">Results</div>
            </div>
          </transition>
        </div>
        <div class="control-other">
          <div class="canvas-control">
            <div v-if="Width > 868" v-show="!Memo" class="control" @click="SetMemo(true)">
              <icon :icon="['fas', 'pen']" />
            </div>
            <div v-show="Memo" class="control" @click="clear = true">
              <icon :icon="['fas', 'trash-alt']" />
            </div>
            <div v-show="Memo" class="control" :class="`${eraser ? 'use-control' : ''}`" @click="eraser = true">
              <icon :icon="['fas', 'eraser']" />
            </div>
            <div v-show="Memo" class="control" :class="`${font ? 'use-control' : ''}`" @click="font = true">
              <icon :icon="['fas', 'font']" />
            </div>
            <div v-show="Memo" class="control" :class="`${pen ? 'use-control' : ''}`" @click="pen = true">
              <icon :icon="['fas', 'pen']" />
            </div>
            <div v-show="Memo" class="control" @click="showSize = !showSize">
              <icon :icon="['fas', 'text-height']" />
            </div>
            <div v-show="Memo" class="control" @click="showColor = !showColor">
              <icon :icon="['fas', 'fill-drip']" />
            </div>
            <div v-show="Memo" class="control" @click="save = true">
              <icon :icon="['fas', 'save']" />
            </div>
            <div v-show="Memo" class="control" @click="SetMemo(false)">
              <icon :icon="['fas', 'times']" />
            </div>
            <transition name="size">
              <div v-if="showSize" class="size-options">
                <div v-for="(item) in fontSizes" :key="`size_${item}`" @click="size = item; showSize = false" >
                  {{ item }}
                </div>
              </div>
            </transition>
            <transition name="color">
              <div v-if="showColor" class="color-options">
                <input v-model="color" type="color" />
              </div>
            </transition>
          </div>
          <div v-show="!Memo" class="control-gametype" @click="show = !show">{{ gameType }}</div>
          <transition name="gametype">
            <div v-if="show" class="gametype-options">
              <div v-for="(item, key) in gameTypes" :key="key" @click="changeGameType(key)" >
                {{ item }}
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="main">
        <div class="scroll">
          <Live class="content-data" :save="save" :color="color" :size="size" :eraser="eraser" :pen="pen" :font="font" :clear="clear" @clearDone="clearDone()"/>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_scroll.scss";
@import "@/style/_common.scss";
.content {
  padding-inline: 20px 10px;
}
@include mixin-phone {
  .content {
    width: calc(100vw - 30px);
    min-height: calc(100vh - 165px);
    padding-top: 20px;
  }
  .control-type {
    align-items: unset !important;
  }
  .scroll {
    height: calc(100vh - 140px) !important;
  }
}
@include mixin-pc {
  .content {
    width: calc(100vw - 230px);
    min-height: calc(100vh - 300px);
  }
  .control-type > div {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &[active] {
      transform: scale(1.1);
      font-weight: 600;
    }
  }
}
.control-bar {
  position: relative;
  background-color: #7e0234;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.control-type {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 20px;
  color: #dedede;

  span {
    padding-inline: 10px;
  }
}
.control-other {
  display: flex;
}
.control-gametype {
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: #dedede;
  cursor: pointer;
  padding-inline: 10px;
  margin-block: 5px;
  border-radius: 5px;
  box-shadow: 1.5px 1.5px 4px #00000090 inset;
}
.gametype-options,
.size-options,
.color-options,
.type-options {
  position: absolute;
  z-index: 20;
  width: 145px;
  right: 5px;
  top: 35px;
  color: #dedede;
  background-color: #30363399;
  backdrop-filter: blur(7px);
  padding: 5px 10px;
  border-radius: 5px;
  overflow: hidden;

  div {
    padding-block: 2px;
    cursor: pointer;
    line-height: 24px
  }
  div:hover {
    transform: scale(1.04);
  }
  input {
    width: 100%;
  }
}
.type-options {
  width: 170px;
  left: 5px;
}

.main {
    height:100%;

  & > .scroll {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 235px);

    @extend %scroll !optional;
  }
}
.content-data {
  position: relative;
  min-height: calc(100% - 125px);
}

.canvas-control {
  display: flex;
  line-height: 40px;
  padding-inline: 10px;

  & > .control {
    padding-inline: 10px;
    cursor: pointer;
    color: #DEDEDE;
    opacity: .9;
    margin-block: 5px;
    line-height: 26px;
    border-radius: 5px;

    &:hover {
      filter: drop-shadow(1px 1px 5px #b2ce8e );
    }
  }
}

.use-control {
  box-shadow: 0px 0px 6px 3px #00000080 inset;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      showSize: false,
      showColor: false,
      showLise: false,
      gameTypes: {
        "BK": "BasketBall",
        "SC": "Soccer",
        "BS": "BaseBall",
        "FL": "FootBall",
      },
      fontSizes: [1, 2, 4, 8, 10, 12, 16, 20, 24, 28, 30, 36],
      gameType: "BasketBall",
      current: "Live",
      page: "Live",
      save: false,
      font: false,
      eraser: false,
      pen: true,
      color: "#FFFFFF",
      size: 2,
      clear: false,
    };
  },

  computed: {
    ...mapState("Component", ["Singin", "Register", "Memo", "Width"]),
  },

  watch: {
    Memo() {
      if (!this.Memo) {
        this.save = false;
        this.showSize = false;
        this.showColor = false;
        this.eraser = false;
        this.font = false;
        this.pen = true;
      }
    },
    showSize() {
      if (this.showSize) {
        this.showColor = false;
      }
    },
    showColor() {
      if (this.showColor) {
        this.showSize = false;
      }
    },
    font() {
      if (this.font) {
        this.pen = false;
        this.eraser = false;
        this.showSize = false;
        this.showColor = false;
      }
    },
    eraser() {
      if (this.eraser) {
        this.pen = false;
        this.font = false;
        this.showSize = false;
        this.showColor = false;
      }
    },
    pen() {
      if (this.pen) {
        this.eraser = false;
        this.font = false;
        this.showSize = false;
        this.showColor = false;
      }
    },
    color() {
      this.eraser = false;
    },
    current() {
      this.showLise = false;
    },
    showLise() {
      if (this.showLise) this.show = false
    },
    show() {
      if (this.show) this.showLise = false
    }
  },

  methods: {
    ...mapActions("Component", ["SetGameType", "SetMemo"]),
    changeGameType(gameType) {
      this.show = false
      this.gameType = this.gameTypes[gameType]
      this.SetGameType(gameType)
    },
    clearDone() {
      this.clear = false
    }
  }
};
</script>
