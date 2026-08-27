import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

/*
 * ============================================================
 * IDENTIDADE VISUAL
 * ============================================================
 */

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  white: "#FFFFFF",
  gray: "#D1D5DB",
};

/*
 * ============================================================
 * TELA DE APRESENTAÇÃO
 * ============================================================
 */

export default function PresentationScreen() {
  const { gameState } = useGame();

  const [currentStep, setCurrentStep] = useState(0);

  /*
   * ============================================================
   * CONTEÚDO ORIGINAL
   * ============================================================
   */

  const childContent = [
    {
      title: `Oi, ${gameState.playerName}!`,
      content: `Que incrível ter você no CooperAção Kids! Você tem ${gameState.playerAge} anos e está na idade perfeita para começar a aprender sobre dinheiro de uma forma super divertida!`,
      emoji: "😊",
    },
    {
      title: "Sua Mesada Especial",
      content: `Como você ainda é uma criança, seus pais te dão uma mesada de R$ ${gameState.monthlyIncome} por mês. Isso é seu tesouro! Vamos aprender a usar esse dinheiro de forma inteligente e divertida!`,
      emoji: "👨‍👩‍👧‍👦",
    },
    {
      title: "Aventura do Aprendizado!",
      content:
        "No CooperAção Kids você vai descobrir como poupar, gastar com sabedoria e fazer seu dinheiro crescer como mágica! E o mais legal: vai cuidar de um bichinho virtual super fofo!",
      emoji: "🎮",
    },
  ];

  const teenContent = [
    {
      title: `Fala, ${gameState.playerName}!`,
      content: `Show de bola te conhecer no CooperAção Kids! Você tem ${gameState.playerAge} anos e já está pronto(a) para encarar o mundo financeiro como um verdadeiro jovem empreendedor!`,
      emoji: "😎",
    },
    {
      title: "Salário de Jovem Aprendiz",
      content: `Como jovem aprendiz, você ganha R$ ${gameState.monthlyIncome} por mês! Agora você tem uma grana própria e pode aprender a administrar como um chefe!`,
      emoji: "💪",
    },
    {
      title: "Sua Missão Financeira",
      content:
        "No CooperAção Kids você vai dominar orçamento, poupança, investimentos e responsabilidades. E ainda vai cuidar de um pet virtual que vai depender das suas decisões financeiras!",
      emoji: "🎯",
    },
  ];

  const content = gameState.isChild
    ? childContent
    : teenContent;

  /*
   * ============================================================
   * NAVEGAÇÃO ORIGINAL
   * ============================================================
   */

  const handleNext = () => {
    if (currentStep < content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/character-selection");
    }
  };

  /*
   * ============================================================
   * INTERFACE
   * ============================================================
   */

  return (
    <SafeAreaView style={styles.container}>

      {/* ======================================================
          LOGOS
          ====================================================== */}

      <View style={styles.topBar}>

        <Image
          source={require("@/assets/images/game-logo.png")}
          style={styles.gameLogo}
        />

        <Image
          source={require("@/assets/images/sicoob-logo.png")}
          style={styles.sicoobLogo}
        />

      </View>

      {/* ======================================================
          CARD PRINCIPAL
          ====================================================== */}

      <View style={styles.card}>

        {/* ----------------------------------------------------
            CABEÇALHO
            ---------------------------------------------------- */}

        <View style={styles.cardHeader}>

          {/* ÍCONE */}
          <View style={styles.avatar}>

            <Text style={styles.avatarEmoji}>
              {content[currentStep].emoji}
            </Text>

          </View>

          {/* TÍTULO */}
          <Text style={styles.title}>
            {content[currentStep].title}
          </Text>

        </View>

        {/* ----------------------------------------------------
            CONTEÚDO
            ---------------------------------------------------- */}

        <View style={styles.content}>

          <View style={styles.messageBox}>

            <Text style={styles.message}>
              {content[currentStep].content}
            </Text>

          </View>

          {/* --------------------------------------------------
              INDICADORES
              -------------------------------------------------- */}

          <View style={styles.dots}>

            {content.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}

          </View>

          {/* --------------------------------------------------
              BOTÃO
              -------------------------------------------------- */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
            activeOpacity={0.8}
          >

            <Text style={styles.buttonText}>
              {currentStep < content.length - 1
                ? "CONTINUAR"
                : "ESCOLHER PERSONAGEM!"}
            </Text>

          </TouchableOpacity>

        </View>

      </View>

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
   * FUNDO
   * ------------------------------------------------------------
   */

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,

    alignItems: "center",

    paddingHorizontal: 20,
  },

  /*
   * ------------------------------------------------------------
   * LOGOS
   * ------------------------------------------------------------
   */

  topBar: {
    width: "100%",

    height: 90,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 16,
  },

  gameLogo: {
    width: 125,
    height: 50,

    resizeMode: "contain",
  },

  sicoobLogo: {
    width: 100,
    height: 40,

    resizeMode: "contain",
  },

  /*
   * ------------------------------------------------------------
   * CARD
   * ------------------------------------------------------------
   */

  card: {
    width: "100%",

    maxWidth: 430,

    backgroundColor: COLORS.navy,

    borderRadius: 28,

    overflow: "hidden",

    marginTop: 5,
  },

  /*
   * ------------------------------------------------------------
   * CABEÇALHO
   * ------------------------------------------------------------
   */

  cardHeader: {
    minHeight: 100,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 22,

    paddingVertical: 17,
  },

  /*
   * ------------------------------------------------------------
   * AVATAR
   * ------------------------------------------------------------
   */

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#FFFFFF",

    borderWidth: 3,

    borderColor: "#B9D600",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  avatarEmoji: {
    fontSize: 29,
  },

  /*
   * ------------------------------------------------------------
   * TÍTULO
   * ------------------------------------------------------------
   */

  title: {
    flex: 1,

    color: COLORS.white,

    fontSize: 17,

    lineHeight: 19,

    fontWeight: "900",

    textTransform: "uppercase",
  },

  /*
   * ------------------------------------------------------------
   * CONTEÚDO
   * ------------------------------------------------------------
   */

  content: {
    paddingHorizontal: 10,

    paddingBottom: 12,
  },

  /*
   * ------------------------------------------------------------
   * CAIXA DE MENSAGEM
   * ------------------------------------------------------------
   */

  messageBox: {
    backgroundColor: COLORS.white,

    borderRadius: 13,

    minHeight: 174,

    paddingHorizontal: 18,

    paddingVertical: 22,

    justifyContent: "center",
  },

  message: {
    color: COLORS.navy,

    fontSize: 14,

    lineHeight: 19,

    fontWeight: "700",

    textAlign: "center",
  },

  /*
   * ------------------------------------------------------------
   * INDICADORES
   * ------------------------------------------------------------
   */

  dots: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    height: 31,
  },

  dot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: COLORS.yellow,
  },

  inactiveDot: {
    backgroundColor: COLORS.white,
  },

  /*
   * ------------------------------------------------------------
   * BOTÃO
   * ------------------------------------------------------------
   */

  button: {
    height: 39,

    backgroundColor: COLORS.yellow,

    borderRadius: 7,

    alignItems: "center",

    justifyContent: "center",

    marginHorizontal: 8,
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textTransform: "uppercase",
  },

});