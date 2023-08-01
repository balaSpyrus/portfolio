import React from 'react';
import { ProfileContext } from './types';

const INITIAL_VALUE: ProfileContext['profileData'] = {
    name: {
        first: '',
        last: '',
    },
    skills: [],
    avatarURL: '',
    about: '',
    social: {
        linkedIn: '',
    },
    contact: {
        email: '',
        phone: '',
    },
    main: {
        work: [],
        education: [],
        certificates: [],
        accomplishments: [],
        hobbies: [],
        someOfMyWorks: [],
    },
};

export const Profile = React.createContext<ProfileContext>({
    profileData: INITIAL_VALUE,
});
