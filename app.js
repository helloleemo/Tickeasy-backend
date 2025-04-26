const express = require("express");
const { dataSource } = require("./db/data-source");
const app = express();

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source 已啟動");
  })
  .catch((err) => {
    console.error("資料庫連線失敗", err);
  });

app.use(express.json());

// 路由：只開啟 auth 註冊
const authRoute = require("./routes/auth");
app.use("/api/v1/auth", authRoute);

// 404
app.use((req, res) => {
  res.status(404).json({ status: "failed", message: "找不到路由" });
});

module.exports = app;
