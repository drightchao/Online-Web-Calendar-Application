// ajax.js
 
function loginAjax(event){
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);	 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been Logged In!");
			var login_block_pointer = document.getElementById("login_block");
			delete_dom(login_block_pointer);
			var user_display = document.createElement("p");
			user_display.setAttribute("id", "username_display");
			var user_token = document.createElement("p");
			user_token.setAttribute("type", "hidden");
			user_token.setAttribute("class", jsonData.token);
			var logout_btn = document.createElement('input');
			logout_btn.setAttribute("type", "button");
			logout_btn.setAttribute("value", "Log Out");
			logout_btn.setAttribute("id", "logout_btn");
			logout_btn.addEventListener("click", logoutAjax, false);
			user_display.appendChild(document.createTextNode(username));
			login_block_pointer.appendChild(user_display);
			login_block_pointer.appendChild(user_token);
			login_block_pointer.appendChild(logout_btn);
			updateEvents();
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
document.getElementById("login_btn").addEventListener("click", loginAjax, false);

function registerAjax(event){
	var reg_diag = document.getElementById("regDial");
	var username = document.getElementById("new_username").value;
	var password = document.getElementById("new_pass").value;

	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);	 
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "register_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've successfully registered and been Logged In!");
			var login_block_pointer = document.getElementById("login_block");
			delete_dom(login_block_pointer);
			var user_display = document.createElement("p");
			user_display.setAttribute("id", "username_display");
			var user_token = document.createElement("p");
			user_token.setAttribute("type", "hidden");
			user_token.setAttribute("class", jsonData.token);
			var logout_btn = document.createElement('input');
			logout_btn.setAttribute("type", "button");
			logout_btn.setAttribute("value", "Log Out");
			logout_btn.setAttribute("id", "logout_btn");
			logout_btn.addEventListener("click", logoutAjax, false);
			user_display.appendChild(document.createTextNode(username));
			login_block_pointer.appendChild(user_display);
			login_block_pointer.appendChild(user_token);
			login_block_pointer.appendChild(logout_btn);
		}else{
			alert("Register Failed.  "+jsonData.message);
		}
		closeregdialog();
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

document.getElementById("register_btn").addEventListener("click", registerAjax, false);

function logoutAjax(event){
	var login_block_pointer = document.getElementById("login_block");
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "logout_ajax.php", true);
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been Logged Out!");
			delete_dom(login_block_pointer);
			login_block_pointer.innerHTML = "<input type=\"text\" id=\"username\" placeholder=\"Username\" /><input type=\"password\" id=\"password\" placeholder=\"Password\" /><input type=\"button\" value=\"Login\" id=\"login_btn\" onclick=loginAjax() /><input type=\"button\" value=\"Register\" onclick=showregdialog() />"
			delete_dom(document.getElementById("view_event"));
			updateEvents();
		}else{
			alert("Logout Failed.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(null); // Send the data
}
