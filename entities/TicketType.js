const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TicketType",
  tableName: "ticketType",
  columns: {
    ticketTypeId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    ticketTypeName: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    entranceType: {
      type: "varchar",
      length: 50,
    },
    ticketBenefits: {
      type: "text",
    },
    ticketRefundPolicy: {
      type: "text",
    },
    ticketTypePrice: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    totalQuantity: {
      type: "int",
      nullable: false,
    },
    remainingQuantity: {
      type: "int",
      nullable: false,
    },
    sellBeginDate: {
      type: "timestamp",
    },
    sellEndDate: {
      type: "timestamp",
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
        foreignKeyConstraintName: "ticket_type_concert_id_fk",
      },
    },
  },
});
