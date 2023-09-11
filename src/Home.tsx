import { Flex } from "@react-native-material/core";
import { Appbar, TextInput, Button, Text } from "react-native-paper";

import { fetchWeather, fetchGeolocation, capitalize } from "./functions";
import { GeolocationFields, WeatherFields } from "./types";
import { useState, useEffect } from "react";

import { css } from "./style";
import { H1, H2, H3 } from "./components/components";
import { Image, ImageBackground } from "react-native";

export default function Home({ theme }: { theme?: (theme: string) => void }) {
    const [ cidade,      setCidade      ] = useState<string>            ("Canoas");
    const [ pais,        setPais        ] = useState<string>            ("Brasil");
    const [ weather,     setWeather     ] = useState<WeatherFields>     ();
    const [ geolocation, setGeolocation ] = useState<GeolocationFields> ();
    const [ bgImage,     setBgImage     ] = useState                    (require("./assets/start_bg.jpeg"));
    const [ bgImageType, setBgImageType ] = useState<string>            ("startBG");

    const chuvaDia = "./assets/chuva_dia.jpeg";
    const chuvaNoite = "./assets/chuva_noite.jpeg";
    const neveDia = "./assets/neve_dia.jpeg";
    const neveNoite = "./assets/neve_noite.jpeg";
    const nubladoDia = "./assets/nublado_dia.jpeg";
    const nubladoNoite = "./assets/nublado_noite.jpeg";
    const solDia = "./assets/sol_dia.jpeg";
    const solNoite = "./assets/sol_noite.jpeg";

    async function getWeather() {
        try {
            const reqGeolocation = await fetchGeolocation({
                appid: "API_KEY",
                q: `${cidade},${pais}`,
                limit: 1
            });

            if (reqGeolocation.data.length) {
                try {
                    const geolocation: GeolocationFields = reqGeolocation.data;

                    const response = await fetchWeather({
                        lat: geolocation[0].lat,
                        lon: geolocation[0].lon,
                        units: "metric",
                        lang: "pt_br",
                        appid: "API_KEY"
                    });

                    if (response.status === 200) {
                        setWeather(response.data);
                        setGeolocation(geolocation);

                        switch (response.data.weather[0].main) {
                            case "Thunderstorm": // Tempestade com raios
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(chuvaDia));
                                    setBgImageType("chuvaDia");
                                } else {
                                    setBgImage(require(chuvaNoite));
                                    setBgImageType("chuvaNoite");
                                }
                                theme("dark");
                                break;
                            case "Drizzle": // Chuvisco
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(chuvaDia));
                                    setBgImageType("chuvaDia");
                                } else {
                                    setBgImage(require(chuvaNoite));
                                    setBgImageType("chuvaNoite");
                                }
                                theme("dark");
                                break;
                            case "Rain": // Chuva
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(chuvaDia));
                                    setBgImageType("chuvaDia");
                                } else {
                                    setBgImage(require(chuvaNoite));
                                    setBgImageType("chuvaNoite");
                                }
                                theme("dark");
                                break;
                            case "Snow": // Neve
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(neveDia));
                                    setBgImageType("neveDia");
                                    theme("light");
                                } else {
                                    setBgImage(require(neveNoite));
                                    setBgImageType("neveNoite");
                                    theme("dark");
                                }
                                break;
                            case "Atmosphere": // Condições do ar
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(nubladoDia));
                                    setBgImageType("nubladoDia");
                                    theme("light");
                                } else {
                                    setBgImage(require(nubladoNoite));
                                    setBgImageType("nubladoNoite");
                                    theme("dark");
                                }
                                break;
                            case "Clear": // Sol
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(solDia));
                                    setBgImageType("solDia");
                                    theme("light");
                                } else {
                                    setBgImage(require(solNoite));
                                    setBgImageType("solNoite");
                                    theme("dark");
                                }
                                break;
                            case "Clouds": // Nublado
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(nubladoDia));
                                    setBgImageType("nubladoDia");
                                    theme("light");
                                } else {
                                    setBgImage(require(nubladoNoite));
                                    setBgImageType("nubladoNoite");
                                    theme("dark");
                                }
                                break;
                            case "Mist":
                                if (response.data.weather[0].icon.endsWith("d")) {
                                    setBgImage(require(nubladoDia));
                                    setBgImageType("nubladoDia");
                                    theme("light");
                                } else {
                                    setBgImage(require(nubladoNoite));
                                    setBgImageType("nubladoNoite");
                                    theme("dark");
                                }
                                break;
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <ImageBackground
            source={bgImage}
            style={{ flex: 1 }}
        >
            <Appbar.Header>
                <Appbar.Content title="WeatherApp React Native" />
            </Appbar.Header>

            <Flex
                style={[css.body, css.mt4]}
                fill
                justify="center"
                items="center"
                direction="column"
            >
                <H1 style={[css.mb4, { textAlign: "center" }]}>Weather App</H1>

                <Flex style={css.container} fill content="center">
                    <TextInput
                        label="Cidade"
                        value={cidade}
                        onChangeText={cidade => setCidade(cidade)}
                        style={css.mb3}
                    />
                    <TextInput
                        label="País"
                        value={pais}
                        onChangeText={pais => setPais(pais)}
                        style={css.mb4}
                    />
                    <Button
                        mode="elevated"
                        onPress={() => getWeather()}
                        style={css.mb5}
                    >
                        Enviar
                    </Button>

                    {weather && geolocation && (
                        <Flex
                            fill
                            content="center"
                            items="center"
                            direction="column"
                            style={{ width: "100%" }}
                        >
                            <H3 style={[css.mb3, css.mt4, { color: bgImageType.endsWith("Dia") || !bgImageType.startsWith("chuva") ? "black" : "white" }]}>
                                {geolocation[0].name}, {geolocation[0].state} - {geolocation[0].country}
                            </H3>
                            <Flex
                                shrink={1}
                                content="center"
                                items="center"
                                direction="row"
                                style={{ width: "50%" }}
                            >
                                <Flex shrink={0}>
                                    <Image
                                        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </Flex>
                                <Flex
                                    fill
                                    direction="column"
                                    grow={2}
                                >
                                    <H2 style={{ textAlign: "center", color: bgImageType.endsWith("Dia") || !bgImageType.startsWith("chuva") ? "black" : "white" }}>
                                        {Math.round(weather.main.temp) + " °C"}
                                    </H2>
                                    <Text style={{ textAlign: "center", color: bgImageType.endsWith("Dia") || !bgImageType.startsWith("chuva") ? "black" : "white" }}>
                                        {capitalize(weather.weather[0].description)}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </ImageBackground>
    );
}
