// Get Quotes From API

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');

let currentQuote  = [];

// Show Loading Spinner 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading Spinner
function complete(params) {
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}


// Show New Quote
function newQuote() {
    loading();
    const quote = currentQuote;
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
 
    if (quote.quote.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.quote;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();

    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = 'DAHF9GqFyczhxaYKbzJXbw==zpNxK9RUbrIjscgP';
    
    const headers = {
        'X-Api-Key': apiKey,
    };

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
        
    // Check if data is an array and get the first item, or use the object directly
    currentQuote = Array.isArray(data) ? data[0] : data;
   
    
    newQuote();
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
