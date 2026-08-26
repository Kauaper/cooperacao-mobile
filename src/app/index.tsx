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
} from "react-native";

import { useGame } from "@/context/GameContext";

/*
 * ============================================================
 * CORES DA IDENTIDADE VISUAL
 * ============================================================
 *
 * Centralizadas aqui para facilitar qualquer ajuste futuro.
 *
 * TURQUESA  -> fundo da tela e botão
 * AZUL      -> painel principal e textos
 * AMARELO   -> detalhes da identidade
 * BRANCO    -> cards e textos sobre fundo colorido
 */

const COLORS = {
  turquoise: "#16B8B0",
  navy: "#123B5D",
  yellow: "#FFD447",
  white: "#FFFFFF",
  inputBorder: "#D7DDE2",
  placeholder: "#929292",
};

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { updateGameState, resetGame } = useGame();

  /*
   * ============================================================
   * LÓGICA ORIGINAL — NÃO ALTERADA
   * ============================================================
   */

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

      {/* ======================================================
          SOL OFICIAL
          ====================================================== */}

      <Image
        source={require("@/assets/images/sun.png")}
        style={styles.sun}
      />

      {/* ======================================================
          CABEÇALHO
          ====================================================== */}

      <View style={styles.header}>

        <Image
          source={require("@/assets/images/game-logo.png")}
          style={styles.gameLogo}
        />

        <Text style={styles.subtitle}>
          APRENDA A CUIDAR DO DINHEIRO
        </Text>

        <Text style={styles.subtitle}>
          DE FORMA DIVERTIDA
        </Text>

      </View>

      {/* ======================================================
          PAINEL PRINCIPAL
          ====================================================== */}

      <View style={styles.mainPanel}>

        <View style={styles.formCard}>

          {/* ==================================================
              APELIDO
              ================================================== */}

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
            />

          </View>

          {/* ==================================================
              IDADE
              ================================================== */}

          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Quantos anos você tem?
            </Text>

            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Digite sua idade"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
              maxLength={2}
            />

          </View>

          {/* ==================================================
              BOTÃO
              ================================================== */}

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

      {/* ======================================================
          RODAPÉ
          ====================================================== */}

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          UM JOGO DO
        </Text>

        <Image
          source={require("@/assets/images/sicoob-logo.png")}
          style={styles.sicoobLogo}
        />

      </View>

      {/* ======================================================
          PORQUINHO OFICIAL
          ====================================================== */}

      <Image
        source={require("@/assets/images/pig.png")}
        style={styles.pig}
      />

    </SafeAreaView>
  );
}

/*
 * ============================================================
 * ESTILOS
 * ============================================================
 */

const styles = StyleSheet.create({

  /*
   * ------------------------------------------------------------
   * TELA
   * ------------------------------------------------------------
   */

  container: {
    flex: 1,
    backgroundColor: COLORS.turquoise,
    alignItems: "center",
    overflow: "hidden",
  },

  /*
   * ------------------------------------------------------------
   * SOL
   * ------------------------------------------------------------
   */

  sun: {
    position: "absolute",
    width: 125,
    height: 125,
    top: -25,
    left: -22,
    resizeMode: "contain",
  },

  /*
   * ------------------------------------------------------------
   * CABEÇALHO
   * ------------------------------------------------------------
   */

  header: {
    width: "100%",
    alignItems: "center",
    paddingTop: 38,
    paddingHorizontal: 20,
  },

  gameLogo: {
    width: 230,
    height: 82,
    resizeMode: "contain",
    marginBottom: 4,
  },

  subtitle: {
    color: COLORS.white,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 0.9,
    textAlign: "center",
  },

  /*
   * ------------------------------------------------------------
   * PAINEL AZUL
   * ------------------------------------------------------------
   */

  mainPanel: {
    width: "90%",
    flex: 1,
    maxHeight: 455,
    marginTop: 26,
    marginBottom: 8,

    backgroundColor: COLORS.navy,

    borderRadius: 30,

    padding: 17,

    justifyContent: "center",
  },

  /*
   * ------------------------------------------------------------
   * CARD BRANCO
   * ------------------------------------------------------------
   */

  formCard: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 21,

    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 25,
  },

  /*
   * ------------------------------------------------------------
   * CAMPOS
   * ------------------------------------------------------------
   */

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.navy,

    fontSize: 17,
    lineHeight: 21,

    fontWeight: "800",

    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 54,

    backgroundColor: COLORS.white,

    borderWidth: 2,
    borderColor: COLORS.inputBorder,

    borderRadius: 12,

    paddingHorizontal: 15,

    color: COLORS.navy,

    fontSize: 16,
  },

  /*
   * ------------------------------------------------------------
   * BOTÃO
   * ------------------------------------------------------------
   */

  button: {
    width: "100%",
    height: 56,

    backgroundColor: COLORS.turquoise,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 1,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.white,

    fontSize: 17,

    fontWeight: "900",

    letterSpacing: 0.3,
  },

  /*
   * ------------------------------------------------------------
   * RODAPÉ
   * ------------------------------------------------------------
   */

  footer: {
    width: "100%",

    height: 70,

    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 4,
  },

  footerText: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "700",

    letterSpacing: 1,

    marginBottom: 2,
  },

  sicoobLogo: {
    width: 145,
    height: 42,

    resizeMode: "contain",
  },

  /*
   * ------------------------------------------------------------
   * PORQUINHO
   * ------------------------------------------------------------
   */

  pig: {
    position: "absolute",

    width: 120,
    height: 120,

    right: -4,
    bottom: 0,

    resizeMode: "contain",
  },

});