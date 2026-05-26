import { useProfile } from '../hooks/useProfile'
import type { UserProfile } from "../types/user"
import { ProfileForm } from '../components/shared/ProfileForm'
import { useState } from 'react'

export function Profile() {
    const { profile, updateProfile } = useProfile()
    const [submitted, setSubmitted] = useState(false)
    const [saved, setSaved] = useState(false)

    const [form, setForm] = useState<UserProfile>({
        firstName: profile?.firstName ?? '',
        lastName: profile?.lastName ?? '',
        licensePlate: profile?.licensePlate ?? '',
        carMaker: profile?.carMaker ?? '',
        carModel: profile?.carModel ?? '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setSaved(false)
    }

    const handleSave = () => {
        setSubmitted(true)
        if (!form.firstName || !form.lastName || !form.licensePlate || !form.carMaker || !form.carModel) return
        updateProfile(form)
        setSaved(true)
    }

    const initials = `${form.firstName?.[0] ?? ''}${form.lastName?.[0] ?? ''}`.toUpperCase()

    return (
        <div className="max-w-md">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">Profile</h1>
            <p className="text-sm text-gray-500 mb-6">Manage your personal and vehicle details</p>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-medium text-blue-800">
                        {initials || '?'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{form.firstName} {form.lastName}</p>
                        <p className="text-xs text-gray-400">{form.licensePlate || 'No license plate'}</p>
                    </div>
                </div>

                <ProfileForm
                    values={form}
                    onChange={handleChange}
                    onSubmit={handleSave}
                    submitLabel="Save"
                    submitted={submitted}
                />

                {saved && (
                    <p className="text-xs text-green-700 text-center mt-3">Profile saved successfully</p>
                )}
            </div>
        </div>
    )
}