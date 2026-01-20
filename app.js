import crypto from "node:crypto"
import { readFile } from "node:fs/promises";

// const filedata=await readFile("shattered-1.pdf");
// const filedata2=await readFile("shattered-2.pdf");
// const hash=crypto.createHash("sha1").update(filedata2).digest("hex")


const fileBuffer=await readFile("test.txt");
// const hash=crypto.createHash("sha256").update(fileBuffer).digest("hex")
const hash=crypto.createHash("sha256").update(fileBuffer).digest("hex")
const has2=Buffer.from("_F7p4aOzJRbczB4kue62X_TV9Z0qCeonZXyF-f1phJU",
    "base64url"
).toString("hex")
console.log(hash);
console.log(has2);

