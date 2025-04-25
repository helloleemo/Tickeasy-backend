const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "order",
  columns: {
    orderId: { primary: true, type: "uuid", generated: "uuid" },
    orderStatus: { type: "varchar", length: 20, nullable: false },
    isLocked: { type: "boolean", default: true, nullable: false },
    lockToken: { type: "varchar", length: 100, nullable: false },
    lockExpireTime: { type: "timestamp", nullable: false },
    purchaserName: { type: "varchar", length: 50 },
    purchaserEmail: { type: "varchar", length: 100 },
    purchaserPhone: { type: "varchar", length: 50 },
    invoicePlatform: { type: "varchar", length: 20 },
    invoiceType: { type: "varchar", length: 20 },
    invoiceCarrier: { type: "varchar", length: 100 },
    invoiceStatus: { type: "varchar", length: 20 },
    invoiceNumber: { type: "varchar", length: 20 },
    invoiceUrl: { type: "varchar", length: 255 },
    createdAt: { type: "timestamp", createDate: true, nullable: false },
    updatedAt: { type: "timestamp", updateDate: true },
  },
  relations: {
    TicketType: {
      target: "TicketType",
      type: "many-to-one",
      joinColumn: {
        name: "ticketTypeId",
        referencedColumnName: "ticketTypeId",
        foreignKeyConstraintName: "order_ticket_type_fk",
      },
    },
    User: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
        referencedColumnName: "userId",
        foreignKeyConstraintName: "order_user_id_fk",
      },
    },
  },
});
