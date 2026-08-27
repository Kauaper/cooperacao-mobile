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

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  white: "#FFFFFF",
  disabled: "#536D72",
};

export default function CharacterSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const [selectedCharacter, setSelectedCharacter] = useState("");

  const characters = [
    {
      id: "girl1",
      emoji: "👧🏻",
      description: "Criativa e sonhadora",
    },
    {
      id: "boy1",
      emoji: "👦🏻",
      description: "Aventureiro e corajoso",
    },
    {
      id: "girl2",
      emoji: "👧🏽",
      description: "Inteligente e organizada",
    },
    {
      id: "boy2",
      emoji: "👦🏽",
      description: "Esportivo e determinado",
    },
    {
      id: "girl3",
      emoji: "👧🏿",
      description: "Artística e expressiva",
    },
    {
      id: "boy3",
      emoji: "👦🏿",
      description: "Tecnológico e inovador",
    },
  ];

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

      {/* =====================================================
          LOGOS
          ===================================================== */}

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

      {/* =====================================================
          CARD PRINCIPAL
          ===================================================== */}

      <View style={styles.card}>

        {/* ---------------------------------------------------
            TÍTULO
            --------------------------------------------------- */}

        <View style={styles.header}>
          <Text style={styles.title}>
            ESCOLHA SEU PERSONAGEM
          </Text>

          <Text style={styles.subtitle}>
            {gameState.playerName}, qual personagem representa
            {"\n"}
            melhor você?
          </Text>
        </View>

        {/* ---------------------------------------------------
            PERSONAGENS
            --------------------------------------------------- */}

        <View style={styles.grid}>
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
                  isSelected && styles.selectedCharacter,
                ]}
              >
                <Text style={styles.characterEmoji}>
                  {character.emoji}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ---------------------------------------------------
            PREVIEW
            --------------------------------------------------- */}

        {selectedCharacterData && (
          <View style={styles.preview}>

            <View style={styles.previewAvatar}>
              <Text style={styles.previewEmoji}>
                {selectedCharacterData.emoji}
              </Text>
            </View>

            <View style={styles.previewText}>
              <Text style={styles.previewTitle}>
                Você escolheu
                {"\n"}
                este personagem
              </Text>

              <Text style={styles.previewDescription}>
                {selectedCharacterData.description}
              </Text>
            </View>

          </View>
        )}

        {/* ---------------------------------------------------
            BOTÃO
            --------------------------------------------------- */}

        <TouchableOpacity
          style={[
            styles.button,
            !selectedCharacter && styles.buttonDisabled,
          ]}
          disabled={!selectedCharacter}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            CONTINUAR
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // ==========================================================
  // TELA
  // ==========================================================

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,

    alignItems: "center",

    paddingHorizontal: 18,
  },

  // ==========================================================
  // LOGOS
  // ==========================================================

  topBar: {
    width: "100%",

    height: 86,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 18,
  },

  gameLogo: {
    width: 125,

    height: 42,

    resizeMode: "contain",
  },

  sicoobLogo: {
    width: 92,

    height: 38,

    resizeMode: "contain",
  },

  // ==========================================================
  // CARD PRINCIPAL
  // ==========================================================

  card: {
    width: "100%",

    maxWidth: 430,

    backgroundColor: COLORS.navy,

    borderRadius: 28,

    paddingHorizontal: 12,

    paddingTop: 25,

    paddingBottom: 12,

    overflow: "hidden",
  },

  // ==========================================================
  // CABEÇALHO
  // ==========================================================

  header: {
    alignItems: "center",

    marginBottom: 20,

    paddingHorizontal: 10,
  },

  title: {
    color: COLORS.yellow,

    fontSize: 20,

    lineHeight: 23,

    fontWeight: "900",

    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,

    color: COLORS.white,

    fontSize: 15,

    lineHeight: 17,

    fontWeight: "700",

    textAlign: "center",
  },

  // ==========================================================
  // GRID
  // ==========================================================

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    paddingHorizontal: 1,
  },

  // ==========================================================
  // PERSONAGEM
  // ==========================================================

  characterCard: {
    width: "31.5%",

    aspectRatio: 0.9,

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    borderRadius: 12,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 10,
  },

  selectedCharacter: {
    backgroundColor: COLORS.yellow,

    borderWidth: 3,

    borderColor: COLORS.yellow,
  },

  characterEmoji: {
    fontSize: 52,
  },

  // ==========================================================
  // PREVIEW
  // ==========================================================

  preview: {
    minHeight: 88,

    backgroundColor: COLORS.turquoise,

    borderRadius: 12,

    marginTop: 7,

    paddingHorizontal: 18,

    flexDirection: "row",

    alignItems: "center",
  },

  previewAvatar: {
    width: 56,

    height: 56,

    borderRadius: 28,

    backgroundColor: COLORS.white,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 15,
  },

  previewEmoji: {
    fontSize: 34,
  },

  previewText: {
    flex: 1,
  },

  previewTitle: {
    color: COLORS.white,

    fontSize: 17,

    lineHeight: 17,

    fontWeight: "900",

    fontStyle: "italic",
  },

  previewDescription: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 15,

    fontWeight: "700",

    marginTop: 2,
  },

  // ==========================================================
  // BOTÃO
  // ==========================================================

  button: {
    height: 42,

    backgroundColor: COLORS.yellow,

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 12,

    marginHorizontal: 12,
  },

  buttonDisabled: {
    backgroundColor: COLORS.navy,

    borderWidth: 2,

    borderColor: "#6E7E00",
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    textTransform: "uppercase",
  },
});