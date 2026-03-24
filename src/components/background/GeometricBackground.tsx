interface GeometricBackgroundProps {
  showGridLines?: boolean;
  gridSize?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  topCircleSize?: string;
  bottomCircleSize?: string;
  topCircleOpacity?: string;
  bottomCircleOpacity?: string;
  topCircleBorder?: string;
  bottomCircleBorder?: string;
}

export default function GeometricBackground({
  showGridLines = true,
  gridSize = 50,
  gradientFrom = "from-foreground/80",
  gradientVia = "via-foreground/85",
  gradientTo = "to-foreground/90",
  topCircleSize = "w-96 h-96",
  bottomCircleSize = "w-80 h-80",
  topCircleOpacity = "opacity-30",
  bottomCircleOpacity = "opacity-20",
  topCircleBorder = "border-accent/10",
  bottomCircleBorder = "border-accent/5",
}: GeometricBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}`}
      />

      {/* Geometric Circle - Top Right */}
      <div
        className={`absolute top-10 right-20 ${topCircleSize} rounded-full border ${topCircleBorder} ${topCircleOpacity}`}
      />

      {/* Geometric Circle - Bottom Left */}
      <div
        className={`absolute -bottom-20 -left-40 ${bottomCircleSize} rounded-full border ${bottomCircleBorder} ${bottomCircleOpacity}`}
      />

      {/* Grid Lines */}
      {showGridLines && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}
    </div>
  );
}
