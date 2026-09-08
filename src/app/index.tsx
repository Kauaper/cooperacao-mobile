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

/*
 * ============================================================
 * CORES DA IDENTIDADE VISUAL
 * ============================================================
 */

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
          SOL
          ====================================================== */}

      <Image
        source={require("@/assets/images/sun.png")}
        style={[
          styles.sun,
          {
            width: width * 0.31,
            height: width * 0.31,

            /*
             * Sol um pouco mais para baixo
             */
            left: -width * 0.025,
            top: height * 0.035,
          },
        ]}
        resizeMode="contain"
      />

      {/* ======================================================
          PAINEL PRINCIPAL
          ====================================================== */}

      <View
        style={[
          styles.mainPanel,
          {
            width: width * 0.95,

            /*
             * Painel um pouco mais alto para comportar
             * melhor o espaço entre formulário e Sicoob.
             */
            height: height * 0.58,

            top: height * 0.215,
          },
        ]}
      >
        {/* ==================================================
            LOGO COOPERAÇÃO
            ================================================== */}

        <Image
          source={require("@/assets/images/game-logo.png")}
          style={[
            styles.gameLogo,
            {
              width: width * 0.82,
              height: width * 0.27,
            },
          ]}
          resizeMode="contain"
        />

        {/* ==================================================
            SUBTÍTULO
            ================================================== */}

        <Text style={styles.subtitle}>
          APRENDA A CUIDAR DO DINHEIRO DE FORMA DIVERTIDA
        </Text>

        {/* ==================================================
            FORMULÁRIO
            ================================================== */}

        <View style={styles.formCard}>
          {/* ==================================================
              APELIDO
              ================================================== */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Qual é o seu apelido?</Text>

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
            <Text style={styles.label}>Qual é a sua idade?</Text>

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

        {/* ==================================================
            LOGO SICOOB
            ================================================== */}

        <View style={styles.footer}>
          <Image
            source={require("@/assets/images/sicoob-logo.png")}
            style={styles.sicoobLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* ======================================================
          PORQUINHO
          ====================================================== */}

      <Image
        source={require("@/assets/images/pig.png")}
        style={[
          styles.pig,
          {
            /*
             * Porquinho um pouco maior
             */
            width: width * 0.38,
            height: width * 0.38,

            right: -width * 0.005,

            bottom: height * 0.01,
          },
        ]}
        resizeMode="contain"
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

    position: "relative",
  },

  /*
   * ------------------------------------------------------------
   * SOL
   * ------------------------------------------------------------
   */

  sun: {
    position: "absolute",

    zIndex: 1,
  },

  /*
   * ------------------------------------------------------------
   * PAINEL PRINCIPAL
   * ------------------------------------------------------------
   */

  mainPanel: {
    position: "absolute",

    left: "2.5%",

    backgroundColor: COLORS.navy,

    borderRadius: 14,

    alignItems: "center",

    paddingTop: 5,

    paddingBottom: 9,

    overflow: "hidden",

    zIndex: 2,
  },

  /*
   * ------------------------------------------------------------
   * LOGO COOPERAÇÃO
   * ------------------------------------------------------------
   */

  gameLogo: {
    marginTop: 0,

    marginBottom: 0,
  },

  /*
   * ------------------------------------------------------------
   * SUBTÍTULO
   * ------------------------------------------------------------
   */

  subtitle: {
    color: COLORS.white,

    fontSize: 7,

    lineHeight: 9,

    fontWeight: "800",

    textAlign: "center",

    marginTop: -1,

    marginBottom: 7,

    letterSpacing: 0.1,
  },

  /*
   * ------------------------------------------------------------
   * CARD BRANCO
   * ------------------------------------------------------------
   */

  formCard: {
    width: "94%",

    backgroundColor: COLORS.white,

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingTop: 11,

    paddingBottom: 11,
  },

  /*
   * ------------------------------------------------------------
   * CAMPOS
   * ------------------------------------------------------------
   */

  fieldContainer: {
    marginBottom: 7,
  },

  label: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 14,

    fontWeight: "800",

    marginBottom: 3,
  },

  input: {
    width: "100%",

    height: 20,

    backgroundColor: COLORS.white,

    borderWidth: 1.5,

    borderColor: COLORS.inputBorder,

    borderRadius: 6,

    paddingHorizontal: 8,

    paddingVertical: 0,

    color: COLORS.navy,

    fontSize: 8,
  },

  /*
   * ------------------------------------------------------------
   * BOTÃO
   * ------------------------------------------------------------
   */

  button: {
    width: "100%",

    height: 22,

    backgroundColor: COLORS.turquoise,

    borderRadius: 5,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 2,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.2,
  },

  /*
   * ------------------------------------------------------------
   * RODAPÉ SICOOB
   * ------------------------------------------------------------
   */

  footer: {
    alignItems: "center",

    justifyContent: "center",

    /*
     * Aumenta o espaço entre o card branco
     * e a marca Sicoob.
     */
    marginTop: 12,

    width: "100%",
  },

  sicoobLogo: {
    /*
     * Logo maior
     */
    width: 125,

    height: 34,
  },

  /*
   * ------------------------------------------------------------
   * PORQUINHO
   * ------------------------------------------------------------
   */

  pig: {
    position: "absolute",

    zIndex: 3,
  },
});