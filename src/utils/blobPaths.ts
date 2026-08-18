/**
 * Utility functions for generating SVG path commands with organic multi-lobed pinches.
 */

export function generateHorizontalBlobPath(
  width: number,
  lobes: number,
  height: number,
  pinchDepth = 8,
  r = 20,
  spread = 22
): string {
  const lobeW = width / lobes;
  let d = `M ${r} 0`;

  // Top edge (left to right)
  for (let i = 1; i < lobes; i++) {
    const cx = i * lobeW;
    d += ` L ${cx - spread} 0`;
    d += ` C ${cx - spread / 2} 0, ${cx - spread / 4} ${pinchDepth}, ${cx} ${pinchDepth}`;
    d += ` C ${cx + spread / 4} ${pinchDepth}, ${cx + spread / 2} 0, ${cx + spread} 0`;
  }

  d += ` L ${width - r} 0`;
  d += ` A ${r} ${r} 0 0 1 ${width} ${r}`;
  d += ` L ${width} ${height - r}`;
  d += ` A ${r} ${r} 0 0 1 ${width - r} ${height}`;

  // Bottom edge (right to left)
  for (let i = lobes - 1; i >= 1; i--) {
    const cx = i * lobeW;
    d += ` L ${cx + spread} ${height}`;
    d += ` C ${cx + spread / 2} ${height}, ${cx + spread / 4} ${height - pinchDepth}, ${cx} ${height - pinchDepth}`;
    d += ` C ${cx - spread / 4} ${height - pinchDepth}, ${cx - spread / 2} ${height}, ${cx - spread} ${height}`;
  }

  d += ` L ${r} ${height}`;
  d += ` A ${r} ${r} 0 0 1 0 ${height - r}`;
  d += ` L 0 ${r}`;
  d += ` A ${r} ${r} 0 0 1 ${r} 0`;
  d += ` Z`;

  return d;
}

export function generateVerticalBlobPath(
  width: number,
  height: number,
  lobes: number,
  pinchDepth = 9,
  r = 20,
  spread = 22
): string {
  const lobeH = height / lobes;
  let d = `M ${r} 0`;
  d += ` L ${width - r} 0`;
  d += ` A ${r} ${r} 0 0 1 ${width} ${r}`;

  // Right edge (top to bottom)
  for (let i = 1; i < lobes; i++) {
    const cy = i * lobeH;
    d += ` L ${width} ${cy - spread}`;
    d += ` C ${width} ${cy - spread / 2}, ${width - pinchDepth} ${cy - spread / 4}, ${width - pinchDepth} ${cy}`;
    d += ` C ${width - pinchDepth} ${cy + spread / 4}, ${width} ${cy + spread / 2}, ${width} ${cy + spread}`;
  }

  d += ` L ${width} ${height - r}`;
  d += ` A ${r} ${r} 0 0 1 ${width - r} ${height}`;
  d += ` L ${r} ${height}`;
  d += ` A ${r} ${r} 0 0 1 0 ${height - r}`;

  // Left edge (bottom to top)
  for (let i = lobes - 1; i >= 1; i--) {
    const cy = i * lobeH;
    d += ` L 0 ${cy + spread}`;
    d += ` C 0 ${cy + spread / 2}, ${pinchDepth} ${cy + spread / 4}, ${pinchDepth} ${cy}`;
    d += ` C ${pinchDepth} ${cy - spread / 4}, 0 ${cy - spread / 2}, 0 ${cy - spread}`;
  }

  d += ` L 0 ${r}`;
  d += ` A ${r} ${r} 0 0 1 ${r} 0`;
  d += ` Z`;

  return d;
}

export function generateRecorderBlobPath(
  width = 280,
  height = 56,
  pinchX = 224,
  pinchDepth = 8,
  r = 20,
  spread = 22
): string {
  let d = `M ${r} 0`;
  d += ` L ${pinchX - spread} 0`;
  d += ` C ${pinchX - spread / 2} 0, ${pinchX - spread / 4} ${pinchDepth}, ${pinchX} ${pinchDepth}`;
  d += ` C ${pinchX + spread / 4} ${pinchDepth}, ${pinchX + spread / 2} 0, ${pinchX + spread} 0`;
  d += ` L ${width - r} 0`;
  d += ` A ${r} ${r} 0 0 1 ${width} ${r}`;
  d += ` L ${width} ${height - r}`;
  d += ` A ${r} ${r} 0 0 1 ${width - r} ${height}`;
  d += ` L ${pinchX + spread} ${height}`;
  d += ` C ${pinchX + spread / 2} ${height}, ${pinchX + spread / 4} ${height - pinchDepth}, ${pinchX} ${height - pinchDepth}`;
  d += ` C ${pinchX - spread / 4} ${height - pinchDepth}, ${pinchX - spread / 2} ${height}, ${pinchX - spread} ${height}`;
  d += ` L ${r} ${height}`;
  d += ` A ${r} ${r} 0 0 1 0 ${height - r}`;
  d += ` L 0 ${r}`;
  d += ` A ${r} ${r} 0 0 1 ${r} 0`;
  d += ` Z`;

  return d;
}
