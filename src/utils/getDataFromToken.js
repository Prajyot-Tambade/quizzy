import jwt from "jsonwebtoken";

export const getDataFromToken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || '';
    if (!token) return null;

    const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedData;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}