export interface Msg {
    msg: string;
    username:string;
    show:boolean;
    user_id:any;

}
export interface User {
    // id: string;
        uid: string;
    username:string;
    // photoURL?: string;
 displayName?: string;

  // fcmTokens?: { [token: string]: true };
}
