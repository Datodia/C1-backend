// 1) npm init -y
// 2) თუ რაიმეს დააინსტალირებთ არ დაგავიწყდეთ შექმნათ
// .gitignore ფაილი

import axios from 'axios'
import fs from 'fs/promises'
import moment from 'moment'

async function main(){
    const resp = await axios.get('https://dummyjson.com/users')
    const resp2 = await axios.get('https://jsonplaceholder.typicode.com/users')
    const mergredData = [...resp.data.users, ...resp2.data]
    const filteredUsers = mergredData.map((user) => ({
        fullName: user.name ?? `${user.firstName} ${user.lastName}`,
        age: user.age ?? null,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate ? moment(new Date(user.birthDate)).format('YYYY Do MMMM dddd') : null
    }))

    await fs.writeFile('users.json', JSON.stringify(filteredUsers))
}

main()


// async function getProducts(){
//     const resp = await axios.get('https://dummyjson.com/products')
//     const filteredData = resp.data.products.map(product => ({
//         id: product.id,
//         name: product.title,
//         desc: product.description,
//         price: product.price,
//         photo: product.thumbnail
//     })).sort((a,b)=> a.price - b.price)
//     await fs.writeFile('products.json', JSON.stringify(filteredData))
// }

// getProducts()

// დაწერეთ ფუნქცია რომელიც წამოირებს ინფორმაციას ბქენდიდან
// გაფილტრავთ id, name,desc, price, photo.
// დაალაგებთ ფასის მიხედვით და ჩაწერთ products.json ში.
// 2012251



//დაწერეთ ფუნქცია რომელიც წამოიღებს იუზერების ინფორმაციას
// შექმნის /users/michal.json სადაც ჩაწერთ მაიკლის შესახებ
// ყველა ინფორმაციას

async function getUsers(){
    // const resp = await axios.get('https://dummyjson.com/users')
    // for(let user of resp.data.users){
    //     await fs.writeFile(`./users/${user.firstName}.json`, JSON.stringify(user))
    // }

    const dirs = await fs.readdir('./users')
    for(let name of dirs){
        const readData = await fs.readFile(`./users/${name}`, 'utf-8')
        const user = JSON.parse(readData)
        if(user.gender === 'male'){
            await fs.unlink(`./users/${name}`)
        }
    }
}

getUsers()