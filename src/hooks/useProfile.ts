import { useState } from 'react'
import localStorageService from '../utils/localStorage'
import type { UserProfile } from '../types/user'

export function useProfile() {
    const [profile, setProfile] = useState(() => localStorageService.getProfile())

    const updateProfile = (newProfile: UserProfile) => {
        localStorageService.setProfile(newProfile)
        setProfile(newProfile)
    }

    const clearProfile = () => {
        localStorageService.clearAll()
        setProfile(null)
    }

    return { profile, updateProfile, clearProfile }
}