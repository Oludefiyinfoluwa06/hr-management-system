type MessageBoxProps = {
    message: string;
    isError: boolean;
}

const MessageBox = ({ message, isError }: MessageBoxProps) => {
    return (
        <div
            className={`fixed top-5 ${isError ? "bg-red-100 border border-red-400 text-red-700" : "bg-green-100 border border-green-400 text-green-700"} rounded-md p-4 z-50 duration-500 ${message === "" ? "right-[-100%]" : "right-5"}`}
            role="alert"
        >
            {message}
        </div>
    );
}

export default MessageBox;