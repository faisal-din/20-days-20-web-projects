const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Show New Quote
function newQuote(data) {
  showLoadingSpinner();

  // Check if Author field is blank and replace it with 'Unknown'
  if (!data[0].author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = data[0].author;
  }

  if (data[0].quote.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //Set Quote, Hide Loader
  quoteText.textContent = data[0].quote;
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();

  const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
  const apiKey = 'DAHF9GqFyczhxaYKbzJXbw==zpNxK9RUbrIjscgP';
  const headers = {
    'X-Api-Key': apiKey,
  };

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    newQuote(data);
  } catch (error) {
    console.log('Whoops, error', error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
