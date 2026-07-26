import jwt from "jsonwebtoken";

const getToken = (user) => {
    const token = jwt.sign(
            {
                id : user.id,
                email : user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d"
            }
        )
    return token;
}

export default getToken;
