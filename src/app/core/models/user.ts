export class User {
    _id: string;
    email: string;
    password: string;
}


export interface LoginRsp {
    success: boolean;
    token: string;
}

export interface SignupRsp {
    success: boolean;
    message: string;
}
