import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08B3A7",
  navy: "#003B49",
  yellow: "#FFD447",
  white: "#FFFFFF",
  inputBorder: "#00A99D",
  placeholder: "#777777",
};

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { updateGameState, resetGame } = useGame();
  const { width, height } = useWindowDimensions();

  // Lógica original do jogo preservada.
  const handleStart = () => {
    const playerAge = parseInt(age, 10);

    if (
      !name.trim() ||
      !age ||
      playerAge < 6 ||
      playerAge > 17
    ) {
      return;
    }

    resetGame();

    const isChild = playerAge < 14;
    const monthlyIncome = isChild ? 50 : 300;

    updateGameState({
      playerName: name.trim(),
      playerAge,
      isChild,
      balance: monthlyIncome,
      monthlyIncome,
      currentMonth: 1,
    });

    router.push("/presentation");
  };

  const isValid =
    name.trim() !== "" &&
    age !== "" &&
    parseInt(age, 10) >= 6 &&
    parseInt(age, 10) <= 17;

  // Dimensões proporcionais à tela.
  const panelWidth = Math.min(width * 0.95, 500);
  const panelTop = height * 0.18;

  return (
    <SafeAreaView style={styles.container}>
      {/* Sol */}
      <Image
        source={require("@/assets/images/sun.png")}
        style={[
          styles.sun,
          {
            width: width * 0.34,
            height: width * 0.34,
            left: -width * 0.015,
            top: height * 0.025,
          },
        ]}
        resizeMode="contain"
      />

      {/* Painel principal */}
      <View
        style={[
          styles.mainPanel,
          {
            width: panelWidth,
            left: (width - panelWidth) / 2,
            top: panelTop,
          },
        ]}
      >
        {/* Logo Cooperação */}
        <Image
          source={require("@/assets/images/game-logo.png")}
          style={[
            styles.gameLogo,
            {
              width: panelWidth * 0.91,
              height: width * 0.29,
            },
          ]}
          resizeMode="contain"
        />

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          APRENDA A CUIDAR DO DINHEIRO DE FORMA DIVERTIDA
        </Text>

        {/* Formulário */}
        <View style={styles.formCard}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Qual é o seu apelido?
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Digite seu apelido"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
              autoCapitalize="words"
              maxLength={30}
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Qual é a sua idade?
            </Text>

            <TextInput
              value={age}
              onChangeText={(value) =>
                setAge(value.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Digite sua idade"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
              maxLength={2}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            onPress={handleStart}
            disabled={!isValid}
            activeOpacity={0.8}
            style={[
              styles.button,
              !isValid && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              COMEÇAR AVENTURA!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logo Sicoob */}
        <View style={styles.footer}>
          <Image
            source={require("@/assets/images/sicoob-logo.png")}
            style={styles.sicoobLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Porquinho */}
      <Image
        source={require("@/assets/images/pig.png")}
        style={[
          styles.pig,
          {
            width: width * 0.36,
            height: width * 0.36,
            right: width * 0.025,
            bottom: height * 0.025,
          },
        ]}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.turquoise,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },

  sun: {
    position: "absolute",
    zIndex: 1,
  },

  mainPanel: {
    position: "absolute",
    backgroundColor: COLORS.navy,
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 14,
    overflow: "hidden",
    zIndex: 2,
  },

  gameLogo: {
    marginTop: 0,
    marginBottom: 0,
  },

  subtitle: {
    color: COLORS.white,
    fontSize: 9,
    lineHeight: 13,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 12,
    letterSpacing: 0.1,
    width: "92%",
  },

  formCard: {
    width: "94%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
  },

  fieldContainer: {
    marginBottom: 14,
  },

  label: {
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    marginBottom: 5,
  },

  input: {
    width: "100%",
    height: 34,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: COLORS.navy,
    fontSize: 11,
  },

  button: {
    width: "100%",
    height: 34,
    backgroundColor: COLORS.turquoise,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    width: "100%",
  },

  sicoobLogo: {
    width: 155,
    height: 42,
  },

  pig: {
    position: "absolute",
    zIndex: 3,
  },
});