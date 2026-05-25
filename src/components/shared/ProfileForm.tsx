import type { UserProfile } from "../../types/user"
import { useProfile } from "../../hooks/useProfile"

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
        <>
            <div className="flex flex-col gap-4 my-3">
                <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 w-full"
                    value={values.firstName}
                    onChange={onChange}
                    name="firstName"
                />
                {submitted && !values.firstName && <p className="text-red-500 text-sm">First name should not be empty</p>}

                <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 w-full"
                    value={values.lastName}
                    onChange={onChange}
                    name="lastName"
                />
                {submitted && !values.lastName && <p className="text-red-500 text-sm">Last name should not be empty</p>}

                <input
                    type="text"
                    placeholder="License Plate"
                    className="border p-2 w-full"
                    value={values.licensePlate}
                    onChange={onChange}
                    name="licensePlate"
                />
                {submitted && !values.licensePlate && <p className="text-red-500 text-sm">License plate should not be empty</p>}

                <input
                    type="text"
                    placeholder="Car Maker"
                    className="border p-2 w-full"
                    value={values.carMaker}
                    onChange={onChange}
                    name="carMaker"
                />
                {submitted && !values.carMaker && <p className="text-red-500 text-sm">Car maker should not be empty</p>}

                <input
                    type="text"
                    placeholder="Car Model"
                    className="border p-2 w-full"
                    value={values.carModel}
                    onChange={onChange}
                    name="carModel"
                />
                {submitted && !values.carModel && <p className="text-red-500 text-sm">Car model should not be empty</p>}
            </div>
            <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{submitLabel}</button>
            {submitLabel === 'Save' && <button
                onClick={handleClear}
                className="bg-red-500 text-white px-4 ml-2 py-2 rounded"
            >
                Reset Profile
            </button>}
        </>
    )
}