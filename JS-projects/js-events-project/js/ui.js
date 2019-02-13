class UI{
	constructor(){
		//App inicialization
	    this.init();
	}
	//method when the app starts
	init(){
		//display categories in <select>
		this.printCategories();

		//select the results
		this.resullt = document.getElementById('result');
	}

	//display events from the API
	displayEvents(events){
		//build the template
		let HTMLTemplate = '';

          // Loop events and print the result

          events.forEach(eventInfo => {
               HTMLTemplate += `
                    <div class="col-md-4">
                         <div class="card">
                              <div class="card-body">
                                   <img class="img-fluid" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}"> 
                              </div>
                              <div class="card-body">
                                   <div class="card-text">
                                        <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                                        <p class="lead text-info">Event Information:</p>
                                        <p>${eventInfo.description.text.substring(0,200)}...</p>
                                        <span class="badge badge-primary">Capacity: ${eventInfo.capacity}</span>
                                        <span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>

                                        <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block">Get Tickets</a>
                                   </div>
                              </div>
                         </div>
                    </div>
               `;
          });

          this.result.innerHTML = HTMLTemplate;
	}

	//print the categories
	printCategories(){
		const categoriesList = eventbrite.getCategoriesAPI()
			.then(categories => {
				const categoriesList = categories.categories.categories;
				const categoriesSelect = document.querySelector('#category');

				// Inserts categories into select
				categoriesList.forEach(category => {
					//create the options
					const option = document.createElement('option');
					option.value = category.id;
					option.appendChild(document.createTextNode(category.name));
					categoriesSelect.appendChild(option);
				})
			})

		.catch(error => console.log(error));
	}

	//display a message
	printMessage(message, className){
		//create a div
		const div = document.createElement('div');
		div.className = className;
		//add the text
		div.appendChild(document.createTextNode(message));

		//insert into the HTML
		const searchDiv = document.querySelector('#search-events');
		searchDiv.appendChild(div);

		//remove the alert after 3 seconds
		setTimeout(() => {
			this.removeMessage();
		}, 3000);
	}
	//remove the message
	removeMessage(){
		const alert = document.querySelector('.alert');
		if(alert){
			alert.remove();
		}
	}
}
