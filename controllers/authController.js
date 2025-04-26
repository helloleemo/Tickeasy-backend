const { dataSource } = require("../db/data-source");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "Tickeasy_SECRET";

// 註冊使用者
exports.register = async (req, res) => {
  try {
    const { email, password, name, nickname, phone, birthday } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ status: "failed", message: "缺少必要欄位" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: "failed", message: "Email 格式不正確" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ status: "failed", message: "密碼需至少 8 碼以上，並英數混合" });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ status: "failed", message: "name 至少 2 個字元以上" });
    }

    if (phone && !/^09\d{8}$/.test(phone)) {
      return res.status(400).json({ status: "failed", message: "手機號碼格式不正確" });
    }

    console.log("資料庫測試",dataSource.options)

    const userRepo = dataSource.getRepository("User");
    const existUser = await userRepo.findOne({ where: { email } });

    if (existUser) {
      return res.status(409).json({ status: "failed", message: "此 Email 已經被註冊" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = userRepo.create({
      email,
      password: hashedPassword,
      name,
      nickname,
      phone,
      birthday,
      role: "user",
      isEmailVerified: false,
    });

    const savedUser = await userRepo.save(newUser);

    console.log(`寄送到${email}`);

    const token = jwt.sign(
      { id: savedUser.id, email: savedUser.email, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      status: "success",
      message: "註冊成功，請檢查郵箱完成驗證",
      data: {
        token,
        user: {
          id: savedUser.id,
          email: savedUser.email,
          role: savedUser.role,
          name: savedUser.name,
          nickname: savedUser.nickname,
          phone: savedUser.phone,
          birthday: savedUser.birthday,
          isEmailVerified: savedUser.isEmailVerified,
        },
      },
    });
  } catch (error) {
    console.error("註冊錯誤：", error);
    res.status(500).json({ status: "failed", message: "伺服器錯誤" });
  }
};
