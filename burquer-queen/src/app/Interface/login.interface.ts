export interface loginUser{
    accessToken: string;
    user:{
        id: string;
        email: string;
        role: string;
    };
}