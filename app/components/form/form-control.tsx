import type { FCC } from "@/types/global";
import { useFormContext } from "react-hook-form";

export interface FormControlProps {
  label: string;
  name: string;
}

export const FormControl: FCC<FormControlProps> = (props) => {
  const { label, name, children } = props;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {errors[name] ? (
          <span className="label-text-alt text-red-500">
            {errors[name]?.message as string}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
};
