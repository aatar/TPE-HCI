api.model = api.model || {};

api.model.roomDevice = class {
  constructor(deviceId, roomId) {
    this.deviceId = deviceId;
    this.roomId = roomId;
  }
}