api.model = api.model || {};

api.model.device = class {
  constructor(id, typeId, name, meta) {
    if (id) {
      this.id = id;
    } else {
      delete(this.id);
    }
    this.typeId = typeId;
    this.name = name;
    this.meta = meta;
  }
}