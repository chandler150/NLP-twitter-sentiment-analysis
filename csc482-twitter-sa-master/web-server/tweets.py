import tweepy
import pandas as pd
from datetime import datetime, date, timedelta
import csv
from os import path
import json

consumer_key = 'fxanajIS3qBU0DIXz0Z4JvloD'
consumer_secret = 'AwoY3V38qQRNhRW97C4X8b3ass17YJs62U2DAV33GBRpT1Kp8i'
access_token = '813601529424842752-OGF2DVlPqCZaKbB3Nq7EwR89XqUnQbd'
access_secret = 'Hvu31TgtsGpohR9Zhfcl6fu85ruNT2rlYPXtvSriGJif8'
callback_uri = 'oob'
auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback_uri)


def retrieve_tweets(query, **kwargs):
    today = date.today()

    params  = {
        'limit': 10
    }

    if 'limit' in kwargs:
        params['limit'] = kwargs['limit']

    # yesterday = (today - timedelta(days=1)).strftime('%Y-%m-%d')
    # tickers = ['AAPL', 'T', 'KO', 'GE', 'HAS', 'BAC', 'DAL', 'GME']

    api = tweepy.API(auth, wait_on_rate_limit=True)

    start_date = datetime(2021, 1, 1)
    end_date = datetime.today()
    dates = get_dates(start_date, end_date)

    tweet_data = []
    tweets = tweepy.Cursor(api.search, q=query,
                            lang="en",
                            tweet_mode='extended').items(int(params['limit']))

    for tweet in tweets:
        tweet_info = {}
        if 'retweeted_status' in tweet._json:
            tweet_info['text'] = tweet._json['retweeted_status']['full_text'].replace(
                '\n', ' ')
            print(tweet._json['retweeted_status']['full_text'])
        else:
            tweet_info['text'] = tweet.full_text.replace('\n', ' ')
            print(tweet.full_text)
        tweet_info['created_at'] = tweet.created_at
        tweet_info['favorites'] = tweet.favorite_count
        tweet_info['location'] = tweet.place
        tweet_data.append(tweet_info)

    return json.dumps(tweet_data, indent=4, sort_keys=True, default=str, ensure_ascii=False)

# def main():

#     today = date.today()
#     # yesterday = (today - timedelta(days=1)).strftime('%Y-%m-%d')
#     # tickers = ['AAPL', 'T', 'KO', 'GE', 'HAS', 'BAC', 'DAL', 'GME']

#     api = tweepy.API(auth, wait_on_rate_limit=True)

#     start_date = datetime(2021, 1, 1)
#     end_date = datetime.today()
#     dates = get_dates(start_date, end_date)

#     for i in range(len(dates) - 1):
#         tweet_data = []
#         # just look at apple right now.
#         query = '#Apple'
#         tweets = tweepy.Cursor(api.search, q=query,
#                                 lang="en", since=dates[i], until=dates[i+1], 
#                                 tweet_mode='extended').items(1)

#         for tweet in tweets:
#             tweet_info = {}
#             if 'retweeted_status' in tweet._json:
#                 tweet_info['text'] = tweet._json['retweeted_status']['full_text'].replace('\n', ' ')
#                 print(tweet._json['retweeted_status']['full_text'])
#             else:
#                 tweet_info['text'] = tweet.full_text.replace('\n', ' ')
#                 print(tweet.full_text)
#             tweet_info['created_at'] = tweet.created_at
#             tweet_info['favorites'] = tweet.favorite_count
#             tweet_info['location'] = tweet.place
#             tweet_data.append(tweet_info)
#             print(tweet.created_at)
#             print(tweet.favorite_count)
#             print(tweet.place)

#         save_to_csv('AAPL', tweet_data)

def get_dates(start_date, end_date):
    date_list = []
    delta = end_date - start_date
    for i in range(delta.days):
        a_date = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
        date_list.append(a_date)
    return date_list

# this does not need to happen everytime. 
def get_credentials():
    redirect_url = auth.get_authorization_url()
    # click on the url, get the pin and enter it in the terminal
    print(redirect_url)
    user_pin = input("Please enter in your pin ")

    token, secret = auth.get_access_token(user_pin)
    auth.set_access_token(token, secret)

def get_sp500_tickers():
    wiki_url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
    table = pd.read_html(wiki_url)
    df = table[0]
    df.to_csv('sp500.csv')

def save_to_csv(ticker, data):
    cols = ['text', 'created_at', 'favorites', 'location']
    filepath = './data/{}.csv'.format(ticker)
    write_type = 'w'
    if path.exists(filepath):
        write_type = 'a'
    with open(filepath, write_type) as f:
        writer = csv.DictWriter(f, fieldnames=cols)
        if write_type == 'w':
            writer.writeheader()
        for row in data:
            writer.writerow(row)
