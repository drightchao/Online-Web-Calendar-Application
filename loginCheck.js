function loginCheck(){
	var xmlHttp = new XMLHttpRequest();
	var lcJsonData = null;
	xmlHttp.open("GET", "login_check_ajax.php", true);
	xmlHttp.addEventListener("load", function(event){
		lcJsonData = JSON.parse(event.target.resopnseText)}, false);
	xmlHttp.send(null);

	return lcJsonData;
}

function updateUserInfo(){
	var lcJsonData = loginCheck();
	var login_block_pointer = document.getElementById("login_block");
	if(lcJsonData.success){
		delete_dom(login_block_pointer);
		var user_display = document.createElement("p");
		user_display.setAttribute("id", "username_display");
		user_display.appendChild(document.createTextNode(lcJsonData.username));	
		login_block_pointer.appendChild(user_display);
	}	

}

