import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg'; 

// Define the props interface for the Icon component
interface IconProps extends SvgProps {
  icon: React.FC<SvgProps>; // The SVG component itself
  width?: number; // Optional: Size of the icon (width)
  heeigh?: number; // Optional: Size of the icon (height)
  color?: string; // Optional: Color of the icon (if supported by the SVG)
  className?: string; // Optional: Tailwind classes for the icon container
  [key: string]: any; // Allow any additional props to be passed to the SVG component
}

// Generic Icon component
const Icon: React.FC<IconProps> = ({
  icon: IconComponent, // Rename the prop to IconComponent for clarity
  width = 24, // Default size
  height=24,
  color= 'transparent',
  className,
  ...props
}) => {
  // If no IconComponent is provided, return null or a fallback
  if (!IconComponent) {
    console.warn('No icon component provided');
    return null;
  }

  return (
    <TouchableOpacity className={className}>
      <IconComponent
        width={width}
        height={height}
        fill={color} // Pass color to the SVG (if supported)
        {...props} // Spread any additional props to the SVG component
      />
    </TouchableOpacity>
  );
};

export default Icon;