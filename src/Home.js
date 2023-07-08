import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const routeToForm = () => {
        navigate('/pizza');
    }

    return (
        <div>
            <button id="order-pizza" onClick={routeToForm}>
                Order Now!
            </button>
        </div>
    )
}