const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quotes
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    //Check if Author is blank and replace it with
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-qoute');
    }
    // Set Quote, Hide Loader 
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();