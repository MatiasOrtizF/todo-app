import { useContext } from "react";
import { DataContext } from "../context/useData";

export const useData = () => {
    const context = useContext(DataContext)
    return context
}