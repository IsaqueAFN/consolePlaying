import process from 'process'

async function input(text){
    process.stdout.write(text)
    const promiseData = await new Promise((resolve, reject) => {
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim())
        })
    })
    return promiseData
}

export default input