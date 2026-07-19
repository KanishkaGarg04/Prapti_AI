export default function Button({

    children,

    onClick,

    type="button",

    disabled=false,

    full=true

}){

    return(

        <button

        type={type}

        disabled={disabled}

        onClick={onClick}

        className={`

        ${full?"w-full":"w-auto"}

        px-6

        py-3

        bg-gray-900

        text-white

        text-sm

        font-medium

        border

        border-gray-900

        rounded-sm

        hover:bg-black

        hover:shadow-md

        active:scale-[0.98]

        disabled:opacity-50

        transition-all

        `}

        >

            {children}

        </button>

    )

}