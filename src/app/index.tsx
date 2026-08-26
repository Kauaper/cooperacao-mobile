import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { updateGameState, resetGame } = useGame();

  const handleStart = () => {
    if (!name || !age || parseInt(age) < 6 || parseInt(age) > 17) {
      return;
    }

    resetGame();

    const playerAge = parseInt(age);
    const isChild = playerAge < 14;
    const monthlyIncome = isChild ? 50 : 300;

    updateGameState({
      playerName: name,
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
    parseInt(age) >= 6 &&
    parseInt(age) <= 17;

  return (
    <SafeAreaView style={styles.container}>
      {/* ELEMENTO DECORATIVO SUPERIOR */}
      <View style={styles.sun}>
        <View style={styles.sunCore} />
        <View style={[styles.sunRay, styles.rayTop]} />
        <View style={[styles.sunRay, styles.rayRight]} />
        <View style={[styles.sunRay, styles.rayBottom]} />
        <View style={[styles.sunRay, styles.rayLeft]} />
      </View>

      {/* CABEÇALHO */}
      <View style={styles.topArea}>
        <Text style={styles.logo}>
          Cooper<Text style={styles.logoAccent}>A</Text>ção
        </Text>

        <Text style={styles.subtitle}>
          APRENDA A CUIDAR DO DINHEIRO
        </Text>

        <Text style={styles.subtitle}>
          DE FORMA DIVERTIDA
        </Text>
      </View>

      {/* PAINEL PRINCIPAL */}
      <View style={styles.mainPanel}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Qual é o seu apelido?</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu apelido"
            placeholderTextColor="#9AA3AD"
            style={styles.input}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Quantos anos você tem?</Text>

          <TextInput
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Digite sua idade"
            placeholderTextColor="#9AA3AD"
            style={styles.input}
            maxLength={2}
          />

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
      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Text style={styles.footerSmall}>UM JOGO DO</Text>

        <Text style={styles.sicoob}>
          SICOOB
        </Text>

        <Text style={styles.footerPartner}>
          Credial
        </Text>
      </View>

      {/* ELEMENTO DECORATIVO */}
      <View style={styles.piggyBank}>
        <View style={styles.piggyBody}>
          <View style={styles.piggyEar} />
          <View style={styles.piggyEye} />
          <View style={styles.piggyNose} />
        </View>

        <View style={styles.piggyLegOne} />
        <View style={styles.piggyLegTwo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18B8B0",
    alignItems: "center",
    overflow: "hidden",
  },

  /* =========================
     SOL
     ========================= */

  sun: {
    position: "absolute",
    top: -42,
    left: -42,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },

  sunCore: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFD447",
  },

  sunRay: {
    position: "absolute",
    width: 15,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#FFD447",
  },

  rayTop: {
    top: 12,
    transform: [{ rotate: "0deg" }],
  },

  rayRight: {
    right: 12,
    transform: [{ rotate: "90deg" }],
  },

  rayBottom: {
    bottom: 12,
    transform: [{ rotate: "0deg" }],
  },

  rayLeft: {
    left: 12,
    transform: [{ rotate: "90deg" }],
  },

  /* =========================
     CABEÇALHO
     ========================= */

  topArea: {
    width: "100%",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 20,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  logoAccent: {
    color: "#FFD447",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 3,
  },

  /* =========================
     PAINEL AZUL
     ========================= */

  mainPanel: {
    width: "91%",
    flex: 1,
    backgroundColor: "#123B62",
    borderRadius: 32,
    marginTop: 28,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 20,
    justifyContent: "center",
    maxHeight: 470,
  },

  /* =========================
     CARD DO FORMULÁRIO
     ========================= */

  formCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 28,
  },

  label: {
    color: "#123B62",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 2,
    borderColor: "#D7DEE5",
    backgroundColor: "#F8FAFB",
    borderRadius: 13,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#123B62",
    marginBottom: 22,
  },

  button: {
    height: 58,
    backgroundColor: "#18B8B0",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  /* =========================
     RODAPÉ
     ========================= */

  footer: {
    height: 66,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },

  footerSmall: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  sicoob: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },

  footerPartner: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
    marginTop: -2,
  },

  /* =========================
     PORQUINHO DECORATIVO
     ========================= */

  piggyBank: {
    position: "absolute",
    right: -8,
    bottom: 8,
    width: 92,
    height: 82,
  },

  piggyBody: {
    position: "absolute",
    right: 5,
    bottom: 13,
    width: 72,
    height: 52,
    borderRadius: 35,
    backgroundColor: "#F58A91",
    transform: [{ rotate: "-5deg" }],
  },

  piggyEar: {
    position: "absolute",
    top: -7,
    left: 13,
    width: 19,
    height: 17,
    borderRadius: 10,
    backgroundColor: "#F58A91",
    transform: [{ rotate: "25deg" }],
  },

  piggyEye: {
    position: "absolute",
    right: 16,
    top: 14,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#123B62",
  },

  piggyNose: {
    position: "absolute",
    right: -5,
    top: 27,
    width: 14,
    height: 11,
    borderRadius: 7,
    backgroundColor: "#E46F79",
  },

  piggyLegOne: {
    position: "absolute",
    right: 48,
    bottom: 5,
    width: 13,
    height: 19,
    borderRadius: 7,
    backgroundColor: "#F58A91",
  },

  piggyLegTwo: {
    position: "absolute",
    right: 16,
    bottom: 5,
    width: 13,
    height: 19,
    borderRadius: 7,
    backgroundColor: "#F58A91",
  },
});