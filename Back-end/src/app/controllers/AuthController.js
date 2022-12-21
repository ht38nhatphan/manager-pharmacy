const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

let refreshTokens = [];
const authController = {
    //Register
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);

            // Validate
            if (!req.body.email || !req.body.phone || !req.body.name || !req.body.username || !req.body.password) {
                return res.status(400).json("Bạn phải điền đầy đủ thông tin!");
            }
            const hashed = await bcrypt.hash(req.body.password, salt);
            const isHadUser = await User.findOne({ username: req.body.username });
            const newEmail = await User.findOne({ email: req.body.email });

            if (isHadUser && req.body.username != '') {
                return res.status(400).json("Tên đăng nhập đã được sử dụng!");
            }
            if (newEmail) {
                return res.status(400).json("Email này đã tồn tại!");
            }

            // Create New User
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            console.log(newUser)
            // Save user to db
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    registerUserForAdmin: async (req, res) => {
        try {
            console.log(req.body)
            const salt = await bcrypt.genSalt(10);
            // Validate
            if (!req.body.username || !req.body.password || !req.body.email) {
                return res.status(400).json("Bạn phải điền đầy đủ thông tin!");
            }
            const hashed = await bcrypt.hash(req.body.password, salt);
            const isHadUser = await User.findOne({ username: req.body.username });
            const newEmail = await User.findOne({ email: req.body.email });
            if (isHadUser) {
                return res.status(400).json("Tên đăng nhập đã được sử dụng!");
            }
            if (newEmail) {
                return res.status(400).json("Email này đã tồn tại!");
            }

            // Create New User
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                admin: req.body.admin,
                password: hashed,
            });
            console.log(newUser)
            // Save user to db
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // GENERATE ACCESS TOKEN 
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin
        }, process.env.ACCESS_SECRET_KEY,
            { expiresIn: "1d" }
        )
    },
    // GENERATE REFRESH TOKEN 
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin
        }, process.env.REFRESH_SECRET_KEY,
            { expiresIn: "5d" }
        );
    },
    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Sai Tên Đăng Nhập!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json("Sai Mật Khẩu!");
            }
            if (user.admin) {
                return res.status(404).json("You are ADMIN, you are not allowed to Access this Page");
            }
            if (!user.admin && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    loginAdmin: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Sai Tên Đăng Nhập!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json("Sai Mật Khẩu!");
            }
            if (!user.admin) {
                return res.status(404).json("You are not allowed to Access this Page");
            }
            if (user.admin && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },

    requestRefreshToken: async (req, res) => {
        //Takes the refresh Token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json("You are not authenticated");
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh Token is not valid")
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
            if (err) { console.log(err); }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            // Create new AccessToken
            const newAccessToken = authController.generateAccessToken(user);
            // Create new RefreshToken
            const newRefreshToken = authController.generateRefreshToken(user);

            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            res.status(200).json({ accessToken: newAccessToken });
        })
    },

    // LOGOUT
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        return res.status(200).json('Logouted Successfully!');
    }
}

// STORE Token in HttpOnly Cookies


module.exports = authController;