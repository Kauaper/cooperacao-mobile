import { router } from "expo-router";
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

export default function PetFinalConfirmationScreen() {
  const { gameState } = useGame();
  const { width } = useWindowDimensions();

  // Personagens disponíveis
  const characters = {
    girl1: require("@/assets/images/characters/girl1.png"),
    boy1: require("@/assets/images/characters/boy1.png"),
    girl2: require("@/assets/images/characters/girl2.png"),
    boy2: require("@/assets/images/characters/boy2.png"),
    girl3: require("@/assets/images/characters/girl3.png"),
    boy3: require("@/assets/images/characters/boy3.png"),
  };

  // Animais disponíveis
  const pets = {
    dog: require("@/assets/images/pets/dog.png"),
    cat: require("@/assets/images/pets/cat.png"),
    fish: require("@/assets/images/pets/fish.png"),
    bird: require("@/assets/images/pets/bird.png"),
    turtle: require("@/assets/images/pets/turtle.png"),
  };

  // Nome de cada animal
  const petNames = {
    dog: "cachorro",
    cat: "gato",
    fish: "peixe",
    bird: "pássaro",
    turtle: "tartaruga",
  };

  // Recupera as escolhas do jogador
  const selectedCharacter =
    characters[
      gameState.selectedCharacter as keyof typeof characters
    ];

  const selectedPet =
    pets[
      gameState.selectedPet as keyof typeof pets
    ];

  const petName =
    petNames[
      gameState.selectedPet as keyof typeof petNames
    ] || "bichinho";

  const playerName =
    gameState.playerName?.trim() || "Jogador";

  // Começar a aventura
  const handleStartAdventure = () => {
    router.push("/game");
  };

  // Dimensões responsivas
  const panelWidth = Math.min(width - 16, 420);

  const logoWidth = Math.min(width * 0.39, 155);

  const sicoobWidth = Math.min(width * 0.34, 135);

  const imageBoxHeight = Math.min(width * 0.46, 155);

  const characterSize = Math.min(width * 0.34, 112);

  const petSize = Math.min(width * 0.36, 118);

  const buttonWidth = Math.min(width * 0.78, 330);

  return (
    <SafeAreaView style={styles.container}>
      {/* ================================================
          LOGOS
          ================================================ */}

      <View
        style={[
          styles.topBar,
          {
            width: width * 0.84,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={[
            styles.gameLogo,
            {
              width: logoWidth,
            },
          ]}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={[
            styles.sicoobLogo,
            {
              width: sicoobWidth,
            },
          ]}
          resizeMode="contain"
        />
      </View>

      {/* ================================================
          PAINEL PRINCIPAL
          ================================================ */}

      <View
        style={[
          styles.card,
          {
            width: panelWidth,
          },
        ]}
      >
        {/* PERSONAGEM + ANIMAL */}

        <View
          style={[
            styles.selectionBox,
            {
              height: imageBoxHeight,
            },
          ]}
        >
          {selectedCharacter && (
            <Image
              source={selectedCharacter}
              style={[
                styles.characterImage,
                {
                  width: characterSize,
                  height: characterSize,
                },
              ]}
              resizeMode="contain"
            />
          )}

          {selectedPet && (
            <Image
              source={selectedPet}
              style={[
                styles.petImage,
                {
                  width: petSize,
                  height: petSize,
                },
              ]}
              resizeMode="contain"
            />
          )}
        </View>

        {/* MENSAGEM */}

        <View style={styles.textArea}>
          <Text style={styles.message}>
            {playerName}, você e o {petName} estão
          </Text>

          <Text style={styles.message}>
            prontos para iniciar essa aventura?
          </Text>
        </View>

        {/* BOTÃO COMEÇAR AVENTURA */}

        <TouchableOpacity
          style={[
            styles.button,
            {
              width: buttonWidth,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleStartAdventure}
        >
          <Text style={styles.buttonText}>
            COMEÇAR AVENTURA
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ================================================
  // TELA
  // ================================================

  container: {
    flex: 1,
    backgroundColor: COLORS.turquoise,
    alignItems: "center",
    overflow: "hidden",
  },

  // ================================================
  // LOGOS
  // ================================================

  topBar: {
    height: 79,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  gameLogo: {
    height: 38,
  },

  sicoobLogo: {
    height: 36,
  },

  // ================================================
  // PAINEL PRINCIPAL
  // ================================================

  card: {
    backgroundColor: COLORS.navy,
    borderRadius: 7,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 9,
    paddingTop: 15,
    paddingBottom: 10,
    overflow: "hidden",
  },

  // ================================================
  // CAIXA DAS IMAGENS
  // ================================================

  selectionBox: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  characterImage: {
    resizeMode: "contain",
  },

  petImage: {
    resizeMode: "contain",
  },

  // ================================================
  // MENSAGEM
  // ================================================

  textArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    paddingTop: 34,
    paddingBottom: 22,
  },

  message: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "center",
    includeFontPadding: false,
  },

  // ================================================
  // BOTÃO
  // ================================================

  button: {
    height: 34,
    backgroundColor: COLORS.yellow,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
    includeFontPadding: false,
  },
});