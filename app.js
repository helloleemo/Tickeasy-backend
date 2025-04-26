const express = require("express");
const { dataSource } = require("./db/data-source");
const app = express();

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source啟動");
  })
  .catch((err) => {
    console.error("資料庫連線失敗", err);
  });

app.use(express.json());

// 路由
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// 404
app.use((req, res) => {
  res.status(404).json({ status: "failed", message: "找不到路由" });
});

module.exports = app;
