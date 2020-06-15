import {useDispatch} from "react-redux";
import {Actions, makeAction} from "../redux/actions";

export default function useAppDispatch() {
    const dispatch = useDispatch();

    return <T extends keyof Actions>(name: T, data: Actions[T]) => {
        dispatch(makeAction(name, data));
    }
}