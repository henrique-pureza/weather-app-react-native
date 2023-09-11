import   React                                          from "react";
import { StatusBar }                                    from "expo-status-bar";
import   Home                                           from "./src/Home";
import { PaperProvider, MD3DarkTheme, MD3LightTheme }   from "react-native-paper";
import { useState, useEffect }                          from "react";
import   * as Orientation                               from "expo-screen-orientation";

export default function App() {
    const [ theme, setTheme ] = useState<string>("dark");

    const themeConfig = theme === "light" ? {...MD3LightTheme} : {...MD3DarkTheme};
    themeConfig.mode = "exact";

    useEffect(() => {
        Orientation.lockAsync(Orientation.OrientationLock.PORTRAIT);

        return () => {
            Orientation.unlockAsync();
        }
    }, []);

    return (
        <PaperProvider theme={themeConfig}>
            <StatusBar style={theme === "light" ? "dark" : "light"} />
            <Home theme={(getTheme) => setTheme(getTheme)} />
        </PaperProvider>
    );
}
