// craete out.txt in Lec2 from test/main.js

const fs = require('fs/promises')
const path = require('path')

async function main(){
    ///Users/datodiasamidze/Desktop/C1/Lec2/out.txt
    const outDir = path.join(__dirname, '..', 'out.txt')
   await fs.writeFile(outDir, 'test')
}

main()