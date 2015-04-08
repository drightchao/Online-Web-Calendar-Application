//update_event.js
function updateEvent(event) {
    var event_id = event.currentTarget.className;
   // var event_id = event_id_full.substr(6);
    var new_title = document.getElementById("event_title_id").value;
    var new_date = document.getElementById("event_date_id").value;
    var new_time = document.getElementById("event_time_id").value;
    var new_description = document.getElementById("event_description_id").value;
    if (new_title == "" || new_date == "" || new_time == "") {
	alert("Event title, date or time can't be empty!");
    }else{
        var localString = "new_title=" + encodeURIComponent(new_title) + "&new_date=" + encodeURIComponent(new_date) + "&new_time=" + encodeURIComponent(new_time) + "&new_description=" + encodeURIComponent(new_description) + "&event_id=" + encodeURIComponent(event_id);	 
        var userinfo = document.getElementById("login_block").childNodes;
        var verfiyString = "&usertoken=" +encodeURIComponent(userinfo[1].className) + "&username_display=" + encodeURIComponent(userinfo[0].textContent);	 
        var dataString = localString + verfiyString;
        
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "write_Edited_Event_ajax.php", true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
            xmlHttp.addEventListener("load", function(event){
                    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
                    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
                            alert("You've successfully edited this event!");
                            delete_dom(document.getElementById("view_event"));
                            updateEvents();
                    }else{
                            alert("Error! "+jsonData.message);
                    }
            }, false); // Bind the callback to the load event
            xmlHttp.send(dataString); // Send the data
    }
}