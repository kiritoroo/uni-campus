import { cn } from "@Utils/common.utils";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { css } from "@emotion/react";
import { useClickOutside } from "@Hooks/useClickOutside";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initColor: string | undefined | null;
  label?: string;
}

export const FormColorInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ initColor, label, required, className, disabled, onChange, ...props }, ref) => {
    const inputId = `el--input-color-${Math.round(Math.random() * 1000)}`;

    const pickerRef = useRef<any>(undefined);
    const [color, setColor] = useState("#ffffff");
    const [tmpColor, setTmpColor] = useState("#ffffff");
    const [showPicker, setShowPicker] = useState(false);

    useClickOutside(
      pickerRef,
      () => {
        showPicker && setShowPicker(false);
      },
      {
        exclude: [`${inputId}-preview`],
      },
    );

    useEffect(() => {
      setColor(initColor ?? "#fff");
      setTmpColor(initColor ?? "#fff");
    }, [initColor]);

    const handleOnPickColor = (color: string) => {
      setColor(color);
      setTmpColor(color);
      onChange &&
        onChange({
          target: { value: color },
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative">
        <div className={cn("w-full")}>
          {label && (
            <label
              htmlFor={inputId}
              className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600"
            >
              {label} {required && <span className="text-red-400">*</span>}
            </label>
          )}

          <div className="flex items-stretch justify-center">
            <input
              className={cn(
                "peer h-[32px] w-full rounded-md rounded-r-none border border-gray-300 bg-[#FAFAFA] px-3 text-sm font-medium text-gray-700 focus:outline-2 focus:outline-gem-onyx disabled:cursor-not-allowed disabled:bg-[#EFEFEF]/50 disabled:text-gray-700",
                className,
              )}
              ref={ref}
              id={inputId}
              required={required}
              disabled={disabled}
              value={tmpColor}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(v)) {
                  handleOnPickColor(v);
                } else {
                  setTmpColor(v);
                }
              }}
              {...props}
            />
            <button
              id={`${inputId}-preview`}
              type="button"
              className={cn(
                "block h-auto w-10 rounded-md rounded-l-none border border-gray-300 peer-disabled:cursor-not-allowed",
                {
                  "outline outline-2 outline-gem-onyx": showPicker,
                },
              )}
              css={css`
                background-color: ${color};
              `}
              onClick={() => {
                if (disabled) return;
                setShowPicker((prev) => !prev);
              }}
            />
          </div>
        </div>
        {showPicker && (
          <div
            ref={pickerRef}
            className="absolute left-[50%] top-[100%] z-[99999] mt-2 -translate-x-1/2"
          >
            <HexColorPicker color={color} onChange={handleOnPickColor} />
          </div>
        )}
      </div>
    );
  },
);
