import React, {useState} from 'react'
import './App.css';
import Header from './components/containers/Header';
import Body from './components/containers/Body';
import Footer from './components/containers/Footer';

function App() {
  const [tweets, setTweets] = useState([]);

  function getDaysBetween(to, from) {
    return (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
  }

  function getHoursBetween(to, from) {
    return (to.getTime() - from.getTime()) / (60 * 60 * 1000);
  }

  /*
   * This function works under the assumption that tweets are of the form:
   * {
   *  'sentiment': String,
   *  'time_stamp': Date
   * }
   *
   * and formats the tweets appropriately so they can be sent to a
   * StackedLineGraph for display.
   */
  function formatTweets(tweets) {
    const currentDate = new Date();
    const sentiments = ['positive', 'negative', 'neutral'];
    let counts = {
      positive: {},
      negative: {},
      neutral: {}
    };
    let data = [
      {
        'id': 'neutral',
        'data': []
      },
      {
        'id': 'negative',
        'data': []
      },
      {
        'id': 'placeholder1',
        'data': []
      },
      {
        'id': 'placeholder2',
        'data': []
      },
      {
        'id': 'positive',
        'data': []
      },
    ];

    for (const tweet of tweets) {
      const timeRange = Math.floor(getHoursBetween(currentDate, tweet['time_stamp'])) + 1;
      const sentiment = tweet['sentiment'];

      if (!counts[sentiment][timeRange]) {
        counts[sentiment][timeRange] = 0;
      }
      counts[sentiment][timeRange] += 1;
    }

    for (const sentiment in counts) {
      if (!counts[sentiment][0]) {
        counts[sentiment][0] = 0;
      }

      const index = sentiment === 'positive' ? 4
                  : sentiment === 'negative' ? 1
                  : 0;
      for (const timeRange in counts[sentiment]) {
        data[index]['data'].push({
          'x': timeRange,
          'y': counts[sentiment][timeRange]
        });
      }

      data[index]['data'].sort((a, b) => a['x'] - b['x']);
    }

    return data;
  }

  return (
    <div className="App">
      <Header updateTweets={setTweets} />
      <Body data={formatTweets(tweets)} />
      <Footer />
    </div>
  );
}

export default App;
