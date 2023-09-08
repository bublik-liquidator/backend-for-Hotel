export class UserDTO {
    id!:bigint;
    username!:string;
    password!:string;
    photo!:string;
    many!:number;
    birthday!:string;
    phonenomber!:string;
    email!:string;
    login!:string;

    constructor(model:UserDTO ) {
        this.id = model.id
        this.username = model.username
        this.password = model.password
        this.photo = model.photo
        this.many = model.many
        this.birthday = model.birthday
        this.phonenomber = model.phonenomber
        this.email = model.email  
        this.login = model.login  
      }
}