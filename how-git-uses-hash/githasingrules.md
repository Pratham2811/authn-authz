Core idea (read this first)

Git does NOT hash files directly.

Git hashes this structure instead:

"blob <file_size>\0<file_content>"


If you hash only the file content, your hash will NOT match Git’s hash.

To match Git, you must:

Add the Git blob header

Use SHA-1 (by default)

Hash the exact byte sequence

Part 1: Get the hash Git uses for a file

Assume file:

test.txt

Step 1: Ask Git for the blob hash
git hash-object test.txt


Output example:

e69de29bb2d1d6434b8b29ae775ad8c2e48c5391


This is the exact hash Git stores internally.

This works even if the file is not committed.

Part 2: Why a normal hash does NOT match Git

If you do this in Node:

createHash('sha1').update(fileContent).digest('hex');


❌ It will not match Git.

Because Git hashes:

blob <size>\0<content>


Not just <content>.

Part 3: Reproduce Git’s hash manually (correct way)
A. Understand the exact byte format

For a file with content:

hello


(5 bytes)

Git hashes this byte stream:

blob 5\0hello


Where:

blob is literal ASCII

space is 0x20

\0 is null byte (0x00)

hello is raw bytes

B. Create Git-compatible hash using Node.js (ES6)
import fs from 'fs';
import crypto from 'crypto';

const filePath = './test.txt';

const content = fs.readFileSync(filePath);
const header = `blob ${content.length}\0`;

const storeBuffer = Buffer.concat([
  Buffer.from(header),
  content
]);

const hash = crypto
  .createHash('sha1')
  .update(storeBuffer)
  .digest('hex');

console.log(hash);

✅ This hash WILL MATCH:
git hash-object test.txt


If it does not:

Newline differences (\n vs \r\n)

File encoding issues

File was modified after hashing