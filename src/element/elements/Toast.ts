import toast from "react-hot-toast";

export const toastNotify = (message: string) => {
    toast(message, {
        style: {
            borderRadius: '10px',
            background: '#333',
            textAlign: "center",
            color: '#fff',
        }
    })
}