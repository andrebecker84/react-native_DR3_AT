import * as React from 'react';
import { Avatar as Av } from 'react-native-paper';

interface AvatarProps {
  source?: any;
  icon?: string;
  label?: string;
  bgColor?: string;
  color?: string;
  style?: object;
  size?: number;
}

const Avatar = ({
  source = null,
  icon,
  label = 'XD',
  bgColor = "rgb(223, 70, 97)",
  color = "#333",
  style,
  size = 100,
  ...rest
}: AvatarProps) => {
  const commonStyles = {
    backgroundColor: bgColor,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const detectTypeAvatar = () => {
    if (source) {
      return <Av.Image source={source} size={size} style={[commonStyles, style]} {...rest} />;
    } else if (icon) {
      return <Av.Icon icon={icon} color={color} size={size} style={[commonStyles, style]} {...rest} />;
    } else {
      return <Av.Text label={label} color={color} style={[commonStyles, style]} {...rest} />;
    }
  };

  return detectTypeAvatar();
};

export default Avatar;
