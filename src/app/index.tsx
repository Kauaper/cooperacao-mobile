import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
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

  const isMobile = width < 600;
  const isShortScreen = height < 650;

  const panelWidth = Math.min(width - (isMobile ? 28 : 48), 500);

  const handleStart = () => {
    const playerAge = Number.parseInt(age, 10);

    if (
      !name.trim() ||
      !age ||
      !Number.isInteger(playerAge) ||
      playerAge < 6 ||
      playerAge > 17
    ) {
      return;
    }

    Keyboard.dismiss();
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
    name.trim().length > 0 &&
    age.length > 0 &&
    Number.parseInt(age, 10) >= 6 &&
    Number.parseInt(age, 10) <= 17;

  const logoHeight = Math.min(
    panelWidth * 0.29,
    isMobile ? 118 : 140
  );

  const decorationSize = Math.min(
    Math.max(width * 0.24, 100),
    180
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decoração do fundo: não interfere no formulário */}
      <View
        pointerEvents="none"
        style={styles.backgroundDecorations}
      >
        <Image
          source={require("@/assets/images/sun.png")}
          style={[
            styles.sun,
            {
              width: decorationSize,
              height: decorationSize,
              left: -decorationSize * 0.25,
              top: 8,
            },
          ]}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/pig.png")}
          style={[
            styles.pig,
            {
              width: decorationSize,
              height: decorationSize,
              right: isMobile ? 4 : 24,
              bottom: 8,
            },
          ]}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: height,
            paddingTop: isShortScreen
              ? 12
              : isMobile
                ? 24
                : 32,
            paddingBottom: isShortScreen ? 16 : 28,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={[
            styles.mainPanel,
            {
              width: panelWidth,
              paddingTop: isShortScreen ? 8 : 14,
              paddingBottom: isShortScreen ? 12 : 18,
              paddingHorizontal: isMobile ? 12 : 18,
            },
          ]}
        >
          {/* Logo principal */}
          <Image
            source={require("@/assets/images/game-logo.png")}
            style={[
              styles.gameLogo,
              {
                width: "100%",
                height: logoHeight,
              },
            ]}
            resizeMode="contain"
          />

          {/* Subtítulo */}
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: isMobile ? 9 : 11,
                marginBottom: isShortScreen ? 10 : 14,
              },
            ]}
          >
            APRENDA A CUIDAR DO DINHEIRO DE FORMA DIVERTIDA
          </Text>

          {/* Formulário */}
          <View
            style={[
              styles.formCard,
              {
                paddingHorizontal: isMobile ? 14 : 22,
                paddingTop: isShortScreen ? 14 : 20,
                paddingBottom: isShortScreen ? 14 : 20,
              },
            ]}
          >
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
                autoCorrect={false}
                maxLength={30}
                returnKeyType="next"
                accessibilityLabel="Apelido do jogador"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Qual é a sua idade?
              </Text>

              <TextInput
                value={age}
                onChangeText={(value) =>
                  setAge(value.replace(/[^0-9]/g, "").slice(0, 2))
                }
                keyboardType="number-pad"
                placeholder="Digite sua idade"
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                maxLength={2}
                returnKeyType="done"
                accessibilityLabel="Idade do jogador"
                onSubmitEditing={() => {
                  if (isValid) {
                    handleStart();
                  }
                }}
              />
            </View>

            <TouchableOpacity
              onPress={handleStart}
              disabled={!isValid}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Começar aventura"
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
              accessibilityLabel="Sicoob"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.turquoise,
    position: "relative",
  },

  backgroundDecorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

  sun: {
    position: "absolute",
  },

  pig: {
    position: "absolute",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    flexGrow: 1,
  },

  mainPanel: {
    maxWidth: 500,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: COLORS.navy,
    borderRadius: 22,
    overflow: "hidden",
    zIndex: 2,
  },

  gameLogo: {
    maxWidth: "100%",
    alignSelf: "center",
  },

  subtitle: {
    width: "100%",
    color: COLORS.white,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 15,
    letterSpacing: 0.1,
    flexShrink: 1,
  },

  formCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    color: COLORS.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    marginBottom: 7,
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 0,
    color: COLORS.navy,
    fontSize: 15,
    outlineStyle: "none",
  } as any,

  button: {
    width: "100%",
    minHeight: 48,
    backgroundColor: COLORS.turquoise,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  sicoobLogo: {
    width: 155,
    height: 42,
  },
});