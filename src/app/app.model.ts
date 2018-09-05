export interface Msg {
    msg: string;
    username:string;
    show:boolean;

}
export interface User {
    // id: string;
        uid: string;
    username:string;
    photoURL?: string;
 displayName?: string;

  fcmTokens?: { [token: string]: true };
}
