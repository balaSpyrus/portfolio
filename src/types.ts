export interface ProfileContext {
    "profileData":{
        "name": {
            "first": string,
            "middle"?: string,
            "last": string,
        },
        "avatarURL": string,
        "about": string,
        "social": {
            "linkedIn": string,
            "facebook"?: string,
            "instagram"?: string,
        },
        "contact": {
            "email": string,
            "phone": string
        },
        "main":{
            "work": {
                "current": boolean,
                "designation": string
            }[]
        }
    },
    setContent:(str:string)=>void
}