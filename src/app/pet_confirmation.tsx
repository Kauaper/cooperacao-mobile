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

export default function PetConfirmationScreen() {
  const { gameState } = useGame();

  const { width } = useWindowDimensions();

  /*
   * ============================================================
   * PERSONAGENS
   * ============================================================
   */

  const characters = {
    girl1: require("@/assets/images/characters/girl1.png"),
    boy1: require("@/assets/images/characters/boy1.png"),
    girl2: require("@/assets/images/characters/girl2.png"),
    boy2: require("@/assets/images/characters/boy2.png"),
    girl3: require("@/assets/images/characters/girl3.png"),
    boy3: require("@/assets/images/characters/boy3.png"),
  };

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

  const pets = {
    dog: require("@/assets/images/pets/dog.png"),
    cat: require("@/assets/images/pets/cat.png"),
    hamster: require("@/assets/images/pets/hamster.png"),
    fish: require("@/assets/images/pets/fish.png"),
    bird: require("@/assets/images/pets/bird.png"),
    turtle: require("@/assets/images/pets/turtle.png"),
  };

  /*
   * ============================================================
   * NOMES DOS PETS
   * ============================================================
   */

  const petNames = {
    dog: "cachorro",
    cat: "gato",
    hamster: "hamster",
    fish: "peixe",
    bird: "pássaro",
    turtle: "tartaruga",
  };

  /*
   * ============================================================
   * PERSONAGEM SELECIONADO
   * ============================================================
   */

  const selectedCharacter =
    characters[
      gameState.selectedCharacter as keyof typeof characters
    ];

  /*
   * ============================================================
   * PET SELECIONADO
   * ============================================================
   */

  const selectedPet =
    pets[
      gameState.selectedPet as keyof typeof pets
    ];

  /*
   * ============================================================
   * NOME DO PET
   * ============================================================
   */

  const petName =
    petNames[
      gameState.selectedPet as keyof typeof petNames
    ] || "bichinho";

  /*
   * ============================================================
   * COMEÇAR AVENTURA
   *
   * Depois da confirmação do personagem + bichinho,
   * seguimos para a tela de apresentação.
   * ============================================================
   */

  const handleStart = () => {
    router.push("/game");
  };

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
          },
        ]}
      >

        <Image
          source={require("@/assets/images/game-logo-white.png")}
          style={styles.gameLogo}
          resizeMode="contain"
        />

        <Image
          source={require("@/assets/images/sicoob-logo-white.png")}
          style={styles.sicoobLogo}
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
            width: width * 0.94,
          },
        ]}
      >

        {/* ====================================================
            PERSONAGEM + PET
            ==================================================== */}

        <View style={styles.selectionBox}>

          {/* PERSONAGEM */}

          <Image
            source={selectedCharacter}
            style={styles.characterImage}
            resizeMode="contain"
          />

          {/* PET */}

          <Image
            source={selectedPet}
            style={styles.petImage}
            resizeMode="contain"
          />

        </View>

        {/* ====================================================
            TEXTO
            ==================================================== */}

        <View style={styles.textArea}>

          <Text style={styles.message}>
            {gameState.playerName}, você e seu
          </Text>

          <Text style={styles.message}>
            {petName} estão prontos para iniciar
          </Text>

          <Text style={styles.message}>
            essa aventura?
          </Text>

        </View>

        {/* ====================================================
            BOTÃO
            ==================================================== */}

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleStart}
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
    height: 67,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  gameLogo: {
    width: 105,

    height: 35,

    resizeMode: "contain",
  },

  sicoobLogo: {
    width: 91,

    height: 34,

    resizeMode: "contain",
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.navy,

    borderRadius: 7,

    alignItems: "center",

    paddingHorizontal: 9,

    paddingTop: 11,

    paddingBottom: 8,

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * PERSONAGEM + PET
   * ==========================================================
   */

  selectionBox: {
    width: "100%",

    height: 112,

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    borderRadius: 7,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,
  },

  characterImage: {
    width: 82,

    height: 82,

    resizeMode: "contain",
  },

  petImage: {
    width: 100,

    height: 82,

    resizeMode: "contain",
  },

  /*
   * ==========================================================
   * TEXTO
   * ==========================================================
   */

  textArea: {
    width: "100%",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 15,

    paddingHorizontal: 8,
  },

  message: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 15,

    fontWeight: "700",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO
   * ==========================================================
   */

  button: {
    width: "84%",

    height: 32,

    backgroundColor: COLORS.yellow,

    borderRadius: 6,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

});