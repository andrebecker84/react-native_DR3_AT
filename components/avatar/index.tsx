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

// @ts-ignore
const Avatar = (props: AvatarProps) => {
    const detectTypeAvatar = (props: any) => {
        if(props.source){
            return <Av.Image
                        style={{
                            ...props.style,
                            backgroundColor: props.bgColor
                        }}
                        {...props} />;
        }else if (props.icon) {
            return <Av.Icon
                        style={{
                            ...props.style,
                            backgroundColor: props.bgColor
                        }}
                        {...props} />;
        }else{
            return <Av.Text
                        style={{
                            ...props.style,
                            backgroundColor: props.bgColor
                        }}
                        {...props} />;
        }
    }

    // @ts-ignore
    return detectTypeAvatar(props);
};

Avatar.defaultProps = {
    source: null,
    label: 'XD',
    bgColor: "rgb(223, 70, 97)",
    color: "#333",
}

export default Avatar;
