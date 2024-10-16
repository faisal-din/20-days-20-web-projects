// Get Quotes From API

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');

let currentQuote  = [];

// Show New Quote
function newQuote() {
    const quote = currentQuote

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
    quoteText.textContent = quote.quote;
}

// Get Quotes From API
async function getQuotes() {
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
