export interface coindetails {

    id : string,
    name : string,
    symbol : string,
    image : string,
    current_price : number,
    ath_change_percentage : number,
    market_cap : number,
    price_change_percentage_24h : number
    market_cap_rank : number 
}

export type selectChange = {

    api : string
}

export type detailId = {

    id : string

}

export interface coinChartDetails {

    prices : number[][]

}