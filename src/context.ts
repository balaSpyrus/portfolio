import React from 'react';
import { ProfileContext } from './types';


const INITIAL_VALUE = {
    "name": {
        "first": '',
        "last": '',
    },
    "avatarURL": '',
    "about": '',
    "social": {
        "linkedInURL": '',
    },
    "contact": {
        "email": '',
        "phone": ''
    },
    "main":{
        "work": []
    }
}

export const Profile = React.createContext<ProfileContext>({
    profileData : INITIAL_VALUE,
    setContent : ()=>{}
});