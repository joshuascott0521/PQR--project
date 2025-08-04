import { Eye, EyeOff } from "lucide-react";
import { useState, type ElementType } from "react";

type CommonProps = {
    id?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TogglePasswordFieldProps <C extends ElementType> = {
    as?: C;
    wrapperClassName?: string;
    inputClassName?: string;
    rightOffsetClassName?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof CommonProps | "type">
  & CommonProps;

export function WrapperVisibilidadPassword<C extends ElementType = "input">({
    as,
    id,
    wrapperClassName = "w-full",
    inputClassName = "",
    label,
    value,
    onChange,
    rightOffsetClassName,
    ...rest
}: TogglePasswordFieldProps<C>){
    const [visible, setVisible] = useState(false);
    const Comp = (as || "input") as ElementType;

    return(
        <div className={`relative ${wrapperClassName}`}>
            <Comp
                id = {id}
                className = {`w-full pr-8 ${inputClassName}`}
                type = {visible ? "text" : "password"}
                value = {value as any}
                onChange = {onChange as any}
                label = {label as any}
                {...(rest as any)}
            />
            <button
                type="button"
                onClick={()=> setVisible((v) => !v)}
                className= {`absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${rightOffsetClassName ?? ""}`}
                tabIndex={-1}
                aria-label= {visible ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            >
                {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    )
}