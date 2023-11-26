import { useClickOutside } from "@Hooks/useClickOutside";
import { cn } from "@Utils/common.utils";
import { XCircle } from "lucide-react";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface FormSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initOption?:
    | {
        key: string;
        value: string;
      }
    | undefined
    | null;
  options: {
    key: string;
    value: string;
  }[];
  label?: string;
}

export const FormSelect = React.forwardRef<HTMLInputElement, FormSelectProps>(
  ({ options, label, className, initOption, onChange, ...props }, ref) => {
    const inputId = `el--input-select${uuidv4()}`;

    const dropDownRef = useRef<any>(undefined);
    const [showOptions, setShowOptions] = useState(false);
    const [currOption, setCurrOption] = useState<{
      key: string;
      value: string;
    }>({
      key: "",
      value: "",
    });

    useClickOutside(
      dropDownRef,
      () => {
        setShowOptions(false);
      },
      {
        exclude: [inputId],
      },
    );

    useEffect(() => {
      initOption && setCurrOption(initOption);
    }, []);

    const renderedOptions = useMemo(() => {
      return (
        <div
          ref={dropDownRef}
          className="absolute left-0 right-0 top-[calc(100%+5px)] z-[99] h-auto w-full"
        >
          <div className="max-h-[500px] overflow-auto rounded-md border border-gray-300 bg-white shadow-md">
            {options.map((option, idx) => (
              <div
                key={idx}
                className={cn(
                  "cursor-pointer px-3 py-2 transition-colors duration-200 hover:bg-[#E6E6E2]",
                  {
                    "border-b border-gray-300": idx !== options.length - 1,
                  },
                )}
                onClick={() => {
                  setCurrOption(option);
                  setShowOptions(false);
                  onChange &&
                    onChange({
                      target: { value: option.key },
                    } as ChangeEvent<HTMLInputElement>);
                }}
              >
                <div className="text-sm font-normal text-gem-onyx">{option.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }, [options]);

    return (
      <div className={cn("relative w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block w-fit cursor-pointer pb-2 text-sm font-semibold text-gem-onyx/80"
          >
            {label}
          </label>
        )}

        <div
          className="relative cursor-pointer"
          onClick={() => {
            setShowOptions(true);
          }}
        >
          <input
            className={cn(
              "h-[32px] w-full select-none rounded-md border border-gray-300 px-3 text-sm font-medium text-gem-onyx/80 focus:outline-2 focus:focus:outline-gem-onyx/80",
              { "text-gem-onyx/50": currOption.key === "" },
              className,
            )}
            key={currOption.key}
            value={currOption.value}
            onChange={() => {}}
            ref={ref}
            id={inputId}
            {...props}
          />

          {currOption.key !== "" && (
            <div className="absolute bottom-0 right-0 top-0 h-fit w-fit translate-y-[25%]">
              <button
                type="button"
                className="animate-[fadein_200ms_linear]"
                onClick={() => {
                  setCurrOption({
                    key: "",
                    value: "",
                  });
                  onChange &&
                    onChange({
                      target: { value: "" },
                    } as ChangeEvent<HTMLInputElement>);
                }}
              >
                <XCircle className="mx-2 h-4 w-4 stroke-gem-onyx/80" />
              </button>
            </div>
          )}
        </div>

        {showOptions && renderedOptions}
      </div>
    );
  },
);

FormSelect.displayName = "UI/FormSelect";
