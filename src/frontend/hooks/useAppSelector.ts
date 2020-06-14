import {useSelector} from "react-redux";
import type AppData from "../redux/AppData";

export default function useAppSelector<T>(
    functor: (state: AppData.State) => T,
    equalityFn?: (left: T, right: T) => boolean
): T {
    return useSelector(functor, equalityFn);
}