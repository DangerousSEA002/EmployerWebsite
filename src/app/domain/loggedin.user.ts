export class LoggedInUser {
    constructor(access_token: string, id: string, username: string, name: any, email: string, avatar: string, roles: any, company_id: any) {
        this.access_token = access_token;
        this.username = username;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.roles = roles;
        this.company_id = company_id;
        this.id = id;
    }
    public id: string;
    public company_id: any;
    public access_token: string;
    public username: string;
    public name: string;
    public email: string;
    public avatar: string;
    public roles: any;
}