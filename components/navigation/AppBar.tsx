import {Appbar} from "react-native-paper";
import {router} from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const AppBar = (props: any) => {
    const theme = useTheme();
    const backActionColor = theme.colorScheme === "dark" ? "#fff" : "#000";

    return <Appbar.Header
                style={{
                    backgroundColor: theme.colorScheme === "dark" ? "rgb(10, 0, 30)" : "rgb(192,191,195)",
                }}
            >
                {props.back ? (
                  <Appbar.BackAction onPress={() => router.back()} color={backActionColor} /> 
                  ) : null
                }
                <Appbar.Content {...props}/>
                <Appbar.Action {...props}/>
            </Appbar.Header>
}

export default AppBar;
