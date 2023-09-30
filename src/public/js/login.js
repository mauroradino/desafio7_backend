import { userModel } from '../../models/userModel';
const FName = document.getElementById("firstName")
const LName = document.getElementById("lastName")
const Mail = document.getElementById("mail")
const Age = document.getElementById("age")
const Password = document.getElementById("password")
const btn = document.getElementById("button")



class user {
    constructor(FName, LName, Mail, Age, Password){
    this.FName = FName;
    this.LName = LName;
    this.Mail = Mail;
    this.Age = Age;
    this.Password = Password;
 }
}

btn.addEventListener('click', async () => {
    const firstName = FName.value;
    const lastName = LName.value;
    const Email = Mail.value;
    const userAge = Age.value;
    const userPassword = Password.value;

    const newUser = new user (FName.value, LName.value, Mail.value, Age.value, Password.value)
    await userModel.create({firstName, lastName, Email, userAge, userPassword})
})

