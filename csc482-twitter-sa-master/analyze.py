from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import pandas as pd
from nltk.corpus import stopwords
import re
import string

# Preprocess text (username and link placeholders)
def preprocess(text):
   '''Goals to update model:
      -incorporate slang -> standardized english translation preprocessing
      -add bigram support to nullify not/non effects

      '''
   new_text = []

   pre_proc = text.split("\r\n")
   text = " ".join(pre_proc)
   #text = text.lower()

   pre_proc = text.split("...")
   text = " ".join(pre_proc) # or " ... "

   for t in text.split(" "):
      #print(t)
      """iteration 2
      t = '@user' if t.startswith('@') and len(t) > 1 else t
      t = 'http' if t.startswith('http') else t
      t = 'Hashtag' if t.startswith('#') else t
      t = 'ticker'  if t.startswith('$') else t"""
      """iteration 3"""
      if t.startswith('@'):
         t = "@user"
      if t.startswith('.@'):
         t = "@user"
      #if t in stopwords.words('english'):
      #   continue
      #if t.startswith("RT"):
      #   continue
      if t.startswith('http'):
         t = "http"
      if re.match(r'[$][A-Z]+', t):
          continue
      if t.startswith('#'):
         t = t[1:]
      if t.startswith('h8'):
         t = 'hate'
      #print(t)
      new_text.append(t)

   """table1 = str.maketrans('', '', string.punctuation)
   post_proc = new_text
   stripped = [w.translate(table1) for w in post_proc]

   new_text = " ".join(stripped)"""
   return " ".join(new_text)

# To do
def load_test_data():
   # load the data
   data = pd.read_csv("./Apple-Twitter-Sentiment-DFE.csv")
   # Drop the sentiment which are not relevant
   data = data[data.sentiment != "not_relevant"]

   return data

""" Predict tweets sentiment
Args:
   tweets: ([str]) : List of tweets
Returns:
   list: a list of strings representing the setiment of tweet
"""
def predict(tweets):
   sentiment = []
   labels=['negative', 'neutral', 'positive']

   # Model found from hugging face
   MODEL = "cardiffnlp/twitter-roberta-base-sentiment"

   # Load model and tokenizer
   tokenizer = AutoTokenizer.from_pretrained(MODEL)
   model = TFAutoModelForSequenceClassification.from_pretrained(MODEL)

   # Save the model in local directory, just need to run one time
   model.save_pretrained(MODEL)
   tokenizer.save_pretrained(MODEL)
   count = 0
   for tweet in tweets[0:200]:
      count += 1
      # print(count)
      #print(count, [tweet])
      tweet = preprocess(tweet)
      #print(count, [tweet])
      encoded_input = tokenizer(tweet, return_tensors='tf')
      output = model(encoded_input)
      scores = output[0][0].numpy()
      scores = softmax(scores)

      maxpos = scores.argmax()
      #print(maxpos)
      sentiment.append(labels[maxpos])

   # Detailed score for each sentiment
   # ranking = np.argsort(scores)
   # ranking = ranking[::-1]
   # for i in range(scores.shape[0]):
   #    l = labels[ranking[i]]
   #    s = scores[ranking[i]]
   #    print(f"{i+1}) {l} {np.round(float(s), 4)}")
   return sentiment

def intToLabel(x):
   if x == '5':
      return 'positive'
   elif x == '3':
      return 'neutral'
   else:
      return 'negative'

# Two list have same length
def accuracy(actual, expect):
   correct = 0
   total = len(actual)
   for i in range(total):
      if(actual[i] == expect[i]):
         correct += 1

   res = round(100 * correct/total , 2)
   return res

# Test the model with our apple file
# This take my computer forever to run
def test():
   # Use our apple dataset as test data
   data = load_test_data()
   tweets = list(data["text"])
   raw_labels = list(data["sentiment"])
   expect = (list(map(intToLabel, raw_labels)))
   actual = predict(tweets)
   res = accuracy(actual, expect)
   print(f'{res}%')


def main():
   tweets = ['love', 'hate', 'hello']
   res = predict(tweets)
   acc= test()
   print(f'{acc}%')
   print(res)


if __name__ == "__main__":
   main()





