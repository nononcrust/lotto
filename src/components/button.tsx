import { cn } from "../lib/utils";

type ButtonProps = React.ComponentPropsWithRef<"button">;

export const Button = ({
  className,
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-3 inline-flex justify-center items-center font-medium text-sm rounded-lg bg-black text-white hover:opacity-80 transition-colors h-9",
        disabled && "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
