export type GameState = "Playing" | "Failed" | "Succeded";

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;
