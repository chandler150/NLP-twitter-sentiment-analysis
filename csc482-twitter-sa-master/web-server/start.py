from flask import Flask, request
from tweets import retrieve_tweets
app = Flask(__name__)


@app.route('/tweets', methods=['GET'])
def get_tweets():
    query = request.args.get('query')
    limit = request.args.get('limit')
    tweets = retrieve_tweets(query, limit=limit)
    return tweets


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
