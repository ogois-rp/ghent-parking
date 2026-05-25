import { useState } from 'react'
import localStorageService from '../utils/localStorage'
import { useProfile } from '../hooks/useProfile'
import { ProfileForm } from '../components/shared/ProfileForm'

interface OnboardingProps {
    onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [carMaker, setCarMaker] = useState('')
    const [carModel, setCarModel] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const { updateProfile } = useProfile()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        switch (name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            case 'licensePlate':
                setLicensePlate(value)
                break
            case 'carMaker':
                setCarMaker(value)
                break
            case 'carModel':
                setCarModel(value)
                break
        }
    }

    const handleSubmit = async () => {
        setSubmitted(true)
        if (!firstName || !lastName || !licensePlate || !carMaker || !carModel) return
        updateProfile({ firstName, lastName, licensePlate, carMaker, carModel })
        localStorageService.setOnboardingComplete()
        onComplete()
    }

    return (
        <>
            <h1>Onboarding</h1>
            <ProfileForm
                values={{ firstName, lastName, licensePlate, carMaker, carModel }}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Continue"
                submitted={submitted}
            />
        </>
    )
}