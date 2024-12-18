interface LabelledInputInterface {
  label: string;
  placeholder: string;
  type: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({
  label,
  placeholder,
  type,
  id,
  onChange,
}: LabelledInputInterface) {
  return (
    <div>
      <label htmlFor={id} className="text-md font-semibold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={id}
        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
}
