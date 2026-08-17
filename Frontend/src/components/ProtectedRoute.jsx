import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function ProtectedRoute({children}) {
    const {user, loading} = useAuth();
    if (loading) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center text-center">

                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5">
                    <span className="text-3xl font-extrabold text-white">
                        K
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    KCET Companion
                </h1>

                {/* Subtitle */}
                <p className="mt-1 text-sm text-slate-500">
                    Learn • Practice • Succeed
                </p>

                {/* Spinner */}
                <div className="mt-7 w-9 h-9 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin">
                </div>

                {/* Loading text */}
                <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading your preparation...
                </p>

            </div>
        </div>
    );
}
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;