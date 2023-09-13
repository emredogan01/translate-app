import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/actions/userActions";
import { useSelector } from "react-redux/es/hooks/useSelector";


useEffect
const UserPage = () => {
    const state = useSelector((store)=> store)

    console.log(state)

    const dispatch = useDispatch();

    useEffect(() => {
        // async aksiyonu çalıştırma
        dispatch(getUsers())
    }, [])

    return (
        <div>
            {state.isLoading ? (
            <p>Yükleniyor...</p>
            ) : (
                !state.isError && (
                <p >
                    {state.users.map((user)=> <p key={user.id}>{user.name}</p>)}
                </p>))}
        </div>
    )
}

export default UserPage;