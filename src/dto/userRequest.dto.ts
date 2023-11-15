export class UserRequest {
  username!: string;
  password!: string;
  photo!: string;
  many!: string;
  birthday!: string;
  phonenomber!: string;
  email!: string;
  login!:string;
  role!:string;

  manager_id!: bigint;
  constructor(model: UserRequest) {
    this.username = model.username
    this.password = model.password
    this.photo = model.photo
    this.many = model.many
    this.birthday = model.birthday
    this.phonenomber = model.phonenomber
    this.email = model.email 
    this.login = model.login  
     this.role = model.role  

  }
}