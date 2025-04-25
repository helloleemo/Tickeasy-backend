const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Ticket",
  tableName: "ticket",
  columns: {
    ticketId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    purchaserName: {
      type: "varchar",
      length: 100,
    },
    purchaserEmail: {
      type: "varchar",
      length: 100,
    },
    concertStartTime: {
      type: "timestamp",
      nullable: false,
    },
    seatNumber: {
      type: "varchar",
      length: 20,
    },
    qrCode: {
      type: "varchar",
      length: 255,
    },
    status: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    purchaseTime: {
      type: "timestamp",
      nullable: false,
    },
  },
  relations: {
    Order: {
      target: "Order",
      type: "many-to-one",
      joinColumn: {
        name: "orderId",
        referencedColumnName: "orderId",
        foreignKeyConstraintName: "ticket_order_id_fk",
      },
    },
    TicketType: {
      target: "TicketType",
      type: "many-to-one",
      joinColumn: {
        name: "ticketTypeId",
        referencedColumnName: "ticketTypeId",
        foreignKeyConstraintName: "ticket_type_id_fk",
      },
    },
    User: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
        referencedColumnName: "userId",
        foreignKeyConstraintName: "ticket_user_id_fk",
      },
    },
  },
});
