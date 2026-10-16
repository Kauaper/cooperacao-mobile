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

  const handleConfirm = () => {
    if (!selectedCharacter) return;

    updateGameState({ selectedCharacter });
    router.push("/pet-selection");
  };

  const selectedCharacterData = characters.find(
    (character) => character.id === selectedCharacter
  );

  // Dimensões do layout
  const panelWidth = Math.min(width * 0.95, 500);
  const panelHeight = selectedCharacter ? height * 0.73 : height * 0.61;
  const panelRadius = Math.min(width * 0.065, 24);
  const innerWidth = panelWidth - 18;
  const gridGap = Math.max(5, width * 0.018);
  const characterWidth = (innerWidth - gridGap * 2) / 3;
  const characterHeight = Math.max(50, Math.min(width * 0.325, 86));
  const characterImageSize = Math.min(width * 0.145, 54);

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGOS SUPERIORES */}
      <View
        style={[
          styles.topBar,
          {
            width: width * 0.88,
            height: height * 0.085,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={{
            width: width * 0.43,
            height: width * 0.15,
          }}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={{
            width: width * 0.36,
            height: width * 0.14,
          }}
          resizeMode="contain"
        />
      </View>

      {/* PAINEL PRINCIPAL */}
      <View
        style={[
          styles.card,
          {
            width: panelWidth,
            height: panelHeight,
            borderRadius: panelRadius,
          },
        ]}
      >
        {/* TÍTULO E SUBTÍTULO */}
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
                fontSize: Math.min(width * 0.05, 21),
                lineHeight: Math.min(width * 0.055, 23),
              },
            ]}
          >
            ESCOLHA SEU{"\n"}PERSONAGEM
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                fontSize: Math.min(width * 0.034, 14),
                lineHeight: Math.min(width * 0.041, 16),
              },
            ]}
          >
            {gameState.playerName}, qual personagem{"\n"}
            representa melhor você?
          </Text>
        </View>

        {/* GRADE DE PERSONAGENS */}
        <View
          style={[
            styles.grid,
            {
              width: innerWidth,
              columnGap: gridGap,
              rowGap: Math.max(5, width * 0.018),
              marginTop: height * 0.018,
            },
          ]}
        >
          {characters.map((character) => {
            const isSelected = selectedCharacter === character.id;

            return (
              <TouchableOpacity
                key={character.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCharacter(character.id)}
                style={[
                  styles.characterCard,
                  {
                    width: characterWidth,
                    height: characterHeight,
                    borderRadius: Math.min(width * 0.025, 9),
                  },
                  isSelected && styles.selectedCharacter,
                ]}
              >
                <Image
                  source={character.image}
                  style={{
                    width: characterImageSize,
                    height: characterImageSize,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.characterDescription,
                    {
                      fontSize: Math.max(8, width * 0.022),
                      lineHeight: Math.max(9, width * 0.024),
                    },
                  ]}
                >
                  {character.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PRÉVIA DO PERSONAGEM SELECIONADO */}
        {selectedCharacterData && (
          <View
            style={[
              styles.preview,
              {
                width: innerWidth,
                height: Math.min(width * 0.28, 96),
                borderRadius: Math.min(width * 0.025, 9),
                marginTop: height * 0.018,
              },
            ]}
          >
            <Image
              source={selectedCharacterData.image}
              style={{
                width: Math.min(width * 0.19, 62),
                height: Math.min(width * 0.19, 62),
                marginRight: 7,
              }}
              resizeMode="contain"
            />

            <View style={styles.previewText}>
              <Text
                style={[
                  styles.previewTitle,
                  {
                    fontSize: Math.min(width * 0.033, 16),
                    lineHeight: Math.min(width * 0.037, 18),
                  },
                ]}
              >
                Você escolheu{"\n"}este personagem!
              </Text>

              <Text
                style={[
                  styles.previewDescription,
                  {
                    fontSize: Math.max(9, width * 0.022),
                    lineHeight: Math.max(11, width * 0.026),
                  },
                ]}
              >
                {selectedCharacterData.description.replace("\n", " ")}
              </Text>
            </View>
          </View>
        )}

        {/* BOTÃO CONTINUAR */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: innerWidth * 0.9,
              height: Math.max(30, width * 0.1),
              borderRadius: Math.min(width * 0.018, 6),
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
                fontSize: Math.max(10, width * 0.03),
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
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.turquoise,
    alignItems: "center",
    overflow: "hidden",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  card: {
    backgroundColor: COLORS.navy,
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingBottom: 12,
  },

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

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
  },

  characterCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    overflow: "hidden",
  },

  selectedCharacter: {
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },

  characterDescription: {
    color: COLORS.navy,
    fontWeight: "800",
    textAlign: "center",
    includeFontPadding: false,
  },

  preview: {
    backgroundColor: COLORS.turquoise,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    flexShrink: 0,
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

  button: {
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  buttonDisabled: {
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: "#6E7E00",
  },

  buttonText: {
    color: COLORS.navy,
    fontWeight: "900",
    textTransform: "uppercase",
    includeFontPadding: false,
  },
});