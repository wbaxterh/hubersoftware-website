// "Datum" mark (direction 1a): two stems with the crossbar as a datum line.
// Colors and lockup proportions come from the Huber brand guidelines.
// Fonts come from the layout's --font-body / --font-heading variables.
const COLORS = {
  default: { stem: "#1d1f20", bar: "#5980a6", name: "#1d1f20", sub: "#7a7a7d" },
  inverse: { stem: "#f2f2f3", bar: "#94bce3", name: "#f2f2f3", sub: "#9a9ea4" },
} as const;

type Variant = keyof typeof COLORS;

export function HuberMark({
  size = 40,
  variant = "default",
  decorative = false,
}: {
  size?: number;
  variant?: Variant;
  decorative?: boolean;
}) {
  const c = COLORS[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Huber Software"}
      aria-hidden={decorative || undefined}
    >
      <rect x="14" y="12" width="9" height="40" fill={c.stem} />
      <rect x="41" y="12" width="9" height="40" fill={c.stem} />
      <rect x="23" y="29" width="18" height="9" fill={c.bar} />
    </svg>
  );
}

export function HuberLogo({
  size = 40,
  variant = "default",
  className,
}: {
  size?: number;
  variant?: Variant;
  className?: string;
}) {
  const c = COLORS[variant];
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.35 }}
    >
      <HuberMark size={size} variant={variant} decorative />
      <span
        style={{ display: "inline-flex", flexDirection: "column", gap: size * 0.075 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: size * 0.525,
            fontWeight: 500,
            letterSpacing: "0.1em",
            lineHeight: 1,
            color: c.name,
          }}
        >
          HUBER
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading), system-ui, sans-serif",
            fontSize: size * 0.2375,
            letterSpacing: "0.34em",
            lineHeight: 1,
            color: c.sub,
          }}
        >
          SOFTWARE
        </span>
      </span>
    </span>
  );
}
