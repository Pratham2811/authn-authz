import bcrypt from "bcrypt"

// const salt=await bcrypt.genSalt(14)
// console.log(salt);

// const hash=await bcrypt.hash("password","$2b$14$KcYzJ9A7cmrfzmyYMj8tue");
const storedPassword="$2b$14$KcYzJ9A7cmrfzmyYMj8tueCVM/e6/tAcQCKOG0qVk3bEL3xPyTNIu"
const salt=storedPassword.substring(0,29)
const savedPassword=storedPassword.substring(29,60)
console.log(salt);
console.log(storedPassword);


