const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "MusicTag",
  tableName: "musicTag",
  columns: {
    musicTagId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    musicTagName: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
  },
});
