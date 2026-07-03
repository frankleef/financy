type PotMarkProps = {
  variant?: "mark" | "tile";
  size?: number;
  className?: string;
};

export function PotMark({ variant = "mark", size = 32, className }: PotMarkProps) {
  if (variant === "tile") {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          background: "#0f6e56",
          borderRadius: "22%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 100 100" width="64%" height="64%" style={{ display: "block" }}>
          <g transform="rotate(-90 50 50)" fill="none" strokeLinecap="butt">
            <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="14" strokeDasharray="89.5 149.26" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="38" stroke="#cfe7df" strokeWidth="14" strokeDasharray="58.47 180.29" strokeDashoffset="-95.5" />
            <circle cx="50" cy="50" r="38" stroke="#a4cec2" strokeWidth="14" strokeDasharray="39.36 199.4" strokeDashoffset="-159.97" />
            <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="14" strokeDasharray="27.43 211.33" strokeDashoffset="-205.33" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    >
      <g transform="rotate(-90 50 50)" fill="none" strokeLinecap="butt">
        <circle cx="50" cy="50" r="38" stroke="#0f6e56" strokeWidth="14" strokeDasharray="89.5 149.26" strokeDashoffset="0" />
        <circle cx="50" cy="50" r="38" stroke="#3f9280" strokeWidth="14" strokeDasharray="58.47 180.29" strokeDashoffset="-95.5" />
        <circle cx="50" cy="50" r="38" stroke="#79b6a6" strokeWidth="14" strokeDasharray="39.36 199.4" strokeDashoffset="-159.97" />
        <circle cx="50" cy="50" r="38" stroke="#b4d6cc" strokeWidth="14" strokeDasharray="27.43 211.33" strokeDashoffset="-205.33" />
      </g>
    </svg>
  );
}
