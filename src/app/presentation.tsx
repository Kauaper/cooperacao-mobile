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

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003B49",
  yellow: "#D7E900",
  white: "#FFFFFF",
};

export default function PresentationScreen() {
  const { gameState } = useGame();
  const [currentStep, setCurrentStep] = useState(0);
  const { width, height } = useWindowDimensions();

  const childContent = [
    {
      title: `OI, ${gameState.playerName}!`,
      highlight: "Que incrível ter você no CooperAção!",
      content: `Você tem ${gameState.playerAge} anos e está na idade perfeita para começar a aprender sobre dinheiro de uma forma super divertida!`,
    },
    {
      title: "SUA MESADA ESPECIAL",
      highlight: "Vamos aprender a cuidar do seu dinheiro!",
      content: `Você recebe R$ ${gameState.monthlyIncome} por mês. Vamos descobrir como poupar, planejar seus gastos e realizar seus sonhos!`,
    },
    {
      title: "VAMOS COMEÇAR!",
      highlight: "Prepare-se para uma aventura!",
      content:
        "No CooperAção você vai descobrir como poupar, gastar com sabedoria e fazer seu dinheiro crescer como mágica! E o mais legal: vai cuidar de um bichinho virtual super fofo!",
    },
  ];

  const teenContent = [
    {
      title: `OI, ${gameState.playerName}!`,
      highlight: "Que incrível ter você no CooperAção!",
      content: `Você tem ${gameState.playerAge} anos e já está pronto para aprender a administrar seu dinheiro de forma inteligente e divertida!`,
    },
    {
      title: "SUA RENDA",
      highlight: "Agora é hora de planejar!",
      content: `Você recebe R$ ${gameState.monthlyIncome} por mês. Aprenda a organizar seu orçamento, economizar e tomar decisões financeiras melhores!`,
    },
    {
      title: "SUA MISSÃO",
      highlight: "Vamos nessa?",
      content:
        "Explore o jogo, cuide do seu pet e descubra como suas escolhas podem ajudar você a alcançar seus objetivos!",
    },
  ];

  const content = gameState.isChild ? childContent : teenContent;

  const handleNext = () => {
    if (currentStep < content.length - 1) {
      setCurrentStep((step) => step + 1);
    } else {
      router.push("/character-selection");
    }
  };

  // Dimensões ajustadas para a tela de referência do Figma.
  const panelWidth = Math.min(width * 0.92, 500);
  const panelTop = height * 0.115;
  const panelHeight = Math.min(height * 0.62, 560);

  const avatarSize = width * 0.22;
  const messageHeight = height * 0.265;

  return (
    <SafeAreaView style={styles.container}>
      {/* Logos superiores */}
      <View
        style={[
          styles.topBar,
          {
            width: width * 0.84,
            height: height * 0.105,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={{
            width: width * 0.42,
            height: width * 0.15,
          }}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={{
            width: width * 0.36,
            height: width * 0.15,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Painel principal */}
      <View
        style={[
          styles.card,
          {
            width: panelWidth,
            height: panelHeight,
            top: panelTop,
            borderRadius: width * 0.06,
          },
        ]}
      >
        {/* Cabeçalho */}
        <View
          style={[
            styles.cardHeader,
            {
              height: height * 0.17,
              paddingHorizontal: width * 0.065,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
                marginRight: width * 0.035,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/happy-face.png")}
              style={{
                width: avatarSize * 0.9,
                height: avatarSize * 0.9,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={[
              styles.title,
              {
                fontSize: width * 0.052,
                lineHeight: width * 0.055,
              },
            ]}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {content[currentStep].title}
          </Text>
        </View>

        {/* Área de conteúdo */}
        <View
          style={[
            styles.content,
            {
              paddingHorizontal: width * 0.023,
            },
          ]}
        >
          {/* Cartão branco */}
          <View
            style={[
              styles.messageBox,
              {
                height: messageHeight,
                borderRadius: width * 0.055,
                paddingHorizontal: width * 0.045,
              },
            ]}
          >
            <Text
              style={[
                styles.messageHighlight,
                {
                  fontSize: width * 0.043,
                  lineHeight: width * 0.05,
                },
              ]}
            >
              {content[currentStep].highlight}
            </Text>

            <Text
              style={[
                styles.message,
                {
                  fontSize: width * 0.043,
                  lineHeight: width * 0.05,
                },
              ]}
            >
              {content[currentStep].content}
            </Text>
          </View>

          {/* Indicadores */}
          <View
            style={[
              styles.dots,
              {
                height: height * 0.065,
              },
            ]}
          >
            {content.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: width * 0.03,
                    height: width * 0.03,
                    borderRadius: width * 0.015,
                    marginHorizontal: width * 0.014,
                  },
                  index === currentStep
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* Botão */}
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
                  fontSize: width * 0.038,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.turquoise,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    width: "100%",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  card: {
    position: "absolute",
    backgroundColor: COLORS.navy,
    alignSelf: "center",
    overflow: "hidden",
    paddingTop: 8,
    paddingBottom: 18,
  },

  cardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },

  avatar: {
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    flex: 1,
    color: COLORS.white,
    fontWeight: "900",
    textTransform: "uppercase",
    includeFontPadding: false,
  },

  content: {
    flex: 1,
    width: "100%",
    paddingBottom: 12,
  },

  messageBox: {
    width: "100%",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  messageHighlight: {
    width: "100%",
    color: "#000000",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    includeFontPadding: false,
  },

  message: {
    width: "100%",
    color: "#000000",
    fontWeight: "500",
    textAlign: "center",
    includeFontPadding: false,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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

  button: {
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  buttonText: {
    color: COLORS.navy,
    fontWeight: "900",
    textTransform: "uppercase",
    includeFontPadding: false,
  },
});