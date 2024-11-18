import { clsx } from "clsx";
import { motion } from "framer-motion";
import { MouseEventHandler, useCallback } from "react";

export interface SwitchProps {
  className?: string;
  active: boolean;
  onToggle?: (enabled: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({
  active,
  onToggle,
  disabled,
  className,
}: SwitchProps) => {
  const containerClassNames = clsx(
    "relative w-6 rounded-full p-1 transition-colors cursor-pointer",
    {
      "bg-neutral-800": !active,
      "bg-accent": active,
      "opacity-30": disabled,
    },
    className,
  );

  const dotClassNames = clsx("rounded-full w-1 h-1", {
    "bg-white": active,
    "bg-neutral-300": !active,
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();

      if (!disabled) {
        onToggle?.(active);
      }
    },
    [onToggle, disabled, active],
  );

  return (
    <div className={containerClassNames} onClick={handleClick}>
      <motion.div
        className={dotClassNames}
        initial={false}
        animate={{ x: active ? 12 : 0 }}
      />
    </div>
  );
};
