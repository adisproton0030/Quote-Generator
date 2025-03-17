const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.a || "Unknown"; // Handle missing authors
    quoteText.textContent = quote.q || quote.content; // Support both APIs
    complete();
}

// Get quotes from API with CORS proxy
async function getQuotes() {
    loading();
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const zenQuotesUrl = "https://zenquotes.io/api/random";
    const quotableUrl = "https://api.quotable.io/random"; // Fallback API

    try {
        // Try fetching from ZenQuotes (with CORS proxy)
        const response = await fetch(proxyUrl + encodeURIComponent(zenQuotesUrl));
        const data = await response.json();
        apiQuotes = JSON.parse(data.contents); // Extract JSON
        newQuote();
    } catch (error) {
        console.warn("ZenQuotes failed, trying Quotable API...");
        try {
            // Fallback to Quotable API if ZenQuotes fails
            const response = await fetch(quotableUrl);
            const data = await response.json();
            apiQuotes = [data]; // Wrap in array for consistency
            newQuote();
        } catch (error) {
            console.error("Both APIs failed:", error);
        }
    }
}

// Tweet Quote
function tweetquote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetquote);

// On Load
getQuotes();

