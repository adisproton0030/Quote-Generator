const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Fetch a new quote every time
async function getQuotes() {
    loading();
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const zenQuotesUrl = "https://zenquotes.io/api/random";
    const quotableUrl = "https://api.quotable.io/random"; // Fallback API

    try {
        // Try fetching from ZenQuotes (with CORS proxy)
        const response = await fetch(proxyUrl + encodeURIComponent(zenQuotesUrl), { cache: "no-store" });
        const data = await response.json();
        const quoteData = JSON.parse(data.contents)[0]; // Extract first quote
        displayQuote(quoteData.q, quoteData.a);
    } catch (error) {
        console.warn("ZenQuotes failed, trying Quotable API...");
        try {
            // Fallback to Quotable API if ZenQuotes fails
            const response = await fetch(quotableUrl, { cache: "no-store" });
            const data = await response.json();
            displayQuote(data.content, data.author);
        } catch (error) {
            console.error("Both APIs failed:", error);
            quoteText.textContent = "Failed to load quote. Please try again!";
            authorText.textContent = "";
            complete();
        }
    }
}

// Display the quote in the UI
function displayQuote(quote, author) {
    quoteText.textContent = quote;
    authorText.textContent = author || "Unknown";
    complete();
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load, get a quote
getQuotes();



