const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "USER",
  columns: {
    userId: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 72, // bcrypt 加密後的密碼長度固定為 60 字元
      nullable: false, // 避免報錯
    },
    
    name: {
      type: "varchar",
      length: 50,
    },
    nickname: {
      type: "varchar",
      length: 20,
    },
    role: {
      type: "enum",
      enum: ["user", "admin", "superuser"],
      default: "user",
      nullable: false, // 避免報錯

    },
    phone: {
      type: "varchar",
      length: 20,
      nullable: false, // 避免報錯


    },
    birthday: {
      type: "date",
      nullable: false, // 避免報錯

    },
    gender: {
      type: "enum",
      enum: ["male", "female", "other"],
      nullable: true, // 避免抱錯
    },
    preferredRegions: {
      type: "varchar",
      array: true,
      default: "{}",
      nullable: true,
    },
    preferredEventTypes: {
      type: "varchar",
      array: true,
      default: "{}",
      nullable: true,
    },
    country: {
      type: "varchar",
      length: 20,
      nullable: true, // 避免報錯
    },
    address: {
      type: "varchar",
      length: 100,
      nullable: true, // 避免報錯
    },
    avatar: {
      type: "varchar",
      length: 255,
      nullable: true, // 避免報錯
    },
    verificationToken: {
      type: "varchar",
      length: 50,
      nullable: true,  // 避免報錯
    },
    verificationTokenExpires: {
      type: "timestamp",
      nullable: true,  // 避免報錯
    },
    isEmailVerified: {
      type: "boolean",
      default: false,
      nullable: false,
    },
    passwordResetToken: {
      type: "varchar",
      length: 50,
      nullable: true,  // 避免報錯
    },
    passwordResetExpires: {
      type: "timestamp",
      nullable: true,  // 避免報錯
    },
    lastVerificationAttempt: {
      type: "timestamp",
      nullable: true,  // 避免報錯
      
    },
    lastPasswordResetAttempt: {
      type: "timestamp",
      nullable: true,  // 避免報錯

    },
    oauthProviders: {
      type: "jsonb",
      default: () => "'[]'", // 寫成 SQL JSON 陣列預設值避免出錯
      nullable: false,
    },
    searchHistory: {
      type: "jsonb",
      default: "[]",
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
    deletedAt: {
      type: "timestamp",
      nullable: true,
    },
  },
});
