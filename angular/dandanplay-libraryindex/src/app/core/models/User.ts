export class User {
    id = "";
    userName = "";
    token = "";

    static createAnonymousUser() : User{
        var u = new User();
        u.id = "34E430BE-FE61-451E-9450-B3BCC5915123";
        u.userName = "ANONYMOUS";
        return u;
    }
}