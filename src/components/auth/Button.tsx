type ButtonProps = {
    text: string;
}

const Button = ({ text }: ButtonProps) => {
    return (
        <button
            className="px-[30px] py-2 bg-blue-800 text-white rounded hover:bg-blue-600 w-full mt-3"
            type="submit"
        >
            {text}
        </button>
    );
}

export default Button;
