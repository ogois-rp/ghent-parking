interface FieldInputProps {
    label: string
    name: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean
}

export function FieldInput({ label, name, placeholder, value, onChange, error }: FieldInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">{label}</label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition ${
                    error ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
            />
            {error && (
                <p className="text-xs text-red-600">{label} should not be empty</p>
            )}
        </div>
    )
}