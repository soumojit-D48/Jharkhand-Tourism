import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth()
    const loaction = useLocation()

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">
                    Loading...
                </div>
            </div>
        )
    }

    if(!user) {
        return (
            <Navigate to='/login' state={{from: loaction}} replace/>
        )
    }
    return children
}

export default ProtectedRoute



