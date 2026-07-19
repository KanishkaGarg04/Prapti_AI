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
    px-4
    py-3
    bg-blue-600
    text-white
    text-sm
    font-medium
    border
    border-blue-600
    rounded-sm
    transition-all
    duration-200
    hover:bg-blue-700
    hover:border-blue-700
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {children}
</button>
  );
}