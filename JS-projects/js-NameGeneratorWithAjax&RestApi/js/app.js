document.querySelector('#generate-names').addEventListener('submit', loadNames);


//Execute the function to query the API
function loadNames(e){
	e.preventDefault();

	//read the values from the form and create the variables
	const origin = document.getElementById('country').value;
	const gender = document.getElementById('gender').value;
	const amount = document.getElementById('quantity').value;

	// Build the URL
     let url = 'http://uinames.com/api/?';

    // Read the origin and append to the url
    if(origin !== ''){
          url += `region=${origin}&`;
    }

    // Read the gender and append to the url
    if(gender !== ''){
          url += `gender=${gender}&`;
    }

    // Read the amount and append to the url
    if(amount !== ''){
          url += `amount=${amount}&`;
    }

    //Ajax call
    const xhr = new XMLHttpRequest();

    //open the connection
    xhr.open('GET', url, true);

    //execute the function
    xhr.onload = function(){
    	if (this.status ===200) {
    		const names = JSON.parse(this.responseText);

    		//insert into the HTML
    		let html = '<h2>Generated Names</h2>';
    		html += '<ul class="list">';
    		names.forEach(function(name){
    			html += `
    				<li>${name.name}</li>
    			`;
    		});
    		html +='</ul>';

    		document.querySelector('#result').innerHTML = html;
    	}
    }
    //send the request
    xhr.send();
}