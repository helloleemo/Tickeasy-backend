const { DataSource } = require("typeorm");

const User = require("../entities/User");
const Concert = require("../entities/Concert");
const ConcertSession = require("../entities/ConcertSession");
const Location = require("../entities/Location");
const MusicTag = require("../entities/MusicTag");
const Order = require("../entities/Order");
const Organization = require("../entities/Organization");
const Payment = require("../entities/Payment");
const Ticket = require("../entities/Ticket");
const TicketType = require("../entities/TicketType");
const Venue = require("../entities/Venue");

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || "testHexschool",
  password: process.env.DB_PASSWORD || "pgStartkit4test",
  database: process.env.DB_DATABASE || "test",
  entities: [
    User,
    Concert,
    ConcertSession,
    Location,
    MusicTag,
    Order,
    Organization,
    Payment,
    Ticket,
    TicketType,
    Venue
  ],
  logging: process.env.LOG_LEVEL === "debug" ? true : false,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  ssl: process.env.DB_ENABLE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

module.exports = { dataSource };
