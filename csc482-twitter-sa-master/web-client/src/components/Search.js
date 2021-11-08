import React, {useState} from 'react'

function Search(props) {
  const [query, setQuery] = useState('');

  async function handleChange(event) {
    setQuery(event.target.value);
  }

  async function executeSearch() {
    props.updateTweets(generateRandomTweets());
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function generateRandomTweets() {
    const dateOffset = (24 * 60 * 60 * 1000) * 1;
    const maxDate = new Date();
    const minDate = new Date(maxDate.getTime() - dateOffset);
    const sentiments = ['positive', 'negative', 'neutral'];
    let tweets = [];

    for (let i = 0; i < 100; i++) {
      const sentiment = getRandomInt(3);
      const date = getRandomDate(minDate, maxDate);
      tweets.push({
        'sentiment': sentiments[sentiment],
        'time_stamp': date
      });
    }

    return tweets;
  }

  return (
    <form className="Search">
      <input className="SearchTextBox"
        type="text"
        placeholder="Search HashTags"
        value={query}
        onChange={handleChange} />
      <input className="SearchButton"
        type="button"
        value="Get Tweets"
        onClick={executeSearch} />
    </form>
  );
}

export default Search;
