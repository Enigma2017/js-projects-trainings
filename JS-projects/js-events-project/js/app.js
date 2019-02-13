//Instantiate both class
const eventbrite = new EventBrite();
const ui = new UI();

//Listener for the submit button
document.getElementById('submitBtn').addEventListener('click', (e) => {
	e.preventDefault();

	//get values from the form
	const eventName = document.getElementById('event-name').value;
	const category = document.getElementById('category').value;

	//console.log(eventName + ':' + category);

	if(eventName !== ''){
		//query event Brite API
		eventbrite.queryAPI(eventName, category)
			.then(events => {
				//check for events
				const eventsList = events.events.events;
				if(eventsList.length > 0){
					//print the events
					ui.displayEvents(eventsList);
				} else{
					//there are no events, print a message
					ui.printMessage('No results', 'text-center alert alert-danger');
				}
			})

	} else{
		//print a message
		ui.printMessage('Add an event or a city', 'text-center alert alert-danger');
	}
})