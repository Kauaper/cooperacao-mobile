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
  navy: "#003F4A",
  yellow: "#D7E900",
  white: "#FFFFFF",
};

export default function CharacterSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const [selectedCharacter, setSelectedCharacter] = useState("");

  const { width, height } = useWindowDimensions();

  /*
   * ============================================================
   * PERSONAGENS
   * ============================================================
   */

  const characters = [
    {
      id: "girl1",
      image: require("@/assets/images/characters/girl1.png"),
      description: "Criativa e\nsonhadora",
    },
    {
      id: "boy1",
      image: require("@/assets/images/characters/boy1.png"),
      description: "Aventureiro e\ncorajoso",
    },
    {
      id: "girl2",
      image: require("@/assets/images/characters/girl2.png"),
      description: "Inteligente e\norganizada",
    },
    {
      id: "boy2",
      image: require("@/assets/images/characters/boy2.png"),
      description: "Esportivo e\ndeterminado",
    },
    {
      id: "girl3",
      image: require("@/assets/images/characters/girl3.png"),
      description: "Artística e\nexpressiva",
    },
    {
      id: "boy3",
      image: require("@/assets/images/characters/boy3.png"),
      description: "Tecnológico e\ninovador",
    },
  ];

  /*
   * ============================================================
   * CONFIRMAR
   * ============================================================
   */

  const handleConfirm = () => {
    if (!selectedCharacter) return;

    updateGameState({
      selectedCharacter,
    });

    router.push("/pet-selection");
  };

  const selectedCharacterData = characters.find(
    (character) => character.id === selectedCharacter,
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* ======================================================
          LOGOS
          ====================================================== */}

      <View
        style={[
          styles.topBar,
          {
            width: width * 0.84,
            height: height * 0.085,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={[
            styles.gameLogo,
            {
              width: width * 0.40,
              height: width * 0.14,
            },
          ]}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={[
            styles.sicoobLogo,
            {
              width: width * 0.32,
              height: width * 0.13,
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
            width: width * 0.95,
            height: height * 0.68,
            borderRadius: width * 0.075,
          },
        ]}
      >

        {/* ====================================================
            TÍTULO
            ==================================================== */}

        <View
          style={[
            styles.header,
            {
              paddingTop: height * 0.018,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: width * 0.050,
                lineHeight: width * 0.058,
              },
            ]}
          >
            ESCOLHA SEU{"\n"}PERSONAGEM
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                fontSize: width * 0.034,
                lineHeight: width * 0.041,
              },
            ]}
          >
            {gameState.playerName}, qual personagem{"\n"}
            representa melhor você?
          </Text>
        </View>

        {/* ====================================================
            GRID
            ==================================================== */}

        <View
          style={[
            styles.grid,
            {
              width: width * 0.89,
              marginTop: height * 0.012,
            },
          ]}
        >
          {characters.map((character) => {
            const isSelected =
              selectedCharacter === character.id;

            return (
              <TouchableOpacity
                key={character.id}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedCharacter(character.id)
                }
                style={[
                  styles.characterCard,
                  {
                    width: width * 0.275,
                    height: width * 0.235,
                    borderRadius: width * 0.025,
                  },
                  isSelected && styles.selectedCharacter,
                ]}
              >

                {/* IMAGEM */}

                <Image
                  source={character.image}
                  style={[
                    styles.characterImage,
                    {
                      width: width * 0.13,
                      height: width * 0.13,
                    },
                  ]}
                  resizeMode="contain"
                />

                {/* DESCRIÇÃO */}

                <Text
                  style={[
                    styles.characterDescription,
                    {
                      fontSize: width * 0.022,
                      lineHeight: width * 0.025,
                    },
                  ]}
                >
                  {character.description}
                </Text>

              </TouchableOpacity>
            );
          })}
        </View>

        {/* ====================================================
            PREVIEW
            ==================================================== */}

        {selectedCharacterData && (
          <View
            style={[
              styles.preview,
              {
                width: width * 0.82,
                height: width * 0.20,
                borderRadius: width * 0.025,
                marginTop: height * 0.012,
              },
            ]}
          >
            <Image
              source={selectedCharacterData.image}
              style={[
                styles.previewImage,
                {
                  width: width * 0.14,
                  height: width * 0.14,
                },
              ]}
              resizeMode="contain"
            />

            <View style={styles.previewText}>
              <Text
                style={[
                  styles.previewTitle,
                  {
                    fontSize: width * 0.040,
                    lineHeight: width * 0.032,
                  },
                ]}
              >
                Você escolheu
              </Text>

              <Text
                style={[
                  styles.previewTitle,
                  {
                    fontSize: width * 0.040,
                    lineHeight: width * 0.032,
                  },
                ]}
              >
                este personagem!
              </Text>

              <Text
                style={[
                  styles.previewDescription,
                  {
                    fontSize: width * 0.021,
                    lineHeight: width * 0.024,
                  },
                ]}
              >
                {selectedCharacterData.description.replace("\n", " ")}
              </Text>
            </View>
          </View>
        )}

        {/* ====================================================
            BOTÃO
            ==================================================== */}

        <TouchableOpacity
          style={[
            styles.button,
            {
              width: width * 0.82,
              height: width * 0.085,
              borderRadius: width * 0.018,
              marginTop: height * 0.014,
            },
            !selectedCharacter && styles.buttonDisabled,
          ]}
          disabled={!selectedCharacter}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: width * 0.030,
              },
            ]}
          >
            CONTINUAR
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  /*
   * ==========================================================
   * TELA
   * ==========================================================
   */

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,

    alignItems: "center",

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * LOGOS
   * ==========================================================
   */

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    alignSelf: "center",
  },

  gameLogo: {
    resizeMode: "contain",
  },

  sicoobLogo: {
    resizeMode: "contain",
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.navy,

    alignItems: "center",

    alignSelf: "center",

    overflow: "hidden",

    paddingBottom: 12,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    width: "100%",

    alignItems: "center",

    justifyContent: "center",
  },

  title: {
    color: COLORS.yellow,

    fontWeight: "900",

    textAlign: "center",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 5,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * GRID
   * ==========================================================
   */

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    rowGap: 8,
  },

  /*
   * ==========================================================
   * PERSONAGEM
   * ==========================================================
   */

  characterCard: {
    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 3,

    marginBottom: 0,

    overflow: "hidden",
  },

  selectedCharacter: {
    backgroundColor: COLORS.yellow,

    borderWidth: 3,

    borderColor: COLORS.yellow,
  },

  characterImage: {
    resizeMode: "contain",

    marginBottom: 0,
  },

  characterDescription: {
    color: COLORS.navy,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * PREVIEW
   * ==========================================================
   */

  preview: {
    backgroundColor: COLORS.turquoise,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 10,
  },

  previewImage: {
    resizeMode: "contain",

    marginRight: 8,
  },

  previewText: {
    flex: 1,

    justifyContent: "center",
  },

  previewTitle: {
    color: COLORS.white,

    fontWeight: "900",

    fontStyle: "italic",

    includeFontPadding: false,
  },

  previewDescription: {
    color: COLORS.white,

    fontWeight: "700",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO
   * ==========================================================
   */

  button: {
    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonDisabled: {
    backgroundColor: COLORS.navy,

    borderWidth: 2,

    borderColor: "#6E7E00",
  },

  buttonText: {
    color: COLORS.navy,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },
});