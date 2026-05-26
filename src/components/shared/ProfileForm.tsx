import type { UserProfile } from "../../types/user"
import { useProfile } from "../../hooks/useProfile"
import { FieldInput } from "./FieldInput"

interface ProfileFormProps {
    values: UserProfile
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    submitLabel: string
    submitted?: boolean
}

export function ProfileForm({ values, onChange, onSubmit, submitLabel, submitted = false }: ProfileFormProps) {
    const { clearProfile } = useProfile()

    const handleClear = () => {
        clearProfile()
        window.location.href = '/onboarding'
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Personal details</p>
                <div className="grid grid-cols-2 gap-3">
                    <FieldInput label="First name" name="firstName" placeholder="Tiago" value={values.firstName} onChange={onChange} error={submitted && !values.firstName} />
                    <FieldInput label="Last name" name="lastName" placeholder="Raposo" value={values.lastName} onChange={onChange} error={submitted && !values.lastName} />
                </div>
            </div>

            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Vehicle details</p>
                <div className="flex flex-col gap-3">
                    <FieldInput label="License plate" name="licensePlate" placeholder="1-ABC-123" value={values.licensePlate} onChange={onChange} error={submitted && !values.licensePlate} />
                    <div className="grid grid-cols-2 gap-3">
                        <FieldInput label="Car make" name="carMaker" placeholder="Volkswagen" value={values.carMaker} onChange={onChange} error={submitted && !values.carMaker} />
                        <FieldInput label="Car model" name="carModel" placeholder="Golf" value={values.carModel} onChange={onChange} error={submitted && !values.carModel} />
                    </div>
                </div>
            </div>

            <button
                onClick={onSubmit}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-2.5 rounded-lg transition"
            >
                {submitLabel}
            </button>

            {submitLabel === 'Save' && (
                <button
                    onClick={handleClear}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium py-2.5 rounded-lg transition"
                >
                    Reset profile
                </button>
            )}
        </div>
    )
}