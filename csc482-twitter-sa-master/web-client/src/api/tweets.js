const Twitter = require('twitter-lite')

const apiKey = 'fxanajIS3qBU0DIXz0Z4JvloD'
const apiSecret = 'AwoY3V38qQRNhRW97C4X8b3ass17YJs62U2DAV33GBRpT1Kp8i'
const accessToken = '813601529424842752-OGF2DVlPqCZaKbB3Nq7EwR89XqUnQbd'
const accessSecret = 'Hvu31TgtsGpohR9Zhfcl6fu85ruNT2rlYPXtvSriGJif8'



/*
* Creates the twitter client app
*/
const createApp = async () => {
    const client = new Twitter({
        version: '2',
        extension: false,
        consumer_key: apiKey,
        consumer_secret: apiSecret,
        access_token_key: accessToken,
        access_token_secret: accessSecret
    })

    res = await client.getBearerToken()

    const app = new Twitter({
        version: '2',
        extension: false,
        consumer_key: apiKey,
        consumer_secret: apiSecret,
        access_token_key: accessToken,
        access_token_secret: accessSecret,
        bearer_token: res.access_token
    })
    return app
}

/**
 * 
 * @param {string} search 
 * @param {Object} config - Contains optional paramters that you can use to format your search
 * config includes
 * since {string}: Specify the begin dates that you want to get tweets from
 */
export const getTweets = async (search, config) => {
    const data = []
    const today = new Date()
    today.setMonth(today.getMonth() - 1)
    const start = today.toISOString().split('T')[0]
    const defaults = {
        since: start,
        // expansions: ['referenced_tweets.id']
    } 
    const params = Object.assign(defaults, config)
    const query = buildQuery(search, params)
    try {
        const tweets = await app.get('tweets/search/recent', {
            query: search,
            max_results: 10,
            'tweet.fields': 'id,text,geo,created_at,public_metrics',
            'expansions': 'referenced_tweets.id,referenced_tweets.id.author_id'

        })
        // console.log(tweets)
        for (const tweet of tweets.includes.tweets) {
            console.log(tweet)
        }
        return tweets.includes.tweets
    } catch (e) {
        console.log(e)
        return {}
    }
}

const buildQuery = (search, params) => {
    const query = `${search} since:${params.since}`
    return query
}

let app = null;

(async () => {
    app = await createApp();
    getTweets('#Apple', {})
})()

