import {Surface, Menu as Mn} from "react-native-paper";

const Menu = (props: any) => {
    return props.visible ?
                    <Surface style={{
                        flex: 1,
                        position: "absolute",
                        right: 20,
                        top: 80,
                        borderRadius: 20,
                        padding: 10,
                        zIndex: 10000
                    }} elevation={5}>
                        {
                            props.items.map((item: any, index: number) => {
                                return <Mn.Item
                                    key={index}
                                    leadingIcon="redo"
                                    {...item}
                                    onPress={() => {
                                        item.onPress();
                                        props.setVisible(false);
                                    }}/>
                            })
                        }
                    </Surface> : null
}

export default Menu;
