export interface ProfileContext {
    profileData:{
        name: {
            first: string,
            middle?: string,
            last: string,
        },
        skills:string[],
        avatarURL: string,
        about: string,
        social: {
            linkedIn: string,
            facebook?: string,
            instagram?: string,
        },
        contact: {
            email: string,
            phone: string
        },
        main:{
            work: {
                from: number,
                to:number | null,
                company:string,
                designation: string,
                workNotes:string[]
            }[]
        }
    },
    setContent:(str:string)=>void
}