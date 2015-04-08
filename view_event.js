// view_event.js
function view_event(event) {
    var event_id = event.currentTarget.id;
    var localString = "event_id=" + encodeURIComponent(event_id);
    var userinfo = document.getElementById("login_block").childNodes;
    var verfiyString = "&usertoken=" +encodeURIComponent(userinfo[1].className) + "&username_display=" + encodeURIComponent(userinfo[0].textContent);	 
    var dataString = localString + verfiyString;
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "getEvent_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", viewEventCallBack, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
}

function viewEventCallBack(event){
            var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
            if (jsonData.success) {

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
                
                var title_htmlObj = document.createElement("h2");
                title_htmlObj.setAttribute("id", "event_title_id");
                title_htmlObj.appendChild(document.createTextNode(title));
                view_event_htmlObj.appendChild(title_htmlObj);
                
                var date_htmlObj = document.createElement("p");
                date_htmlObj.setAttribute("id", "event_date_id");
                var date_label_htmlObj = document.createElement("label");
                date_label_htmlObj.appendChild(document.createTextNode("Date: "));
                date_htmlObj.appendChild(date_label_htmlObj);
                date_htmlObj.appendChild(document.createTextNode(jsonData.date));
                view_event_htmlObj.appendChild(date_htmlObj);
                
                var time_htmlObj = document.createElement("p");
                time_htmlObj.setAttribute("id", "event_time_id");
                var time_label_htmlObj = document.createElement("label");
                time_label_htmlObj.appendChild(document.createTextNode("Time: "));
                time_htmlObj.appendChild(time_label_htmlObj);
                time_htmlObj.appendChild(document.createTextNode(jsonData.time));
                view_event_htmlObj.appendChild(time_htmlObj);
                
                var description_htmlObj = document.createElement("p");
                description_htmlObj.setAttribute("id", "event_description_id");
                var description_label_htmlObj = document.createElement("label");
                description_label_htmlObj.appendChild(document.createTextNode("Description: "));
                description_htmlObj.appendChild(description_label_htmlObj);
                description_htmlObj.appendChild(document.createTextNode(description));
                view_event_htmlObj.appendChild(description_htmlObj);
                
                var edit_btn_htmlObj = document.createElement("button");
                edit_btn_htmlObj.setAttribute("value", "edit");
                edit_btn_htmlObj.setAttribute("class", new_event_id);
                edit_btn_htmlObj.setAttribute("type", "button");
               // edit_btn_htmlObj.setAttribute("id", "edit");
                edit_btn_htmlObj.appendChild(document.createTextNode("Edit"));
                edit_btn_htmlObj.addEventListener("click", edit_event, false);
                view_event_htmlObj.appendChild(edit_btn_htmlObj);
                view_event_htmlObj.appendChild(document.createElement("p"))
                
                var delete_btn_htmlObj = document.createElement("button");
                delete_btn_htmlObj.setAttribute("value", "delete");
                delete_btn_htmlObj.setAttribute("class", new_event_id);
                delete_btn_htmlObj.setAttribute("type", "button");
                //delete_btn_htmlObj.setAttribute("id", "delete"+new_event_id);
                delete_btn_htmlObj.addEventListener("click", delete_event, false);
                delete_btn_htmlObj.appendChild(document.createTextNode("Delete"));
                view_event_htmlObj.appendChild(delete_btn_htmlObj);
            }else{
                alert("Sorry, you can't view this event.  "+jsonData.message);
            }
            
    }