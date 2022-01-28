<template>
  <div
    class="hotgame"
    ref="carousel"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @mouseup="mouseup"
  >
    <div class="carousel">
      <div class="hotgame-card" v-for="(item, index) in hotGameDatas" :key="`hotgame_${item}_${index}`">
        <div class="hotgame-league">{{ item.League }}</div>
        <div class="hotgame-team">
          <div :ref="`${item.GameID}`" class="hotgame-team-h">{{ item.TeamH }}</div>
          <div style="padding-inline: 3px">{{ item.ScoreH }}:{{ item.ScoreA }}</div>
          <div :ref="`${item.GameID}`" class="hotgame-team-a">{{ item.TeamA }}</div>
        </div>
        <div>{{ item.GameDate }} {{ item.GameTime }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin hotgame-team-mixin($team) {
  width: 100%;
  @if ($team == 'H') {
    text-align: left;
  } @else if ($team == 'A') {
    text-align: right;
  } @else {
    text-align: center;
  }
}
.hotgame {
  width: calc(100vw - 40px);
  height: 95px;
  padding: 10px 20px;
  background-color: transparent;
  overflow-x: auto;
  user-select: none;

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 0px;
  }
}

.carousel {
  display: flex;
  align-items: flex-start;
  grid-gap: 20px;
}

.hotgame-card {
  height: 75px;
  min-width: 300px;
  border-radius: 5px;
  border-left: 2px solid #618730;
  color: #dedede;
  background-color: #343444;
  padding: 10px 15px;
  box-shadow: 1.5px 1.5px 4px #ffffff45;
  font-size: 13px;

  & > div {
    display: flex;
    height: 33%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  & > div.hotgame-team {
    justify-content: space-between;
  }
}

.hotgame-league {
  font-weight: bold;
}

.hotgame-team-h {
  @include hotgame-team-mixin('H')
}

.hotgame-team-a {
  @include hotgame-team-mixin('A')
}
</style>

<script>
import { HotGame } from "@/api/home.js";
export default {
  data() {
    return {
      isDown: false,
      start: 0,
      carousel: document,
      scrollLeft: 0,
      hotGameDatas: [],
    };
  },

  async created() {
    await this.getHotGame()
  },

  mounted() {
    this.carousel = this.$refs.carousel;
  },

  methods: {
    mousedown(e) {
      this.start = e.pageX;
      this.scrollLeft = this.carousel.scrollLeft;
      this.isDown = true;
    },
    mousemove(e) {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.carousel.offsetLeft;
      const walk = (x - this.start) * 2;
      this.carousel.scrollLeft = this.scrollLeft - walk;
    },
    mouseup() {
      this.isDown = false;
    },
    async getHotGame() {
      await HotGame().then((res) => {
        if (res == undefined) return
        this.tidyData(res.gameDtos)
      })
    },

    tidyData(gameDtos) {
      gameDtos.forEach((item) => {
        let hotGameData = {
          League: "",
          TeamH: "",
          TeamA: "",
          ScoreH: "",
          ScoreA: "",
          GameDate: "",
          GameTime: "",
          GameID: "",
        }
        hotGameData.League = item.league;
        hotGameData.TeamH = item.team1;
        hotGameData.TeamA = item.team2;
        hotGameData.ScoreH = item.score1;
        hotGameData.ScoreA = item.score2;
        hotGameData.GameDate = item.gameDate.replace("-", "*").replace(/20.+\*/, "").replace("-", "/");
        hotGameData.GameTime = item.gameTime
        hotGameData.GameID = item.gameID

        this.hotGameDatas.push(hotGameData)
      })
    },
  },
};
</script>