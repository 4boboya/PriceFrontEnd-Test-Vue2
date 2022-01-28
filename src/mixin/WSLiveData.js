import Vue from 'vue';
/**
 * 這是Sample
 * @type ComponentOptions
 */

// on connection 01 39 17
// on frist msg 01 39 46
const WSGameData = {
    methods: {

        channelCallback(message) {
            if (message == "Add group error during authentication") return
            message = JSON.parse(message)
            message.SiteGames.forEach((siteGame) => {
                const LID = this.siteMergeLeagueMapping[siteGame.GameID]
                const GID = this.siteMergeGameMapping[siteGame.GameID]
                if (LID == undefined || GID == undefined) return
                if ((siteGame.Site == "bet365.com" || siteGame.Site == "ku888") && siteGame.GameStatus == "InProgress") {
                    this.liveDatas[LID][GID].ScoreH = siteGame.Score1
                    this.liveDatas[LID][GID].ScoreA = siteGame.Score2
                    if (siteGame.PlayByPlay != null) {
                        Vue.set(this.liveDatas[LID][GID], "Status", this.getStatus(siteGame.PlayByPlay))
                    }
                }
                const { HA, X, OU, } = this.singleSiteWS(siteGame)
                this.liveDatas[LID][GID].Site[siteGame.Site]["HA"] = HA
                this.liveDatas[LID][GID].Site[siteGame.Site]["1X2"] = X
                this.liveDatas[LID][GID].Site[siteGame.Site]["OU"] = OU
                this.$forceUpdate()
            })
        },

        singleSiteWS(siteItem) {
            let siteData = {
                "HA": {},
                "X": {},
                "OU": {},
            };
            siteItem.Odds.forEach((oddItem) => {
                if (oddItem.PlayMode.includes("OU")) {
                    siteData["OU"] = this.getOUWS(oddItem);
                } else if (oddItem.PlayMode.includes("HA")) {
                    let { HA, X } = this.getHAWS(oddItem);
                    siteData["HA"] = HA;
                    siteData["X"] = X;
                }
            });

            return siteData
        },

        getOUWS(ou) {
            let ouData = {};
            ou.Prices.forEach((priceItem) => {
                if (priceItem.Main) {
                    ouData.spread = `o${priceItem.Spread}`;
                    priceItem.Odds.forEach((oddItem) => {
                        if (oddItem.OddType == "O") {
                            ouData.o = oddItem.Odd;
                        } else if (oddItem.OddType == "U") {
                            ouData.u = oddItem.Odd;
                        }
                    });
                }
            });
            return ouData;
        },

        getHAWS(ha) {
            let haData = { HA: {}, X: {} };
            ha.Prices.forEach((priceItem) => {
                if (priceItem.Main) {
                    if (priceItem.Spread == "1X2") {
                        haData["X"].spread = "1X2";
                        priceItem.Odds.forEach((oddItem) => {
                            if (oddItem.OddType == "1") {
                                haData["X"].h = oddItem.Odd;
                            } else if (oddItem.OddType == "2") {
                                haData["X"].a = oddItem.Odd;
                            }
                        });
                    } else {
                        haData["HA"].spread = priceItem.Spread;
                        priceItem.Odds.forEach((oddItem) => {
                            if (oddItem.OddType == "1") {
                                haData["HA"].h = oddItem.Odd;
                            } else if (oddItem.OddType == "2") {
                                haData["HA"].a = oddItem.Odd;
                            }
                        });
                    }
                }
            });
            return haData;
        },

        getStatus(playByPlay) {
            let status = {}
            playByPlay.forEach((playItem) => {
                Vue.set(status, playItem.Key, playItem.Value)
            })
            return status
        },
    },
};
export default WSGameData;
