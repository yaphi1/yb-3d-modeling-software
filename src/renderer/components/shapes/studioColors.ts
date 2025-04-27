const studioColors = {
  active: '#d28329',
  hovered: '#F2A349',
  default: '#848586',
};

export function getStudioColor({ isActive, isHovered } : {
  isActive: boolean;
  isHovered: boolean;
}) {
  let color = studioColors.default;
  if (isActive) { color = studioColors.active; }
  if (isHovered) { color = studioColors.hovered; }
  
  return color;
}
