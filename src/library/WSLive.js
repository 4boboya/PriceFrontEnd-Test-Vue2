import * as signalR from "@aspnet/signalr";
import Zlib from "zlib";

export default class WSLive {
    ConnectionObject = null;
    static ResponseMsg = new String();
    ConnectHub(gameType) {
        //建立設定
        this.ConnectionObject = new signalR.HubConnectionBuilder()
            .withUrl("https://ls.zbdigital.net/pricecenter/pricecenterhub")
            .build(); //設定路由
        //開始連線
        this.ConnectionObject.on("ReceiveMessage", this.onReceiveMessage);
        this.ConnectionObject.on("ReceiveGroupMessage", this.onReceiveMessage);
        let conn = this.ConnectionObject;
        this.ConnectionObject
            .start()
            .then(function() {
                conn
                    .invoke("AddGroup", `${gameType}_UI`, "AZYGo2j3yVk7qDjt")
                    .catch(function(err) {
                        return console.error(err.toString());
                    });
                event.preventDefault();
            })
            .catch(function(err) {
                // 連接失敗
                return console.error(err.toString());
            });
    }
    onReceiveMessage(result) {
        WSLive.DeCompress(result);
    }
    DeConnection() {
        if (this.ConnectionObject != null) this.ConnectionObject.stop();
    }
    static DeCompress(message) {
        //Step1.解Base64編碼
        let strData = atob(message);
        //Step2.將base64字串切割為binnary array
        let charData = strData.split('').map((x) => { return x.charCodeAt(0); });
        let binData = new Uint8Array(charData);
        //Step3.前四碼為壓縮前的字串長度,可忽略.
        binData = binData.slice(4);
        try {
            // 解壓縮並decode成字串
            Zlib.gunzip(binData, function(e, b) {
                WSLive.ResponseMsg = b.toString('utf8');
            });
        } catch (e) {
            WSLive.ResponseMsg = "Add group error ,gametype not support.";
        }
    }
}