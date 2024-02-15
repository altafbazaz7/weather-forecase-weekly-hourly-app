import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-white text-4xl md:text-9xl font-semibold">Weatherify!</h1>
                <h2 className="text-white text-lg md:text-2xl mt-4">Welcome to Weatherify! Your one-stop application to find weather forecasts.</h2>
                <button
                    onClick={() => navigate("/home")}
                    className="mt-8 text-white bg-[coral] px-6 py-3 rounded-md focus:outline-none hover:bg-coral-dark transition-colors">Get Started</button>
            </div>
        </div>
    );
}

export default Landing;
