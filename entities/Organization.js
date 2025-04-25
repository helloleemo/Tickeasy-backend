const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Organization",
  tableName: "organization",
  columns: {
    organizationId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    orgName: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    orgAddress: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    orgMail: {
      type: "varchar",
      length: 100,
    },
    orgContact: {
      type: "varchar",
      length: 1000,
    },
    orgMobile: {
      type: "varchar",
      length: 200,
    },
    orgPhone: {
      type: "varchar",
      length: 200,
    },
    orgWebsite: {
      type: "varchar",
      length: 200,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      nullable: false,
    },
  },
  relations: {
    User: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
        referencedColumnName: "userId",
        foreignKeyConstraintName: "organization_user_id_fk",
      },
    },
  },
});
