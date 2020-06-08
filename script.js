$(document).ready(function () {
  console.log("ready!");
  var now = moment().format("dddd, MMMM Do, YYYY");
  var time = moment().format("HH");
  console.log(time);
  $("#currentDay").append(now);
  var clearButton = $('<button type="button" class="btn btn-info""></button');
  clearButton.text("Clear schedule");
  $("#clearBtn").append(clearButton);

  clearButton.click(function () {
    localStorage.clear()
    clearSchedule();
  });

  var events = ["", "", "", "", "", "", "", ""];
  var container = $(".container");

  //pull events from local storage
  if (localStorage.getItem("events")) {
    events = JSON.parse(localStorage.getItem("events"));
  }

  for (var i = 0; i < 8; i++) {
    var style
    if (time == i + 9) {
      style = "present";
    } else if (time < i + 9) {
      style = "future";
    } else {
      style = "past";
    }
    var rowDiv = $('<div class="row hour"/>');
    var col1 = $('<div class="col-2 time-block"></div>');

    col1.text(convertTime(i + 9));

    var col2 = $('<div class="col-8"></div>');
    var textarea = $('<textarea class="form-control textarea" aria-label="With textarea"></textarea>');
    textarea.attr("id", i + "_textarea");
    textarea.val(events[i]);
    
    // textarea.click(function(e) { e.target.value = ''; }).
    textarea.addClass(style);
    col2.append(textarea);
    
    var col3 = $('<div class="col-2"></div>');
    var saveButton = $('<button type="button" class="saveBtn"></button');
    saveButton.text("Save");
    saveButton.attr("id", i);
    saveButton.click(function (event) {
      save(event);
    });
    col3.append(saveButton);
    container.append(rowDiv);
    rowDiv.append(col1, col2, col3);


  }


  function save(event) {
    var id = event.target.id;
    var text = $("#" + id + "_textarea").val();
    events[id] = text;
    console.log(events);
    localStorage.setItem("events", JSON.stringify(events));
  }

  function convertTime(hour) {
    if (hour > 12) {
      var milHour = hour - 12;
      return milHour + "pm";
    } else {
      return hour + "am";
    }
  }
  function clearSchedule(){
    for (var i = 0; i < 8; i++){
      $("#" + i + "_textarea").val(' ');
    }
    
  }
  
});
