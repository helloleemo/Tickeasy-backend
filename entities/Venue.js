const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Venue",
  tableName: "venues",
  columns: {
    venueId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    venueName: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    venueDescription: {
      type: "text",
    },
    venueAddress: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    venueCapacity: {
      type: "int",
    },
    venueImageUrl: {
      type: "varchar",
      length: 255,
    },
    googleMapUrl: {
      type: "varchar",
      length: 255,
    },
    isAccessible: {
      type: "boolean",
      default: false,
    },
    hasParking: {
      type: "boolean",
      default: false,
    },
    hasTransit: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
      nullable: false,
    },
  },
});
