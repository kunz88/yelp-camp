import express, { Request, Response } from "express";
import bcrypt from "bcrypt"
const app = express.Router();
//Authentication è il processo di verificare chi è un particolare utente
// Authorization cosa un utente può fare all'interno di un end-point(es.cancellare un commento, eliminare il profilo)

// how to not store a password:
// 1- never store a password 
// We have to hash the password!!!!!! Le funzioni di hashing sono appositamente  lente,
// così da non dare la possibilità di meccanizzare un processo per forzare numerose password
const hashPassword = async(pw:string) => {
    const salt = await bcrypt.genSalt(10);// genero il sale
    return await bcrypt.hash(pw,salt);// hash the password

}

const login = async(pw:string,hashPass:string) => {
    const result = await bcrypt.compare(pw,hashPass)
    if(result){
        console.log("logged");
    }
    else{
        console.log("401");
    }
}

app.post('/register',async(req:Request,res:Response)=> {
    const {password,username} = req.body;
    const hash = await hashPassword(password)

    res.send({hash,username})

})
export default app;


