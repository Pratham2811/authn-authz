import crypto from "crypto"
import { readFile } from "fs/promises"

// we are tracking how git hashes the file changes

//the format git hases the file 


const file=await readFile("test.txt");
const header=`blob ${file.length}\0`;
const storeBuffer=Buffer.concat([
    Buffer.from(header),
    file
]);
console.log(storeBuffer);


const hash=crypto.createHash("sha1").update(storeBuffer).digest("hex");

console.log(hash);
