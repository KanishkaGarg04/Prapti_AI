export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        border
        border-gray-900
        bg-gray-900
        text-white
        text-sm
        font-medium
        py-2.5
        rounded-md
        transition
        hover:bg-black
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}