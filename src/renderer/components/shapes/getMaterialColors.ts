const wireframeColors = {
  active: '#d28329',
  hovered: '#F2A349',
  default: '#ffffff',
};

const solidColors = {
  active: '#d28329',
  hovered: '#F2A349',
  default: '#848586',
};

export function getWireframeModeColors({
  isActive,
  isHovered,
}: {
  isActive: boolean;
  isHovered: boolean;
}) {
  let color = wireframeColors.default;
  if (isHovered) {
    color = wireframeColors.hovered;
  }
  if (isActive) {
    color = wireframeColors.active;
  }

  return color;
}

export function getSolidModeColors({
  isActive,
  isHovered,
}: {
  isActive: boolean;
  isHovered: boolean;
}) {
  let color = solidColors.default;
  if (isHovered) {
    color = solidColors.hovered;
  }
  if (isActive) {
    color = solidColors.active;
  }

  return color;
}
