var room;

function enableButtons() {
  $("#post").prop('disabled', true);
  $("#put").prop('disabled', false);
  $("#delete").prop('disabled', false);
  $("#get").prop('disabled', false);  
}

function disableButtons() {
  $("#post").prop('disabled', false);
  $("#put").prop('disabled', true);
  $("#delete").prop('disabled', true);
  $("#get").prop('disabled', true);  
}

function addChangeNameEvent() {
  $(".roomName").unbind("dblclick");
  $(".roomName").on("dblclick", function() {
    var roomNameContainer = $(this);
    var currentName = $(this).html();
    var roomId = $(this).attr('roomId');
    $(this).html("<input type='text' id='text" + roomId + "' value='"+ currentName +"'>");
    $('#text' + roomId).focus();

    $('#text' + roomId).on("blur", function() {
        var newRoom = new api.model.room(roomId, $('#text' + roomId).val() , "{}");

        api.room.modify(newRoom)
          .done((data, textStatus, jqXHR) => {
            roomNameContainer.html($('#text' + roomId).val());
            $("#changeNameButton" + roomId).prop('disabled', false);
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            //Tirar mensaje de error
            roomNameContainer.html(currentName);
            $("#changeNameButton" + roomId).prop('disabled', false);
          })
    });
  });

  $(".changeNameButton").unbind("click");
  $(".changeNameButton").on("click", function() {
    $("#roomName" + $(this).attr('roomId')).trigger("dblclick");
    $(this).prop('disabled', true);
  });
}


function addDeleteEvent() {
  $(".delete").unbind("click");
  $(".delete").on("click", function() {
    api.room.delete($(this).attr('roomId'))
      .done((data, textStatus, jqXHR) => {
        location.reload();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
  });
}

function getRooms() {
  api.room.getAllRooms()
      .done((data, textStatus, jqXHR) => {
        for(var i = 0; i < data.rooms.length; i++) {
          var roomName = JSON.stringify(data.rooms[i].name, null, 2);
          roomName = roomName.substring(1,roomName.length-1);
          var roomId = JSON.stringify(data.rooms[i].id, null, 2);
          roomId = roomId.substring(1,roomId.length-1);
          $(".rooms").append("<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                              "<div class='room'>"+ 
                                "<p class='roomName' id='roomName"+ roomId +"' roomId='" + roomId + "'>" +
                                    roomName +
                                "</p>"+
                              "</div>"+
                              "<input type='button' class='changeNameButton' id='changeNameButton"+ roomId +"' roomId='" + roomId + "' value='Change' />"+
                              "<input type='button' class='delete' roomId='" + roomId + "' value='Delete' />"+
                            "</div>");
        }

        addDeleteEvent();
        addChangeNameEvent();
        /*
        $(".changeName").unbind("click");
        $(".changeName").on("click", function() {
          var newRoom = new api.model.room(null, $("#newRoom").val(), "{}");
          api.room.delete($(this).attr('roomId'))
            .done((data, textStatus, jqXHR) => {
              location.reload();
            })
            .fail((jqXHR, textStatus, errorThrown) => {
              //Tirar mensaje de error
            })
        });*/

      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
}


$(document).ready(function() {
  getRooms();

  $("#addRoom").on("click", function() {
    room = new api.model.room(null, $("#newRoom").val(), "{}");

    api.room.add(room)
      .done((data, textStatus, jqXHR) => {
        room.id = data.room.id;
        location.reload();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
  });

  
  /*$("#post").on("click", function() {
    var index = Math.floor(Math.random() * (999 - 1) + 1)
    room = new api.model.room(null, "kitchen " + index, "{ size: \"9m2\" }");

    api.room.add(room)
      .done((data, textStatus, jqXHR) => {
        room.id = data.room.id;
        $("#result").val(JSON.stringify(data, null, 2));
        enableButtons();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $("#result").val("Request failed: " + jqXHR.responseText);
      })
  });

  $("#put").on("click", function() {
    room.meta = "{ size: \"6m2\" }";

    api.room.modify(room)
      .done((data, textStatus, jqXHR) => {
        $("#result").val(JSON.stringify(data, null, 2));
        enableButtons();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $("#result").val("Request failed: " + jqXHR.responseText);
      })
  });

  $("#delete").on("click", function() {
    api.room.delete(room.id)
      .done((data, textStatus, jqXHR) => {
        $("#result").val(JSON.stringify(data, null, 2));
        disableButtons();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $("#result").val("Request failed: " + jqXHR.responseText);
      })
  });

  $("#get").on("click", function() {
    api.room.get(room.id)
      .done((data, textStatus, jqXHR) => {
        $("#result").val(JSON.stringify(data, null, 2));
        enableButtons();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $("#result").val("Request failed: " + jqXHR.responseText);
      })
  });*/


});
 
