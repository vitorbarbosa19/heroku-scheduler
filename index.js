const rp = require('request-promise-native');
require('dotenv').config()

//GoogleSheets GET

 async function main(){

    const url = "https://sheets.ziro.app/.netlify/functions/api"
    const username = process.env.userSheets
    const password = process.env.pdwSheets
    const auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");

    let optionsGoogle = {
        method: "GET",
        url:url,
        headers: {
            "Origin": "https://ziro.app",
            "Content-type": "application/json",
            "Authorization": auth
        },
        body : {
            "apiResource": "values",
            "apiMethod": "get",
            "spreadsheetId": process.env.sheetsId,
            "range": "main!A1:M2"
        },
        json: true
    }

    let optionsGoogleAssessorMes = {
        method: "GET",
        url:url,
        headers: {
            "Origin": "https://ziro.app",
            "Content-type": "application/json",
            "Authorization": auth
        },
        body : {
            "apiResource": "values",
            "apiMethod": "get",
            "spreadsheetId": process.env.sheetsId,
            "range": "main!O2:R100"
        },
        json: true
    }
    let optionsGoogleAssessorDia = {
        method: "GET",
        url:url,
        headers: {
            "Origin": "https://ziro.app",
            "Content-type": "application/json",
            "Authorization": auth
        },
        body : {
            "apiResource": "values",
            "apiMethod": "get",
            "spreadsheetId": process.env.sheetsId,
            "range": "main!S2:V100"
        },
        json: true
    }
    try {
        let data = await rp(optionsGoogle)
        let dataMes = await rp(optionsGoogleAssessorMes)
        let dataDia = await rp(optionsGoogleAssessorDia)
        let arrayEmail = (data.values[1][0]).split(",")
        const now = new Date();
        const hora = now.getUTCHours()
        const minuto = now.getUTCMinutes()
        const diaSemana = now.getUTCDay()
        console.log(data)
    } catch (error) {
        console.log(error)
        return error
    }
}

main()