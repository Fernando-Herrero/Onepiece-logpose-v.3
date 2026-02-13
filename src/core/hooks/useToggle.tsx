import { useState } from "react";

type UseToggleReturn = [boolean, () => void, () => void, () => void];

export const useToggle = (initialValue: boolean = false): UseToggleReturn => {
    const [state, setState] = useState<boolean>(!!initialValue);

    const toggleState = () => setState((prev) => !prev);

    const setTrue = () => setState(true);

    const setFalse = () => setState(false);

    return [state, toggleState, setTrue, setFalse];
};
