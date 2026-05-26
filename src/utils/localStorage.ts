import type { UserProfile } from "../types/user"

const localStorageService = {
    getProfile(): UserProfile | null {
        const raw = localStorage.getItem('userProfile')
        if (!raw) return null

        try {
            return JSON.parse(raw) as UserProfile
        } catch {
            return null
        }
    },
    setProfile(profile: UserProfile) {
        localStorage.setItem('userProfile', JSON.stringify(profile))
    },
    getOnboardingComplete(): boolean {
        return !!localStorage.getItem('onboardingComplete')
    },
    setOnboardingComplete() {
        localStorage.setItem('onboardingComplete', 'true')
    },
    getFavourites(): string[] {
        const raw = localStorage.getItem('favourites')
        if (!raw) return []

        try {
            return JSON.parse(raw) as string[]
        } catch {
            return []
        }
    },
    setFavourites(favourites: string[]) {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    },
    clearAll() {
        localStorage.removeItem('userProfile')
        localStorage.removeItem('onboardingComplete')
        localStorage.removeItem('favourites')
    }
}

export default localStorageService