//variables
const tweetList = document.getElementById('tweet-list');


//Event Listeners
eventListeners();

function eventListeners(){
	//form submission
	document.querySelector('#form').addEventListener('submit', newTweet);

	//remove tweet from the list
	tweetList.addEventListener('click', removeTweet);

	// Document
     document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//Functions

function newTweet(e){
	e.preventDefault();

	//read textarea value
	const tweet = document.getElementById('tweet').value;

	//create the remove button
	const removeBtn = document.createElement('a');
	removeBtn.classList = 'remove-tweet';
	removeBtn.textContent = 'x';

	//create <li> element
	const li = document.createElement('li');
	li.textContent = tweet;

	//add the remove button to each tweet
	li.appendChild(removeBtn);

	//add to the list
	tweetList.appendChild(li);

	//add to the local storage
	addTweetLocalStorage(tweet);

	this.reset();
}


//remove tweet from the DOM
function removeTweet(e){
	if (e.target.classList.contains('remove-tweet')) {
		e.target.parentElement.remove();
	}

	//remove from Storage
      removeTweetLocalStorage(e.target.parentElement.textContent);
}

//add the tweets into the local storage
function addTweetLocalStorage(tweet){
	let tweets = getTweetsFromStorage();

	//add the tweet into the array
	tweets.push(tweet);

	//convert tweet array into the string
	localStorage.setItem('tweets', JSON.stringify(tweets));

}

function getTweetsFromStorage(){
	let tweets;
	const tweetLS = localStorage.getItem('tweets');
	//get the values, if null is returned, then we create an empty array

	if (tweetLS === null) {
		tweets = [];
	} else{
		tweets = JSON.parse(tweetLS);
	}
	return tweets;
}

// Prints Local Storage Tweets on Load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // Loop throught storage and then print the values
    tweets.forEach(function(tweet) {
        // Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // Create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet; 
          
        // Add the remove button to each tweet
        li.appendChild(removeBtn);

        // Add to the list
        tweetList.appendChild(li);
    });
}

// Removes the tweet from local storage

function removeTweetLocalStorage(tweet) {
    // get tweets from storage
    let tweets = getTweetsFromStorage();

    // Remove the X from the tweet

    const tweetDelete = tweet.substring( 0, tweet.length -1 );

    // Loop Throught  the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    //save the data 
    localStorage.setItem('tweets', JSON.stringify(tweets));
}