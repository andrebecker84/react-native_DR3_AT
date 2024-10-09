import {Appbar} from "react-native-paper";
import {router} from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const AppBar = (props: any) => {
    const theme = useTheme();

    return <Appbar.Header
                style={{
                    backgroundColor: theme.colorScheme === "dark" ? "rgb(10, 0, 30)" : "transparent",
                }}
            >
                {
                    props.back ? <Appbar.BackAction onPress={() => router.back()}/> : null
                }
                <Appbar.Content {...props}/>
                <Appbar.Action
                    {...props}
                />
            </Appbar.Header>
}

export default AppBar;
