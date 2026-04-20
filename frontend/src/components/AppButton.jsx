export default function AppButton({
  children,
  type = "button",
  variant = "primary", // primary | secondary
  size = "md", // sm | md | lg
  fullWidth = false,
  disabled = false,
  onClick,
  style = {},
}) {
  const className = [
    "app-btn",
    `app-btn--${variant}`,
    `app-btn--${size}`,
    fullWidth ? "app-btn--full" : "",
    disabled ? "app-btn--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}