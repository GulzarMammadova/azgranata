import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "medium" | "large";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  disabled = false,
  className,
}: ButtonProps) {
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
}