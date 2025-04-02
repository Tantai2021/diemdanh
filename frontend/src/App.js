import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import ConfigRouter from "./routes/ConfigRouter";
function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <ConfigRouter />
                </Router>
            </AuthProvider>
        </>
    );
}

export default App;
