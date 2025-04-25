const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Concert",
  tableName: "concert",
  columns: {
    concertId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    conTitle: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    conIntroduction: {
      type: "varchar",
      length: 3000,
    },
    conLocation: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    conAddress: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    eventStartDate: {
      type: "date",
    },
    eventEndDate: {
      type: "date",
    },
    imgBanner: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    imgSeattable: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    ticketPurchaseMethod: {
      type: "varchar",
      length: 1000,
      nullable: false,
    },
    precautions: {
      type: "varchar",
      length: 2000,
      nullable: false,
    },
    refundPolicy: {
      type: "varchar",
      length: 1000,
      nullable: false,
    },
    conInfoStatus: {
      type: "varchar",
      length: 10,
    },
    conStatus: {
      type: "varchar",
      length: 10,
    },
    reviewStatus: {
      type: "enum",
      enum: ["pending", "approved", "rejected", "skipped"],
      default: "skipped",
    },
    visitCount: {
      type: "int",
    },
    promotion: {
      type: "int",
    },
    cancelledAt: {
      type: "timestamp",
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      nullable: false,
    },
  },
  relations: {
    Organization: {
      target: "Organization",
      type: "many-to-one",
      joinColumn: {
        name: "organizationId",
        referencedColumnName: "organizationId",
        foreignKeyConstraintName: "concert_org_id_fk",
      },
    },
    Venue: {
      target: "Venue",
      type: "many-to-one",
      joinColumn: {
        name: "venueId",
        referencedColumnName: "venueId",
        foreignKeyConstraintName: "concert_venue_id_fk",
      },
    },
    LocationTag: {
      target: "LocationTag",
      type: "many-to-one",
      joinColumn: {
        name: "locationTagId",
        referencedColumnName: "locationTagId",
        foreignKeyConstraintName: "concert_location_tag_fk",
      },
    },
    MusicTag: {
      target: "MusicTag",
      type: "many-to-one",
      joinColumn: {
        name: "musicTagId",
        referencedColumnName: "musicTagId",
        foreignKeyConstraintName: "concert_music_tag_fk",
      },
    },
  },
});
