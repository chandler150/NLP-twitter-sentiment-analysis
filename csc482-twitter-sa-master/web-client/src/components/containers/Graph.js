import React, {useState} from 'react'
import './Graph.css'
import StackedLineGraph from '../graphs/StackedLineGraph'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = ['Day', 'Week', 'Month'];

function Graph(props) {
  const [option, setOption] = useState(options[0]);

  const positiveTweets = getTweetCountsOfType(props.data, 'positive');
  const negativeTweets = getTweetCountsOfType(props.data, 'negative');
  const neutralTweets = getTweetCountsOfType(props.data, 'neutral');

  const totalTweets = positiveTweets + negativeTweets + neutralTweets;
  const netTweetsSentiment = positiveTweets - negativeTweets;

  async function handleSelect(event) {
    setOption(event.value);
  }

  function getTweetCountsOfType(data, type) {
    let count = 0;

    for (const tweets of data) {
      if (tweets.id.match(type)) {
        count += tweets.data.reduce((total, curr) => total + curr['y'], 0);
      }
    }

    return count;
  }

  return (
    <div className='GraphDiv'>
      <div className='GraphHeader'>
        <div className='TotalTweets'>
          <span>{totalTweets}</span>
          <span>Total Tweets</span>
        </div>
        <div className='PositiveTweets'>
          <span>{positiveTweets}</span>
          <span>Positive Tweets</span>
        </div>
        <div className='NeutralTweets'>
          <span>{neutralTweets}</span>
          <span>Neutral Tweets</span>
        </div>
        <div className='NegativeTweets'>
          <span>{negativeTweets}</span>
          <span>Negative Tweets</span>
        </div>
        <div className='NetTweetSentiment'>
          <span>{netTweetsSentiment}</span>
          <span>Net Tweet Sentiment</span>
        </div>
      </div>
      <div className='GraphBody'>
        <Dropdown className='DropDownMenu'
          options={options}
          onChange={handleSelect}
          value={option}
          placeholder="Select an option"/>
        <StackedLineGraph data={props.data} timeline={option}/>
      </div>
    </div>
  );
}

export default Graph;
