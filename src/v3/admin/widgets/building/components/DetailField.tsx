import { cn } from "@Utils/common.utils";
import Button from "@v3/admin/shared/Button";
import React, { InputHTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc: string;
  fieldKey?: string;
  editable?: boolean;
  editDesc?: string;
  enableEdit?: boolean;
  loading?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  customInput?: () => JSX.Element;
  onSave?: (key: any) => void;
}

const DetailField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      desc,
      fieldKey,
      editable = true,
      editDesc,
      enableEdit,
      customInput,
      loading = false,
      onSave,
      type = "text",
      name,
      className,
      ...props
    },
    ref,
  ) => {
    const elId = `el--input-${uuidv4()}`;

    return (
      <div className="rounded-md border border-gray-300 shadow-sm">
        <div className="p-8">
          <label htmlFor={elId} className="block cursor-pointer pb-2 text-base font-bold">
            {label}
          </label>
          <div className="pb-2 text-sm font-normal text-gem-onyx/70">{desc}</div>
          {customInput ? (
            customInput()
          ) : (
            <input
              className={cn(
                "h-[34px] w-1/3 min-w-[300px] rounded-md rounded-r-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gem-onyx/80 focus:outline-2 focus:focus:outline-gem-onyx/80 disabled:cursor-not-allowed disabled:opacity-80",
                className,
              )}
              ref={ref}
              id={elId}
              type={type}
              name={name}
              {...props}
            />
          )}
        </div>
        {editable && enableEdit && (
          <div className="flex items-center justify-between border-t border-t-gray-300 bg-[#FAFAFA] px-8 py-3">
            {editDesc ? (
              <div className="text-sm font-normal text-gem-onyx/80">{editDesc}</div>
            ) : (
              <div />
            )}
            <Button
              loading={loading}
              onClick={() => {
                onSave && onSave(fieldKey!);
              }}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    );
  },
);

DetailField.displayName = "UI/DetailField";

export default DetailField;
