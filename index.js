import input from "./input.js";
import mongoose from "mongoose";
import User from "./models/User.js";
let profile

mongoose.connect('mongodb://localhost:27017/console')

async function run(){
    while(true){
        console.log('--Bem-vindo(a) ao controle de finanças--')
        console.log('1. Para fazer login')
        console.log('2. Para se registrar')
        console.log('3. Para sair da aplicação')
        const runoption = await input('')
    
        if(runoption === '1'){
            console.log('\n\nBem-vindo(a) a seção de Login!')
            const user = await input('Digite seu usuario: ')
            const password = await input('Digite sua senha: ')
            const verifyStatus = await verifyData(user, password)
            await main(verifyStatus)
        }else if(runoption === '2'){
            console.log('\n\nBem-vindo(a) a seção de Registro!')
            const newuser = await input('Digite seu usuario: ')
            const newpassword = await input('Digite sua senha: ')
            const newprofile = {user: newuser.trim(), password: newpassword.trim(), balance: 0, statement: []}
            await saveData(newprofile)
        }else {
            process.exit()
        }
    }
}

async function saveData(newprofile){
    const newUser = new User({
        user: newprofile.user,
        password: newprofile.password,
        balance: newprofile.balance,
        statement: newprofile.statement
    })
    try{
        await newUser.save()
    }catch(error){
        console.log('Erro obtido no registro: ' + error)
        return
    }
}

async function verifyData(user, password){
    const verifyAll = await User.findOne({user: user, password: password})
    if(verifyAll){
        profile = verifyAll
    }
    return verifyAll
}

async function main(verify){
    if(verify){
        while(true){
            console.log('\n\nBem-vindo(a) a pagina do usuario!')
            console.log('Qual ação você gostaria de realizar?')
            console.log('1. Para ver saldo')
            console.log('2. Para definir saldo')
            console.log('3. Para definir gastos')
            console.log('4. Para definir depositos')
            console.log('5. Para ver extrato')
            console.log('6. Sair da pagina de usuario')
            const mainoption = await input('')
            if(mainoption === '1'){
                console.log('\nSaldo atual: ' + profile.balance)
            }else if(mainoption === '2'){
                profile.balance = parseFloat(await input('\nDigite o seu novo saldo: '))
                await User.updateOne({name: profile.name, password: profile.password}, {$set: {balance: profile.balance}})
                console.log('Novo saldo: ' + profile.balance)
            }else if(mainoption === '3'){
                while(true){
                    const expense = parseFloat(await input('\nDigite o valor de seu gasto: '))
                    profile.balance = parseFloat(profile.balance) - expense
                    profile.statement.push(`Expense: ${expense}`)
                    await User.updateOne({name: profile.name, password: profile.password},{$set: 
                        {balance: profile.balance, statement: profile.statement}
                    })
                    console.log('Novo saldo: ' + profile.balance)
                    console.log('1. Para definir outro gasto')
                    console.log('2. Para voltar a pagina do usuario')
                    const expenseoption = await input('')
                    if(expenseoption === '1'){
                        
                    }else if(expenseoption === '2'){
                        break
                    }else{
                        process.exit()
                    }
                }
            }else if(mainoption === '4'){
                while(true){
                    const deposit = parseFloat(await input('Digite o valor do deposito: '))
                    profile.balance = parseFloat(profile.balance) + deposit
                    profile.statement.push(`Deposit: ${deposit}`)
                    await User.updateOne({name: profile.name, password: profile.password},{$set: 
                        {balance: profile.balance, statement: profile.statement}
                    })
                    console.log('Novo saldo: ' + profile.balance)
                    console.log('1. Para definir outro deposito')
                    console.log('2. Para voltar a pagina do usuario')
                    const expenseoption = await input('')
                    if(expenseoption === '1'){
                        
                    }else if(expenseoption === '2'){
                        break
                    }else{
                        process.exit()
                    }
                }
            }else if(mainoption === '5'){
                console.log('\n')
                profile.statement.forEach(statement => {
                    console.log(statement)
                })
            }else if(mainoption === '6'){
                break
            }else{
                process.exit()
            }
        }

    }else{
        return
    }
}

run()
