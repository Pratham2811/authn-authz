import crypto from "crypto";
import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
const secretKey = "I am Prathamesh";

const signature = crypto
  .createHash("sha256")
  .update("/.loan-agreement.md")
  .update(secretKey)
  .digest("hex");
 const fileContent=await readFile("./loan-agreement.md")
 console.log(fileContent.toString("utf-8"));
 
const writeStream=createWriteStream("signed-loan-agreement.md");
writeStream.write(fileContent);
writeStream.end(signature)
console.log(signature);
