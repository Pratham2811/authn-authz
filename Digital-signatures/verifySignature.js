import crypto from "crypto";

import { readFile } from "fs/promises";
const secretKey = "I am Prathamesh";

 const signedfileContent=await readFile("./signed-loan-agreement.md","utf-8");
const [fileContent,signature]=signedfileContent.split(":-")



const newsignature = crypto
  .createHash("sha256")
  .update("/.loan-agreement.md")
  .update(secretKey)
  .digest("hex");
console.log(signature);
console.log(newsignature);
console.log(signature==newsignature);

  if(signature===newsignature){
    console.log("document is valid");
    
  }else{
    console.log("document is invalid");
    
  }
