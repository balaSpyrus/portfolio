export interface ProfileContext {
    profileData: {
        name: {
            first: string;
            middle?: string;
            last: string;
        };
        skills: { name: string; level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 }[];
        avatarURL: string;
        about: string;
        social: {
            linkedIn: string;
            facebook?: string;
            instagram?: string;
        };
        contact: {
            email: string;
            phone: string;
        };
        main: {
            work: {
                from: number;
                to: number | null;
                company: string;
                designation: string;
                workNotes: string[];
            }[];
            education:[],
            certificates:[],
            accomplishments:[],
            hobbies:[],
            someOfMyWorks:[]
        };
    };
}
