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
            "linkedInURL": string,
            "facebookURL"?: string,
            "instagramURL"?: string,
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