import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// npx prisma db push
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //HASH
    const hashedPassword = await bcrypt.hash(password, 10);
    //CREATE NEW USER
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  //CHECK IF USER EXIST
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) return res.status(401).json({ message: "Invalid Credentials" });
  //CHECK PASSWORD
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid Credentials" });
  //GENERATE COOKIE TOKEN AND SEND
  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: false,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
  );

  const { password: userPassword, ...userInfo } = user;
  res
    .cookie("token", token, {
      httpOnly: true,
      // secure: true,//https
      maxAge: age,
    })
    .status(200)
    .json({ userInfo });
  try {
  } catch (err) {
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout done" });
};
