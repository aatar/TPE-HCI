var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }
}

api.room = class {
  static get url() {
    return api.baseUrl + "rooms/";
  }

  static add(room) {

   return $.ajax({
      url: api.room.url,
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: JSON.stringify(room)
    });
  }

  static modify(room) {
   return $.ajax({
      url: api.room.url + room.id,
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: JSON.stringify(room)
    }); 
  }

  static delete(id) {
   return $.ajax({
      url: api.room.url + id,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout
    }); 
  }

  static get(id) {
    return $.ajax({
      url: api.room.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout
    });
  }

  static getAllRooms() {
    return $.ajax({
      url: api.room.url,
      method: "GET",
      dataType: "json",
      timeout: api.timeout
    });
  }
}

api.roomDevice = class {
  /*static get url() {
    return api.baseUrl + "rooms/";
  }*/

  static add(deviceId, roomId) {

   return $.ajax({
      url: api.baseUrl + "devices/" + deviceId + "/rooms/" + roomId,
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    });
  }

  /*static modify(room) {
   return $.ajax({
      url: api.room.url + room.id,
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: JSON.stringify(room)
    }); 
  }

  
  }*/

  /*static delete(id) {
   return $.ajax({
      url: api.room.url + id,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout
    });*/

  static getAllDevices(roomId) {
    return $.ajax({
      url: api.baseUrl + "rooms/" + roomId + "/devices",
      method: "GET",
      dataType: "json",
      timeout: api.timeout
    });
  }
}

api.device = class {
  static get url() {
    return api.baseUrl + "devices/";
  }

  static add(device) {

   return $.ajax({
      url: api.device.url,
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: JSON.stringify(device)
    });
  }

  static modify(device) {

   return $.ajax({
      url: api.device.url + device.id,
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: JSON.stringify(device)
    });
  }

  static delete(id) {
   return $.ajax({
      url: api.device.url + id,
      method: "DELETE",
      dataType: "json",
      timeout: api.timeout
    }); 
  }

  static getState(id) {
   return $.ajax({
      url: api.device.url + id + "/getState",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static turnOn(id) {
   return $.ajax({
      url: api.device.url + id + "/turnOn",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static turnOff(id) {
   return $.ajax({
      url: api.device.url + id + "/turnOff",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static up(id) {
   return $.ajax({
      url: api.device.url + id + "/up",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static down(id) {
   return $.ajax({
      url: api.device.url + id + "/down",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static setTemperature(id, temperature) {
   return $.ajax({
      url: api.device.url + id + "/setTemperature",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout,
      data: "[" + temperature + "]"
    }); 
  }

  static open(id) {
   return $.ajax({
      url: api.device.url + id + "/open",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  static close(id) {
   return $.ajax({
      url: api.device.url + id + "/close",
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      timeout: api.timeout
    }); 
  }

  

  static get(id) {
    return $.ajax({
      url: api.room.url + id,
      method: "GET",
      dataType: "json",
      timeout: api.timeout
    });
  }
}