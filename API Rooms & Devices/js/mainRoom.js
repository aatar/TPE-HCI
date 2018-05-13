var roomId = "207e195d7f5e6522";
var roomName;
var device;

function getRoomName() {
  api.room.get(roomId)
      .done((data, textStatus, jqXHR) => {
        roomName = JSON.stringify(data.room.name, null, 2);
        roomName = roomName.substring(1,roomName.length-1);
        $("#roomName").append(roomName);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Mostrar mensaje de error
      })
}

function getDevices() {
  api.roomDevice.getAllDevices(roomId)
      .done((data, textStatus, jqXHR) => {
        for(var i = 0; i < data.devices.length; i++) {

          var deviceName = JSON.stringify(data.devices[i].name, null, 2);
          deviceName = deviceName.substring(1,deviceName.length-1);

          var deviceId = JSON.stringify(data.devices[i].id, null, 2);
          deviceId = deviceId.substring(1,deviceId.length-1);

          var typeId = JSON.stringify(data.devices[i].typeId, null, 2);
          typeId = typeId.substring(1,typeId.length-1);

          switch(typeId) {
                    case "im77xxyulpegfmv8":
                      showOven(deviceName, deviceId);
                    break;
                    case "lsf78ly0eqrjbz91":
                      showDoor(deviceName, deviceId);
                    break;
                    case "li6cbv5sdlatti0j":
                      showAc(deviceName, deviceId);
                    break;
                    case "go46xmbqeomjrsjr":
                      showLamp(deviceName, deviceId);
                    break;
                    case "rnizejqr2di0okho":
                      showRefrigerator(deviceName, deviceId);
                    break;
                    case "eu0v2xgprrhhg41g":
                      showBlind(deviceName, deviceId);
                    break;

            }

        }

      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
}

function addChangeNameEvent() {
  $(".deviceName").unbind("dblclick");
  $(".deviceName").on("dblclick", function() {
    var deviceNameContainer = $(this);
    var currentName = $(this).html();
    var deviceId = $(this).attr('deviceId');
    $(this).html("<input type='text' id='text" + deviceId + "' value='"+ currentName +"'>");
    $('#text' + deviceId).focus();

    $('#text' + deviceId).on("blur", function() {
        var typeId = deviceNameContainer.attr('typeId');
        var newDevice = new api.model.device(deviceId, typeId, $('#text' + deviceId).val() , "{}");

        api.device.modify(newDevice)
          .done((data, textStatus, jqXHR) => {
            deviceNameContainer.html($('#text' + deviceId).val());
            $("#changeNameButton" + deviceId).prop('disabled', false);
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            //Tirar mensaje de error
            deviceNameContainer.html(currentName);
            $("#changeNameButton" + deviceId).prop('disabled', false);
          })
    });
  });

  $(".changeNameButton").unbind("click");
  $(".changeNameButton").on("click", function() {
    $("#deviceName" + $(this).attr('deviceId')).trigger("dblclick");
    $(this).prop('disabled', true);
  });
}


function addDeleteEvent() {
  $(".delete").unbind("click");
  $(".delete").on("click", function() {
    api.device.delete($(this).attr('deviceId'))
      .done((data, textStatus, jqXHR) => {
        location.reload();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
  });
}

function addStatusEvent() {
  $(".status").unbind("click");
  $(".status").on("click", function() {
    switch($(this).attr('deviceType')) {
      case "oven": case "ac": case "lamp":
        if($(this).val() == "off")
          turnOn($(this).attr('deviceId'));
        else
          turnOff($(this).attr('deviceId'));
      break;
      case "door":
        if($(this).val() == "closed")
          open($(this).attr('deviceId'));
        else
          close($(this).attr('deviceId'));
      break;
      case "blind":
        if($(this).val() == "opened")
          down($(this).attr('deviceId'));
        else
          up($(this).attr('deviceId'));
      break;
    }
    
    
  });
}

function addPlusEvent() {
  $(".plus").unbind("click");
  $(".plus").on("click", function() {
    var temperature = $('#temperature' + $(this).attr('deviceId')).html();
    api.device.setTemperature($(this).attr('deviceId'), Number(temperature) + 1)
      .done((data, textStatus, jqXHR) => {
        $('#temperature' + $(this).attr('deviceId')).html(Number(temperature) + 1);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
    
  });
}

function addMinusEvent() {
  $(".minus").unbind("click");
  $(".minus").on("click", function() {
    var temperature = $('#temperature' + $(this).attr('deviceId')).html();
    api.device.setTemperature($(this).attr('deviceId'), Number(temperature) - 1)
      .done((data, textStatus, jqXHR) => {
        $('#temperature' + $(this).attr('deviceId')).html(Number(temperature) - 1);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
    
  });
}

function turnOn(id) {
  api.device.turnOn(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("on");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function turnOff(id) {
  api.device.turnOff(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("off");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function open(id) {
  api.device.open(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("opened");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function close(id) {
  api.device.close(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("closed");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function up(id) {
  api.device.up(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("opened");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function down(id) {
  api.device.down(id)
    .done((data, textStatus, jqXHR) => {
      $('#status' + id).val("closed");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function showOven(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var status = JSON.stringify(data.result.status, null, 2);
        status = status.substring(1,status.length-1);

        var temperature = JSON.stringify(data.result.temperature, null, 2);
        
        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='im77xxyulpegfmv8' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Status: " + "<input type='button' class='status' id='status"+ deviceId +"' deviceType='oven' deviceId='" + deviceId + "' value='"+ status +"' />" + "</p>"+
                                  "<p>Temperature: <span id='temperature"+ deviceId +"'>"+ temperature + "</span><input type='button' class='plus' deviceId='" + deviceId + "' value='+'/><input type='button' class='minus' deviceId='" + deviceId + "' value='-'/>" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addStatusEvent();
        addPlusEvent();
        addMinusEvent();

    })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
  
}

function showDoor(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var status = JSON.stringify(data.result.status, null, 2);
        status = status.substring(1,status.length-1);

        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='lsf78ly0eqrjbz91' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Status: " + "<input type='button' class='status' id='status"+ deviceId +"' deviceType='door' deviceId='" + deviceId + "' value='"+ status +"' />" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addStatusEvent();

     })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function showAc(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var status = JSON.stringify(data.result.status, null, 2);
        status = status.substring(1,status.length-1);

        var temperature = JSON.stringify(data.result.temperature, null, 2);
        
        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='li6cbv5sdlatti0j' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Status: " + "<input type='button' class='status' id='status"+ deviceId +"' deviceType='ac' deviceId='" + deviceId + "' value='"+ status +"' />" + "</p>"+
                                  "<p>Temperature: <span id='temperature"+ deviceId +"'>"+ temperature + "</span><input type='button' class='plus' deviceId='" + deviceId + "' value='+'/><input type='button' class='minus' deviceId='" + deviceId + "' value='-'/>" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addStatusEvent();
        addPlusEvent();
        addMinusEvent();

     })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function showLamp(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var status = JSON.stringify(data.result.status, null, 2);
        status = status.substring(1,status.length-1);

        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='go46xmbqeomjrsjr' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Status: " + "<input type='button' class='status' id='status"+ deviceId +"' deviceType='lamp' deviceId='" + deviceId + "' value='"+ status +"' />" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addStatusEvent();
     })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function showRefrigerator(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var temperature = JSON.stringify(data.result.temperature, null, 2);
        
        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='rnizejqr2di0okho' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Temperature: <span id='temperature"+ deviceId +"'>"+ temperature + "</span><input type='button' class='plus' deviceId='" + deviceId + "' value='+'/><input type='button' class='minus' deviceId='" + deviceId + "' value='-'/>" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addPlusEvent();
        addMinusEvent();
     })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

function showBlind(deviceName, deviceId) {
  api.device.getState(deviceId)
    .done((data, textStatus, jqXHR) => {

        var status = JSON.stringify(data.result.status, null, 2);
        status = status.substring(1,status.length-1);

        if(status == "opening") status="opened";
        if(status == "closing") status="closed";

        var objectToAppend = "<div class='col-4' style='margin-top:30px;' class='myItem'>"+
                                "<div class='device'>"+ 
                                  "<p class='deviceName' typeId='eu0v2xgprrhhg41g' id='deviceName"+ deviceId +"' deviceId='" + deviceId + "'>" +
                                    deviceName +
                                  "</p><input type='button' class='changeNameButton' id='changeNameButton"+ deviceId +"' deviceId='" + deviceId + "' value='Change' />"+
                                  "<p>Status: " + "<input type='button' class='status' id='status"+ deviceId +"' deviceType='blind' deviceId='" + deviceId + "' value='"+ status +"' />" + "</p>"+
                                "</div>"+
                                "<input type='button' class='delete' deviceId='" + deviceId + "' value='Delete' />"+
                              "</div>";
        $(".devices").append(objectToAppend);

        addChangeNameEvent();
        addDeleteEvent();
        addStatusEvent();
     })
    .fail((jqXHR, textStatus, errorThrown) => {
      //Tirar mensaje de error
    })
}

$(document).ready(function() {
  getRoomName();

  getDevices();
  
  $(".addDevice").on("click", function() {
    var typeId = $(this).attr('id');
    //var typeName = $(this).val();
    
    device = new api.model.device(null, typeId, $('#deviceNameToAdd').val() , "{}");

    api.device.add(device)
      .done((data, textStatus, jqXHR) => {
        device.id = data.device.id;

        api.roomDevice.add(device.id, roomId)
        .done((data, textStatus, jqXHR) => {
          location.reload();
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          //Tirar mensaje de error
        })

      })
      .fail((jqXHR, textStatus, errorThrown) => {
        //Tirar mensaje de error
      })
  });


});
 
