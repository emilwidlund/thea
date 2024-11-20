import { twMerge } from "@/utils/twMerge";

export interface WellProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Well = ({ children, className }: WellProps) => {
  const classNames = twMerge(
    "p-3 bg-neutral-950 rounded-3xl overflow-y-auto h-full flex flex-col",
    className
  );

  return <div className={classNames}>{children}</div>;
};
