const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader =document.getElementById("loader");

let apiQuotes= [];

function loading() {
    loader.hidden= false;
    quoteContainer.hidden=true;
}

function complete(){
    quoteContainer.hidden= false;
    loader.hidden=true;

}
// Show new quote
function newQuote() {
    loading();
    // Pick a random  quote apiQuotes aaray
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent=quote.author;
    quoteText.textContent=quote.text;
    complete();
}

// Get quotes from API 
async function getQuotes() {
    loading();
    const apiUrl =" https://type.fit/api/quotes";
    try {
const response = await fetch(apiUrl);
apiQuotes = await response.json();
   newQuote();
    } catch (error) {

    }
    
}

// Tweet Quote
function tweetquote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event listener
newQuoteBtn.addEventListener("click" , newQuote);
twitterBtn.addEventListener("click" , tweetquote);

// ON LOAD
getQuotes();