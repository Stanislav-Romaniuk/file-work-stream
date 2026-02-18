import { createReadStream } from 'node:fs';
import { exit } from 'node:process';
import path from 'path'
const parsed = path.parse(process.argv[1]);

if (!process.argv[2]) {
  console.log(`Роззуй очі!: node ${parsed.base} <input file name>`)
  exit(0);
}

const stream = createReadStream(process.argv[2], {
  encoding: 'utf8',
  highWaterMark: 100,
});

const symbolCounter = {}; 

stream.on('error', (error) => {
console.log(`Роззуй очі!: node ${parsed.base} <input file name>`)
})

stream.on('data', (chunk) => {
  const str = chunk.toString();

  for (let i = 0; i < str.length; i++) {
    if (symbolCounter[str[i]]) {
      symbolCounter[str[i]]++;
    } else {
      symbolCounter[str[i]] = 1;
    }
  }
});

stream.on('end', () => {
  console.table(Object.entries(symbolCounter).sort((a, b) => b[1] - a[1]))
});
