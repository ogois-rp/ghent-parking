import { useState } from 'react'
import localStorageService from '../utils/localStorage'

export function useFavourites() {
    const [favourites, setFavourites] = useState<string[]>(
        () => localStorageService.getFavourites()
    )

    const toggleFavourite = (name: string) => {
        const updated = favourites.includes(name)
            ? favourites.filter(f => f !== name)
            : [...favourites, name]
        setFavourites(updated)
        localStorageService.setFavourites(updated)
    }

    const isFavourite = (name: string) => favourites.includes(name)

    return { favourites, toggleFavourite, isFavourite }
}