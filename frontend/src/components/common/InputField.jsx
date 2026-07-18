export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          border
          border-gray-300
          bg-white
          px-3
          py-2.5
          text-sm
          text-gray-900
          rounded-md
          outline-none
          transition
          focus:border-gray-900
        "
      />
    </div>
  );
}