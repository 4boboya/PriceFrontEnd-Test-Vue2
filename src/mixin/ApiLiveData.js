import Vue from 'vue';
/**
 * 這是Sample
 * @type ComponentOptions
 */

// on connection 01 39 17
// on frist msg 01 39 46
const ApiGameData = {
    methods: {
        tidyData(liveDtos) {
          const liveDataModel = {
            GameDate: "",
            GameTime: "",
            League: "",
            LeagueID: "",
            GameID: "",
            TeamH: "",
            TeamA: "",
            ScoreH: "",
            ScoreA: "",
            Site: this.siteModel,
            Status: {},
            Live: "",
          };
          if (liveDtos == null || liveDtos.length <= 0) return
          liveDtos.forEach((item) => {
            if(item.gameStatus == "Final") {
              return
            }
            let liveData = JSON.parse(JSON.stringify(liveDataModel));
            if (!Object.keys(this.liveDatas).includes(item.leagueID)) {
              Vue.set(this.liveDatas, item.leagueID, {})
            }
            liveData.GameDate = item.gameDate.replace("-", "*").replace(/20.+\*/, "").replace("-", "/");
            liveData.LeagueID = item.leagueID;
            liveData.League = item.league;
            liveData.GameID = item.gameID;
            liveData.GameTime = item.gameTime;
            liveData.TeamH = item.team1;
            liveData.TeamA = item.team2;
            liveData.ScoreH = item.score1;
            liveData.ScoreA = item.score2;
            liveData.Live = item.liveUrl
            liveData.Site = this.tidySite(item.siteGameDtos, item.leagueID, item.gameID);
            Vue.set(this.liveDatas[item.leagueID], item.gameID, liveData)
            this.$forceUpdate();
          });
        },
    
        tidySite(siteDtos, lid, gid) {
          let siteData = JSON.parse(JSON.stringify(this.siteModel));
          siteDtos.forEach((siteItem) => {
            this.siteMergeLeagueMapping[siteItem.gameID] = lid
            this.siteMergeGameMapping[siteItem.gameID] = gid
            Vue.set(siteData, siteItem.site, this.singleSiteAPI(siteItem))
          });
          return siteData;
        },
    
        singleSiteAPI(siteItem) {
          let siteData = {
            "ID": siteItem.gameID,
            "HA": {},
            "1X2": {},
            "OU": {},
          };
          siteItem.odds.forEach((oddItem) => {
            if (oddItem.playMode.includes("OU")) {
              Vue.set(siteData, "OU", this.getOU(oddItem))
            } else if (oddItem.playMode.includes("HA")) {
              let { HA, X } = this.getHA(oddItem);
              Vue.set(siteData, "HA", HA)
              Vue.set(siteData, "1X2", X)
            }
          });
    
          return siteData
        },
    
        getOU(ou) {
          let ouData = {};
          ou.prices.forEach((priceItem) => {
            if (priceItem.main) {
              Vue.set(ouData, "spread", `o${priceItem.spread}`)
              priceItem.odds.forEach((oddItem) => {
                if (oddItem.oddType == "O") {
                  Vue.set(ouData, "o", oddItem.odd)
                } else if (oddItem.oddType == "U") {
                  Vue.set(ouData, "u", oddItem.odd)
                }
              });
            }
          });
          return ouData;
        },
    
        getHA(ha) {
          let haData = { HA: {}, X: {} };
          ha.prices.forEach((priceItem) => {
            if (priceItem.main) {
              if (priceItem.spread == "1X2") {
                Vue.set(haData["X"], "spread", priceItem.spread)
                priceItem.odds.forEach((oddItem) => {
                  if (oddItem.oddType == "H") {
                    Vue.set(haData["X"], "h", oddItem.odd)
                  } else if (oddItem.oddType == "A") {
                    Vue.set(haData["X"], "a", oddItem.odd)
                  }
                });
              } else {
                Vue.set(haData["HA"], "spread", priceItem.spread)
                priceItem.odds.forEach((oddItem) => {
                  if (oddItem.oddType == "H") {
                    Vue.set(haData["HA"], "h", oddItem.odd)
                  } else if (oddItem.oddType == "A") {
                    Vue.set(haData["HA"], "a", oddItem.odd)
                  }
                });
              }
            }
          });
          return haData;
        },
    },
};
export default ApiGameData;
