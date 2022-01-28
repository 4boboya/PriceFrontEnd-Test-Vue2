<template>
  <div class="live" ref="live-data">
    <input type="text" v-model="inputContent" ref="canvas-input" class="canvas-input" />
    <canvas 
      v-if="Memo" 
      ref="memo-canvas"
      @mousemove="draw"
      @mousedown="beginDrawing"
      @mouseup="stopDrawing"
    />
    <div>
      <div v-for="(item, LID) in liveDatas" :key="`oddtable_${LID}`">
        <div v-collapse:check="`${LID}_${Object.keys(liveDatas).indexOf(LID)}`" class="title">{{ Object.values(item)[0].League }}</div>
        <div :id="`col_${LID}_${Object.keys(liveDatas).indexOf(LID)}`" class="table-scroll collapse">
          <div class="div-table">
            <div class="div-tr div-thead">
              <div class="div-td" style="width: 0px; padding-inline: unset"></div>
              <div class="div-td" style="width: 60px"></div>
              <div class="div-td" style="width: 210px"></div>
              <div class="div-td" style="width: 35px"></div>
              <div class="div-td" style="width: 150px">TWSL</div>
              <div class="div-td" style="width: 150px">Bet365</div>
              <div class="div-td" style="width: 150px">Bwin</div>
              <div class="div-td" style="width: 150px">Ku888</div>
              <div class="div-td" style="width: 150px">Betfair</div>
              <div class="div-td" style="width: 150px">Pinnacle</div>
              <div class="div-td">Status</div>
              <div class="div-td" style="width: 100px"></div>
            </div>
            <div
              class="div-tr div-tbody"
              v-for="item2 in item"
              :key="`oddtr_${item2.GameID}`"
            >
              <div class="div-td">
                <div>
                  <div>{{ item2.GameDate }}</div>
                  <div>{{ item2.GameTime }}</div>
                </div>
              </div>
              <div class="div-td">
                <div class="odd">
                  <div>{{ item2.TeamH }}</div>
                  <div></div>
                  <div>{{ item2.TeamA }}</div>
                </div>
              </div>
              <div class="div-td">
                <div class="odd">
                  <div>{{ item2.ScoreH }}</div>
                  <div></div>
                  <div>{{ item2.ScoreA }}</div>
                </div>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['twsl']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['bet365.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['bwin.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['ku888']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['betfair.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['pinnacle.com']"></Odd>
              </div>
              <div class="div-td">
                <div>
                  <div v-for="(val, key) in item2.Status" :key="`${item2.GameID}_${key}`">
                    <span style="white-space: nowrap;"> {{val}} </span>
                  </div>
                </div>
              </div>
              <div class="div-td">
                <div>
                  <div class="link">
                    <span>Live</span>
                  </div>
                  <div class="link">
                    <span>Tread</span>
                  </div>
                  <div class="link">
                    <span>Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_live.scss";
@import "@/style/_common.scss";
@include mixin-phone {
  .title {
    font-size: 12px;
  }
}
.live {
  position: relative;
  overflow-x: hidden;
}

canvas {
  position: absolute;
  z-index: 10;
}

.canvas-input {
  position: absolute;
  z-index: -1;
  background-color: transparent;
  outline: unset;
  border: unset;
}
</style>

<script>
import { LiveGame } from "@/api/home.js";
import { mapState, mapMutations } from "vuex";
import Signalr from "@/library/WSLive.js"
import html2canvas from "html2canvas";
import ApiGameData from "@/mixin/ApiLiveData.js"
import WSGameData from "@/mixin/WSLiveData.js"
export default {
  props: ["save", "size", "color", "eraser", "clear", "pen", "font"],

  mixins: [ApiGameData, WSGameData],

  data() {
    return {
      liveDatas: {},
      siteModel: {
        "bet365.com": {},
        "betfair.com": {},
        "bwin.com": {},
        ku888: {},
        twsl: {},
        "pinnacle.com": {},
      },
      signalr: new Signalr,
      siteMergeLeagueMapping: {},
      siteMergeGameMapping: {},
      ctx: CanvasRenderingContext2D,
      mouseX:0,
      mouseY:0,
      drawing: false,
      canvas: null,
      input: false,
      inputContent: "",
      inputX:0,
      inputY:0,
    };
  },

  computed: {
    ...mapState("Component", ["GameType", "Memo"]),
  },

  watch: {
    async GameType() {
      await this.getLiveData()
      this.signalr.DeConnection()
      this.signalr.ConnectHub(this.GameType)
      Object.defineProperty(Signalr, 'ResponseMsg', {
          set: (message) => {
              this.channelCallback(message)
          }
      })
    },
    Memo() {
      if (this.Memo) {
        this.startMemo()
      } else {
        this.input = false
        this.signalr.ConnectHub(this.GameType)
      }
    },
    save() {
      if (this.save) this.saveImg()
    },
    clear() {
      if (this.clear) this.clearCanvas()
    },
    eraser() {
      if (this.eraser) {
        this.input = false
        this.inputContent = ""
      }
    },
    pen() {
      if (this.pen) {
        this.input = false
        this.inputContent = ""
      }
    },
    input() {
      const input = this.$refs['canvas-input']
      if (this.input) input.setAttribute('style', `z-index: 30; left: ${this.mouseX}px; top: ${this.mouseY}px; color: ${this.color}; font-size: ${this.size}px; max-width: ${this.canvas.width - this.mouseX - 5}px`)
      else input.setAttribute('style', `z-index: 0`)
    }
  },

  async created() {
    await this.getLiveData();
  },

  mounted() {
    this.signalr.ConnectHub(this.GameType)
    Object.defineProperty(Signalr, 'ResponseMsg', {
        set: (message) => {
            this.channelCallback(message)
        }
    })
  },

  destroyed() {
    this.SetMemo(false)
  },

  methods: {
    ...mapMutations("Component", ["SetMemo"]),
    async getLiveData() {
      this.liveDatas = {}
      await LiveGame({ gameType: this.GameType }).then((res) => {
        this.tidyData(res.gameLiveDtos);
      });
    },

    startMemo() {
      this.signalr.DeConnection();
      this.$nextTick(() => {
        this.canvas = this.$refs["memo-canvas"]
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
        const ctx = this.canvas.getContext("2d");
        this.ctx = ctx;

        this.$forceUpdate()
      })
    },
    draw(e){
      if (this.drawing) {
        if (this.eraser) {
          this.ctx.clearRect(e.offsetX - this.size/2 , e.offsetY - this.size/2, this.size, this.size)
        } else if (this.pen) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.color;
          this.ctx.lineCap = "round";
          this.ctx.lineWidth = this.size
          this.ctx.moveTo(this.mouseX, this.mouseY);
          this.ctx.lineTo(e.offsetX, e.offsetY);
          this.ctx.stroke();
          this.ctx.closePath();
          this.mouseX = e.offsetX;
          this.mouseY = e.offsetY;
        }
      }
    },
    beginDrawing(e){
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      if (this.font) {
        if (!this.input) {
          this.input = true
          this.inputX = e.offsetX;
          this.inputY = e.offsetY;
        } else {
          this.ctx.fillStyle = this.color;
          this.ctx.lineWidth = this.size;
          this.ctx.save();
          this.ctx.beginPath();

          this.ctx.font = `${this.size}px orbitron`
          this.ctx.fillText(this.inputContent, this.inputX, this.inputY + (this.size/2) + 2)
          this.ctx.restore()

          this.inputContent = ""
          this.input = false
        }
      } else {
        this.drawing = true;
      }
    },
    stopDrawing(){
      this.drawing = false;
    },

    saveImg() {
      const dataDom = this.$refs['live-data']
      html2canvas(dataDom, {backgroundColor: '#0F1110'}).then((res) => {
        const dataURL = res.toDataURL("image/png")
        console.log(dataURL)
        this.SetMemo(false)
      })
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.$emit('clearDone')
    }
  },
};
</script>