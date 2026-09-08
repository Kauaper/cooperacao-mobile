import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
};

/*
 * ============================================================
 * TELA DE APRESENTAÇÃO
 * ============================================================
 */

export default function PresentationScreen() {
  const { gameState } = useGame();

  const [currentStep, setCurrentStep] = useState(0);

  const { width, height } = useWindowDimensions();

  /*
   * ============================================================
   * CONTEÚDO ORIGINAL
   * ============================================================
   */

  const childContent = [
    {
      title: `Oi, ${gameState.playerName}!`,

      highlight: "Que incrível ter você no CooperAção!",

      content: `Você tem ${gameState.playerAge} anos e está na idade perfeita para começar a aprender sobre dinheiro de uma forma super divertida!`,

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
          LOGOS SUPERIORES
          ====================================================== */}

      <View
        style={[
          styles.topBar,
          {
            width: width * 0.84,
            height: height * 0.115,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={[
            styles.gameLogo,
            {
              width: width * 0.40,
              height: width * 0.16,
            },
          ]}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={[
            styles.sicoobLogo,
            {
              width: width * 0.35,
              height: width * 0.15,
            },
          ]}
          resizeMode="contain"
        />
      </View>

      {/* ======================================================
          CARD PRINCIPAL
          ====================================================== */}

      <View
        style={[
          styles.card,
          {
            width: width * 0.97,
            height: height * 0.605,
            borderRadius: width * 0.075,
          },
        ]}
      >

        {/* ====================================================
            CABEÇALHO
            ==================================================== */}

        <View
          style={[
            styles.cardHeader,
            {
              height: height * 0.165,
              paddingHorizontal: width * 0.075,
            },
          ]}
        >

          {/* ==================================================
              CARINHA FELIZ
              ================================================== */}

          <View
            style={[
              styles.avatar,
              {
                width: width * 0.205,
                height: width * 0.205,
                borderRadius: width * 0.105,
                marginRight: width * 0.045,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/happy-face.png")}
              style={[
                styles.avatarImage,
                {
                  width: width * 0.165,
                  height: width * 0.165,
                },
              ]}
              resizeMode="contain"
            />
          </View>

          {/* ==================================================
              TÍTULO
              ================================================== */}

          <Text
            style={[
              styles.title,
              {
                fontSize: width * 0.055,
                lineHeight: width * 0.062,
              },
            ]}
          >
            {content[currentStep].title}
          </Text>

        </View>

        {/* ====================================================
            CONTEÚDO
            ==================================================== */}

        <View
          style={[
            styles.content,
            {
              paddingHorizontal: width * 0.025,
            },
          ]}
        >

          {/* ==================================================
              MENSAGEM
              ================================================== */}

          <View
            style={[
              styles.messageBox,
              {
                height: height * 0.285,
                borderRadius: width * 0.035,
                paddingHorizontal: width * 0.055,
              },
            ]}
          >

            {content[currentStep].highlight ? (
              <View style={styles.messageContent}>

                <Text
                  style={[
                    styles.messageHighlight,
                    {
                      fontSize: width * 0.041,
                      lineHeight: width * 0.050,
                    },
                  ]}
                >
                  {content[currentStep].highlight}
                </Text>

                <Text
                  style={[
                    styles.message,
                    {
                      fontSize: width * 0.041,
                      lineHeight: width * 0.052,
                    },
                  ]}
                >
                  {content[currentStep].content}
                </Text>

              </View>
            ) : (
              <Text
                style={[
                  styles.message,
                  {
                    fontSize: width * 0.041,
                    lineHeight: width * 0.055,
                  },
                ]}
              >
                {content[currentStep].content}
              </Text>
            )}

          </View>

          {/* ==================================================
              INDICADORES
              ================================================== */}

          <View
            style={[
              styles.dots,
              {
                height: height * 0.055,
              },
            ]}
          >
            {content.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: width * 0.028,
                    height: width * 0.028,
                    borderRadius: width * 0.014,
                    marginHorizontal: width * 0.014,
                  },
                  index === currentStep
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* ==================================================
              BOTÃO
              ================================================== */}

          <TouchableOpacity
            style={[
              styles.button,
              {
                height: height * 0.052,
                borderRadius: width * 0.018,
                marginHorizontal: width * 0.045,
              },
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: width * 0.034,
                },
              ]}
            >
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
   * TELA
   * ------------------------------------------------------------
   */

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,

    alignItems: "center",

    justifyContent: "flex-start",

    overflow: "hidden",

    width: "100%",
  },

  /*
   * ------------------------------------------------------------
   * LOGOS
   * ------------------------------------------------------------
   */

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    alignSelf: "center",

    paddingHorizontal: 0,
  },

  gameLogo: {
    resizeMode: "contain",
  },

  sicoobLogo: {
    resizeMode: "contain",
  },

  /*
   * ------------------------------------------------------------
   * CARD PRINCIPAL
   * ------------------------------------------------------------
   */

  card: {
    backgroundColor: COLORS.navy,

    alignSelf: "center",

    overflow: "hidden",

    marginTop: 0,

    /*
     * Centralização horizontal explícita.
     */
  },

  /*
   * ------------------------------------------------------------
   * CABEÇALHO
   * ------------------------------------------------------------
   */

  cardHeader: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "flex-start",
  },

  /*
   * ------------------------------------------------------------
   * AVATAR
   * ------------------------------------------------------------
   */

  avatar: {
    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  avatarImage: {
    resizeMode: "contain",
  },

  /*
   * ------------------------------------------------------------
   * TÍTULO
   * ------------------------------------------------------------
   */

  title: {
    flex: 1,

    color: COLORS.white,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  /*
   * ------------------------------------------------------------
   * CONTEÚDO
   * ------------------------------------------------------------
   */

  content: {
    flex: 1,

    width: "100%",
  },

  /*
   * ------------------------------------------------------------
   * CAIXA BRANCA
   * ------------------------------------------------------------
   */

  messageBox: {
    width: "100%",

    backgroundColor: COLORS.white,

    justifyContent: "center",

    alignItems: "center",
  },

  messageContent: {
    width: "100%",

    alignItems: "center",

    justifyContent: "center",
  },

  /*
   * ------------------------------------------------------------
   * DESTAQUE
   * ------------------------------------------------------------
   */

  messageHighlight: {
    width: "100%",

    color: COLORS.navy,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 10,

    includeFontPadding: false,
  },

  /*
   * ------------------------------------------------------------
   * TEXTO NORMAL
   * ------------------------------------------------------------
   */

  message: {
    width: "100%",

    color: COLORS.navy,

    fontWeight: "500",

    textAlign: "center",

    includeFontPadding: false,
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
  },

  dot: {
    flexShrink: 0,
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
    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.navy,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },
});