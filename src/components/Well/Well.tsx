import { twMerge } from "@/utils/twMerge";
import { forwardRef } from "react";

export interface WellProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Well = forwardRef<HTMLDivElement, WellProps>(
  ({ children, className }, ref) => {
    const classNames = twMerge(
      "p-3 bg-neutral-950 rounded-3xl overflow-y-auto h-full",
      className,
    );

    return (
      <div ref={ref} className={classNames}>
        {children}
      </div>
    );
  },
);
