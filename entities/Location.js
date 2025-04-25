const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "LocationTag",
  tableName: "locationTag",
  columns: {
    locationTagId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    locationTagName: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
  },
});
