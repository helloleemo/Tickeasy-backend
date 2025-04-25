const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Payment",
  tableName: "payment",
  columns: {
    paymentId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    method: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    provider: {
      type: "varchar",
      length: 50,
    },
    status: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    currency: {
      type: "varchar",
      length: 10,
      default: "TWD",
    },
    paidAt: {
      type: "timestamp",
    },
    transactionId: {
      type: "varchar",
      length: 100,
    },
    rawPayload: {
      type: "jsonb",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    Order: {
      target: "Order",
      type: "many-to-one",
      joinColumn: {
        name: "orderId",
        referencedColumnName: "orderId",
        foreignKeyConstraintName: "payment_order_id_fk",
      },
    },
  },
});
