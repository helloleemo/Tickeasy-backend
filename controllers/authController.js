const { dataSource } = require("../db/data-source");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "Tickeasy_SECRET";

// 註冊使用者
exports.register = async (req, res) => {
  try {

    console.log("register測試",dataSource.options)

    if (!dataSource.isInitialized) {
      console.log("初始化資料庫連線中");
      await dataSource.initialize();
      console.log("資料庫連線成功");
    }

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

    console.log(`📬寄送驗證信 ${email}`);


    const savedUser = await userRepo.save(newUser);

    console.log(`寄送到${email}`);

    const token = jwt.sign(
      { id: savedUser.userId, email: savedUser.email, role: savedUser.role },
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

// 登入
exports.login = async (req, res) => {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ status: "failed", message: "Email 為必填欄位" });
    }
    if (!password) {
      return res.status(400).json({ status: "failed", message: "密碼為必填欄位" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: "failed", message: "Email 格式不正確" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ status: "failed", message: "密碼需至少 8 碼以上，並英數混合" });
    }

    // 取得 User
    const userRepo = dataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ status: "failed", message: "Email 或密碼不正確" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "failed", message: "Email 或密碼不正確" });
    }

    const token = jwt.sign(
      { id: user.userId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_DAY || "30d" }
    );

    res.status(200).json({
      status: "success",
      message: "登入成功",
      data: {
        token,
        user: {
          id: user.userId,
          email: user.email,
          role: user.role,
          name: user.name,
          nickname: user.nickname,
          phone: user.phone,
          birthday: user.birthday,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    console.error("登入錯誤：", error);
    res.status(500).json({ status: "failed", message: "伺服器錯誤" });
  }
};

// 獲得資料
exports.getProfile = async (req, res) => {
  try {

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ status: "failed", message: "請先登入" });
    }

    const userRepo = dataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ status: "failed", message: "找不到用戶資料" });
    }

    res.status(200).json({
      status: "success",
      message: "成功取得用戶資料",
      data: {
        user: {
          id: user.userId,
          email: user.email,
          name: user.name,
          nickname: user.nickname,
          role: user.role,
          phone: user.phone,
          birthday: user.birthday,
          gender: user.gender,
          preferredRegions: user.preferredRegions,
          preferredEventTypes: user.preferredEventTypes,
          country: user.country,
          address: user.address,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("取得用戶資料錯誤：", error);
    res.status(500).json({ status: "failed", message: "伺服器錯誤" });
  }
};
