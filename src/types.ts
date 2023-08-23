export type SkillType = { name: string; level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 };
type GenericAttrType = {
    from: number;
    to: number | null;
    name: string;
    imageURL?: string;
};
export interface WorkType extends GenericAttrType {
    designation: string;
    workNotes: string[];
}

export interface WorksImgSetType extends Required<Pick<GenericAttrType, 'imageURL' | 'name'>> {
    desc?: string;
}

export interface EducationType extends NonNullable<GenericAttrType> {
    type: 'PG' | 'UG' | '12th' | '10th';
    secured: number;
    grade: '%' | 'CGPA';
    notes: string[];
}

export interface ProfileContext {
    profileData: {
        name: {
            first: string;
            middle?: string;
            last: string;
        };
        startDate: number;
        skills: SkillType[];
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
            work: WorkType[];
            education: EducationType[];
            certificates: [];
            accomplishments: [];
            hobbies: [];
            someOfMyWorks: WorksImgSetType[];
        };
    };
}
