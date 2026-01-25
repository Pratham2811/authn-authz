import jwt from "jsonwebtoken";
import crypto from "crypto";
// const sign= jwt.sign({name:"prathamesh"},"secret");
// console.log(sign);

// const data=Buffer.from("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHJhdGhhbWVzaCIsImlhdCI6MTc2OTI1MzE2NX0","base64url").toString();

// console.log(data);

// const signature = crypto
//   .createHmac("sha256", "secret")
//   .update("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHJhdGhhbWVzaCIsImlhdCI6MTc2OTI1MzE2NX0")
//   .digest("base64url");
// console.log(signature);

// const sign= jwt.sign({name:"prathamesh"},"secret",{
//     algorithm:"RS256",
//     expiresIn:10 //secs
// });
// console.log(sign);

const verfied=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHJhdGhhbWVzaCIsImlhdCI6MTc2OTI1MzE2NX0.9SCJHWoZtyHwhHWVOTOhmX7qXeH4UJi9fHTnPK6_UkA","secret")

console.log(verfied);
