import { cn } from "@Utils/common.utils";
import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { css } from "@emotion/react";
import { useClickOutside } from "@Hooks/useClickOutside";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormColorInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, className, disabled, ...props }, ref) => {
    const inputId = `el--input-color-${Math.round(Math.random() * 1000)}`;

    const pickerRef = useRef<any>(undefined);
    const [color, setColor] = useState("#ffffff");
    const [tmpColor, setTmpColor] = useState(color);
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

    const handleOnPickColor = (color: string) => {
      setColor(color);
      setTmpColor(color);
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
                "peer h-[32px] w-full border border-[#E5E7EA] bg-[#EFEFEF] px-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/20 disabled:cursor-not-allowed disabled:bg-[#EFEFEF]/50 disabled:text-gray-700",
                className,
              )}
              ref={ref}
              id={inputId}
              required={required}
              disabled={disabled}
              value={tmpColor}
              onChange={(e) => {
                const v = e.target.value;
                setTmpColor(v);
                if (/^#[0-9A-F]{6}$/i.test(v)) {
                  setColor(v);
                }
              }}
              {...props}
            />
            <button
              id={`${inputId}-preview`}
              type="button"
              className="h-auto w-10 border border-[#E5E7EA] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500/20 peer-disabled:cursor-not-allowed"
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
          <div ref={pickerRef} className="absolute left-[50%] top-[100%] mt-2 -translate-x-1/2">
            <HexColorPicker color={color} onChange={handleOnPickColor} />
          </div>
        )}
      </div>
    );
  },
);
