// delete_event.js
function delete_event(event) {
    var event_id = event.currentTarget.className;
    var localString = "event_id=" + encodeURIComponent(event_id);
    var userinfo = document.getElementById("login_block").childNodes;
    var verfiyString = "&usertoken=" +encodeURIComponent(userinfo[1].className) + "&username_display=" + encodeURIComponent(userinfo[0].textContent);	 
    var dataString = localString + verfiyString;
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "delete_event_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", deleteEventCallBack, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
}

function deleteEventCallBack(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) {
        updateEvents();
        delete_dom(document.getElementById("view_event"));
        alert("You have deleted the event successfully.");
    }else{
        alert("Sorry, you can't delete this event!"+jsonData.message);
    }
}