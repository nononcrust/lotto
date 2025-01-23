import { cn } from "../lib/utils";

type InputProps = React.ComponentPropsWithRef<"input"> & {
  allowNumberOnly?: boolean;
};

export const Input = ({
  className,
  allowNumberOnly = false,
  ["aria-invalid"]: ariaInvalid,
  ...props
}: InputProps) => {
  const onInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (allowNumberOnly) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  };

  return (
    <input
      className={cn(
        "border border-border h-9 rounded-md px-3 text-sm font-medium",
        ariaInvalid && "border-error",
        className
      )}
      onInput={onInput}
      {...props}
    />
  );
};
