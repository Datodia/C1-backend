
// const [,,command, num1, num2] = process.argv

// function calculator(){
//     if(command === 'sum'){
//         console.log(Number(num1) + Number(num2))
//     }else if(command === 'sub'){
//         console.log(num1 - num2)
//     }else if(command === 'mult'){
//         console.log(num1 * num2)
//     }else{
//         console.log('unkown command')
//     }
// }

// calculator()


// function sayHello(name){
//     console.log(`hello ${name}`)
// }

// sayHello(process.argv[2])



const fs = require('fs/promises')

// writeFile('fileName', 'content') CRITICAL: content must be string
async function main(){

    const readData = await fs.readFile('first.txt', 'utf-8')
    console.log(readData.split(' ').length)

    // await fs.writeFile('first.txt', 'hello from reschool')
    // await fs.writeFile('second.js', 'console.log("second")')
    // await fs.writeFile('third.txt', '3')
    // await fs.writeFile('users.json', JSON.stringify([{name: "user"}]))
}
main()