const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ConcertSession",
  tableName: "concertSession",
  columns: {
    sessionId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    sessionDate: {
      type: "date",
      nullable: false,
    },
    sessionStart: {
      type: "time",
      nullable: false,
    },
    sessionEnd: {
      type: "time",
    },
    sessionTitle: {
      type: "varchar",
      length: 100,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      nullable: false,
    },
  },
  relations: {
    Concert: {
      target: "Concert",
      type: "many-to-one",
      joinColumn: {
        name: "concertId",
        referencedColumnName: "concertId",
        foreignKeyConstraintName: "concert_session_concert_id_fk",
      },
    },
  },
});
