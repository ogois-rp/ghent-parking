import { useState } from 'react'
import localStorageService from '../utils/localStorage'
import { useProfile } from '../hooks/useProfile'
import { ProfileForm } from '../components/shared/ProfileForm'
import { Lock } from 'lucide-react'

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
            case 'firstName': setFirstName(value); break
            case 'lastName': setLastName(value); break
            case 'licensePlate': setLicensePlate(value); break
            case 'carMaker': setCarMaker(value); break
            case 'carModel': setCarModel(value); break
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
        <div className="flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md">

                <div className="flex items-center gap-2 mb-8">
                    <div className="w-7 h-7 bg-blue-800 rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">P</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">ParkGent</span>
                </div>

                <h1 className="text-xl font-medium text-gray-900 mb-1">Welcome to ParkGent</h1>
                <p className="text-sm text-gray-500 mb-8">Tell us a bit about yourself so we can personalise your parking experience in Ghent.</p>

                <ProfileForm
                    values={{ firstName, lastName, licensePlate, carMaker, carModel }}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitLabel="Continue"
                    submitted={submitted}
                />

                <div className="flex items-center justify-center gap-1.5 mt-4">
                    <Lock size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-400">Stored locally on your device only</span>
                </div>

            </div>
        </div>
    )
}