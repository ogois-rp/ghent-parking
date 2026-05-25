import { useProfile } from '../hooks/useProfile'
import type { UserProfile } from "../types/user"
import { ProfileForm } from '../components/shared/ProfileForm'
import { useState } from 'react'

export function Profile() {
    const { profile, updateProfile } = useProfile()
    const [submitted, setSubmitted] = useState(false)

    const [form, setForm] = useState<UserProfile>({
        firstName: profile?.firstName ?? '',
        lastName: profile?.lastName ?? '',
        licensePlate: profile?.licensePlate ?? '',
        carMaker: profile?.carMaker ?? '',
        carModel: profile?.carModel ?? '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        setSubmitted(true)
        if (!form.firstName || !form.lastName || !form.licensePlate || !form.carMaker || !form.carModel) return
        updateProfile(form)
    }

    return (
        <>
            <h1>Profile</h1>
            <ProfileForm
                values={form}
                onChange={handleChange}
                onSubmit={handleSave}
                submitLabel="Save"
                submitted={submitted}
            />
        </>
    )
}