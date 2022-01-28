import { $priceCenterSite } from './html';
export const HotGame = async function () {
    const hotGameData = await $priceCenterSite('GET', '/game/hotgame', {});
    return hotGameData;
}

export const LiveGame = async function (requestData) {
    const liveGameData = await $priceCenterSite('GET', '/game/gamedata', {query: requestData});
    return liveGameData;
}