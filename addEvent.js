//aadEvent.js
function addEvent(event) {
    var userinfo = document.getElementById("login_block").childNodes;
    //var username_display = userinfo[0].textContent;
    //check log in
    if (userinfo[0].tagName == "P"){ 
        // Write Dom
        var view_event_htmlObj = document.getElementById("view_event");
        delete_dom(view_event_htmlObj); // delete written event
        
        var title_htmlObj = document.createElement("input");
        title_htmlObj.setAttribute("id", "event_title_id");
        title_htmlObj.setAttribute("type", "text");
        //title_htmlObj.setAttribute("placeholder", "title");
        title_htmlObj.setAttribute("value", "title")
        view_event_htmlObj.appendChild(title_htmlObj);
        view_event_htmlObj.appendChild(document.createElement("br"));
        
        var date_label_htmlObj = document.createElement("label");
        date_label_htmlObj.appendChild(document.createTextNode("Date: "));
        var date_htmlObj = document.createElement("input");
        date_htmlObj.setAttribute("id", "event_date_id");
        date_htmlObj.setAttribute("type", "date");
        date_htmlObj.setAttribute("value", "");
        date_label_htmlObj.appendChild(date_htmlObj);
        view_event_htmlObj.appendChild(date_label_htmlObj);
        
        var time_label_htmlObj = document.createElement("label");
        time_label_htmlObj.appendChild(document.createTextNode("Time: "));
        var time_htmlObj = document.createElement("input");
        time_htmlObj.setAttribute("id", "event_time_id");
        time_htmlObj.setAttribute("type", "time");
        time_htmlObj.setAttribute("value", "");
        time_label_htmlObj.appendChild(time_htmlObj);
        view_event_htmlObj.appendChild(time_label_htmlObj);
        
        var description_label_htmlObj = document.createElement("label");
        description_label_htmlObj.appendChild(document.createTextNode("Description: "));
        var description_htmlObj = document.createElement("textarea");
        description_htmlObj.setAttribute("id", "event_description_id");
        description_htmlObj.setAttribute("type", "text");
        description_htmlObj.setAttribute("value", "");
        description_label_htmlObj.appendChild(description_htmlObj);
        view_event_htmlObj.appendChild(description_label_htmlObj);
        view_event_htmlObj.appendChild(document.createElement("br"));
    
        var submit_btn_htmlObj = document.createElement("button");
        submit_btn_htmlObj.setAttribute("id", "addNewEvent");
        submit_btn_htmlObj.setAttribute("type", "button")
        //submit_btn_htmlObj.setAttribute("value", "add");
        submit_btn_htmlObj.appendChild(document.createTextNode("Add"));
        submit_btn_htmlObj.addEventListener("click", writeEventToDatabase, false);
        view_event_htmlObj.appendChild(submit_btn_htmlObj);
    }else{
        alert("Please log in or register a user to add events!")
    }
}