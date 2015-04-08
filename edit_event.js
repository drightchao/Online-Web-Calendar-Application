//edit_event.js
function edit_event(event) {
    var event_id = event.currentTarget.className;
    //var event_id = event_id_full.substr(4);
    var localString = "event_id=" + encodeURIComponent(event_id);
    var userinfo = document.getElementById("login_block").childNodes;
    var verfiyString = "&usertoken=" +encodeURIComponent(userinfo[1].className) + "&username_display=" + encodeURIComponent(userinfo[0].textContent);	 
    var dataString = localString + verfiyString;
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "getEvent_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event){
            var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
            // Write Dom
            var title = jsonData.title;
            var datestring = jsonData.date+"T"+jsonData.time;
            var event_date = new Date(datestring);
            var event_year = event_date.getFullYear();
            var event_month = event_date.getMonth()+1;
            var event_day = event_date.getDate();
            var event_date_string = event_year + "-" + event_month + "-" + event_day;
            var event_hours = event_date.getHours();
            var event_minutes = event_date.getMinutes();
            var event_seconds = event_date.getSeconds();
            var event_time_string = event_hours + ":" + event_minutes + ":" + event_seconds;
            var description = jsonData.description;
            var new_event_id = jsonData.event_id;
          
            var view_event_htmlObj = document.getElementById("view_event");
            delete_dom(view_event_htmlObj); // delete written event
            
            var title_label_htmlObj = document.createElement("label");
            title_label_htmlObj.appendChild(document.createTextNode("Title: "));
            var title_htmlObj = document.createElement("input");
            title_htmlObj.setAttribute("id", "event_title_id");
            title_htmlObj.value = title;
            title_label_htmlObj.appendChild(title_htmlObj);
            view_event_htmlObj.appendChild(title_label_htmlObj);
            view_event_htmlObj.appendChild(document.createElement("br"));
            
            var date_label_htmlObj = document.createElement("label");
            date_label_htmlObj.appendChild(document.createTextNode("Date: "));
            var date_htmlObj = document.createElement("input");
            date_htmlObj.setAttribute("id", "event_date_id");
            date_htmlObj.setAttribute("type", "date");
            date_htmlObj.value = jsonData.date;
            date_label_htmlObj.appendChild(date_htmlObj);
            view_event_htmlObj.appendChild(date_label_htmlObj);
            view_event_htmlObj.appendChild(document.createElement("br"));
            
            var time_label_htmlObj = document.createElement("label");
            time_label_htmlObj.appendChild(document.createTextNode("Time: "));
            var time_htmlObj = document.createElement("input");
            time_htmlObj.setAttribute("id", "event_time_id");
            time_htmlObj.setAttribute("type", "time");
            time_htmlObj.value = jsonData.time;
            time_label_htmlObj.appendChild(time_htmlObj);
            view_event_htmlObj.appendChild(time_label_htmlObj);
            view_event_htmlObj.appendChild(document.createElement("br"));
            
            var description_label_htmlObj = document.createElement("label");
            description_label_htmlObj.appendChild(document.createTextNode("Description: "));
            var description_htmlObj = document.createElement("textarea");
            description_htmlObj.setAttribute("id", "event_description_id");
            description_htmlObj.appendChild(document.createTextNode(description));
            description_label_htmlObj.appendChild(description_htmlObj);
            view_event_htmlObj.appendChild(description_label_htmlObj);
            
            var submit_btn_htmlObj = document.createElement("button");
            submit_btn_htmlObj.setAttribute("class", new_event_id);
            submit_btn_htmlObj.setAttribute("value", "submit");
            submit_btn_htmlObj.setAttribute("type", "button");
            submit_btn_htmlObj.appendChild(document.createTextNode("Submit"));
            submit_btn_htmlObj.addEventListener("click", updateEvent, false);
            view_event_htmlObj.appendChild(submit_btn_htmlObj);
            
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
}