const { writeFile, read } = require('fs')
const fs = require('fs/promises')
const path = require('path')

// path.join('path', 'path2') => path/path2 => build path correctly
// async function main(){
//     // await fs.unlink('out.txt')
//     const dirs = await fs.readdir(__dirname)
//     for(let dir of dirs) {
//         const statistic = await fs.lstat(dir)
//         const ext = await path.extname(dir)
//         if(ext === '.txt'){
//             await fs.unlink(dir)
//         }
//     }
// }

// main()

// async function main(){
//     const readData = await fs.readFile('users.json', 'utf-8')
//     const users = JSON.parse(readData)
//     for(let user of users){
//         await fs.writeFile(`${user.name}.txt`, JSON.stringify(user))
//     }
// }

// read data from words.txt count the words and 
// write word count in result.txt
// async function main(){
//     const readData = await fs.readFile('words.txt', 'utf-8')
//     let count = 0;
//     for(let i = 0; i < readData.length; i++){
//         if(['a', 'e', 'i', 'o', 'u'].includes(readData[i])){
//             count++
//         }
//     }
//     await fs.writeFile('result.txt', JSON.stringify(count))    
// }

// main()


// numbers.txt
async function main(){
    for(let i = 1; i < 11; i++){
        fs.appendFile('numbers.txt', `${i} \n`)
    }
}

main()