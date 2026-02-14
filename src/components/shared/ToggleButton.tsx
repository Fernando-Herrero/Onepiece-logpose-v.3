import classNames from "classnames";

interface ToggleButtonProps {
    isOpen: boolean;
}

export const ToggleButton = ({ isOpen }: ToggleButtonProps) => {
    return (
        <button
            type="button"
            className="grid h-6 w-6 shrink-0 place-items-center cursor-pointer rounded-full transition"
        >
            <span
                aria-hidden
                className={classNames(
                    "relative block h-3 w-3",
                    "before:absolute before:inset-x-0 before:top-1/2 before:h-[2px] before:-translate-y-1/2 before:rounded before:bg-white",
                    "after:absolute after:left-1/2 after:top-0 after:h-3 after:w-[2px] after:-translate-x-1/2 after:rounded after:bg-white transition",
                    { "after:opacity-0": isOpen, "after:opacity-100": !isOpen }
                )}
            />
        </button>
    );
};
