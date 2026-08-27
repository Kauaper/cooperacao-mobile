import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
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
  gray: "#D1D5DB",
};

export default function PetSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const pets = [
    {
      id: "dog",
      name: "Cachorrinho",
      emoji: "🐶",
      cost: 15,
      care: "Precisa de ração, brinquedos e carinho!",
    },
    {
      id: "cat",
      name: "Gatinho",
      emoji: "🐱",
      cost: 12,
      care: "Ama petiscos, arranhador e sonecas!",
    },
    {
      id: "hamster",
      name: "Hamster",
      emoji: "🐹",
      cost: 8,
      care: "Gosta de sementes e rodinhas!",
    },
    {
      id: "fish",
      name: "Peixinho",
      emoji: "🐠",
      cost: 5,
      care: "Quer aquário limpo e comida especial!",
    },
    {
      id: "bird",
      name: "Passarinho",
      emoji: "🐦",
      cost: 10,
      care: "Precisa de gaiola, alpiste e música!",
    },
    {
      id: "turtle",
      name: "Tartaruga",
      emoji: "🐢",
      cost: 7,
      care: "Adora verduras e um cantinho tranquilo!",
    },
  ];

  const characters = {
    girl1: { emoji: "👧🏻" },
    boy1: { emoji: "👦🏻" },
    girl2: { emoji: "👧🏽" },
    boy2: { emoji: "👦🏽" },
    girl3: { emoji: "👧🏿" },
    boy3: { emoji: "👦🏿" },
  };

  const selectedCharacter =
    characters[
      gameState.selectedCharacter as keyof typeof characters
    ];

  const handleSelectPet = (petId: string) => {
    updateGameState({
      selectedPet: petId,
    });

    router.push("/game");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ==================================================
            LOGOS
            ================================================== */}

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

        {/* ==================================================
            CARD PRINCIPAL
            ================================================== */}

        <View style={styles.card}>

          {/* ==================================================
              CABEÇALHO
              ================================================== */}

          <View style={styles.header}>
            <Text style={styles.title}>
              ESCOLHA SEU BICHINHO
            </Text>

            <Text style={styles.subtitle}>
              {gameState.playerName}, qual bichinho você quer{"\n"}
              cuidar?
            </Text>
          </View>

          {/* ==================================================
              GRID DOS BICHINHOS
              ================================================== */}

          <View style={styles.petGrid}>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petCard}
                activeOpacity={0.8}
                onPress={() => handleSelectPet(pet.id)}
              >
                {/* Área principal do bichinho */}

                <View style={styles.petImageArea}>
                  <Text style={styles.petEmoji}>
                    {pet.emoji}
                  </Text>
                </View>

                {/* Nome */}

                <Text style={styles.petName}>
                  {pet.name}
                </Text>

                {/* Custo */}

                <View style={styles.costBox}>
                  <Text style={styles.costText}>
                    Custo mensal: R$ {pet.cost}
                  </Text>
                </View>

                {/* Cuidados */}

                <View style={styles.careBox}>
                  <Text style={styles.careText}>
                    {pet.care}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* ==================================================
              BOTÃO
              ================================================== */}

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              CONTINUAR
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
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
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",

    paddingHorizontal: 18,

    paddingBottom: 30,
  },

  // ==========================================================
  // LOGOS
  // ==========================================================

  topBar: {
    width: "100%",

    height: 82,

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

    paddingHorizontal: 10,

    paddingTop: 20,

    paddingBottom: 12,

    overflow: "hidden",
  },

  // ==========================================================
  // CABEÇALHO
  // ==========================================================

  header: {
    alignItems: "center",

    marginBottom: 14,

    paddingHorizontal: 8,
  },

  title: {
    color: COLORS.yellow,

    fontSize: 18,

    lineHeight: 21,

    fontWeight: "900",

    textAlign: "center",

    textTransform: "uppercase",
  },

  subtitle: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 14,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 2,
  },

  // ==========================================================
  // GRID
  // ==========================================================

  petGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    paddingHorizontal: 1,
  },

  // ==========================================================
  // CARD DO PET
  // ==========================================================

  petCard: {
    width: "48.5%",

    backgroundColor: COLORS.white,

    borderRadius: 10,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    padding: 6,

    marginBottom: 8,

    alignItems: "center",
  },

  // ==========================================================
  // ÁREA DA IMAGEM
  // ==========================================================

  petImageArea: {
    width: "100%",

    height: 74,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: COLORS.white,

    borderRadius: 7,
  },

  petEmoji: {
    fontSize: 48,
  },

  // ==========================================================
  // NOME
  // ==========================================================

  petName: {
    color: COLORS.navy,

    fontSize: 12,

    lineHeight: 14,

    fontWeight: "900",

    textAlign: "center",

    marginTop: 1,

    marginBottom: 4,
  },

  // ==========================================================
  // CUSTO
  // ==========================================================

  costBox: {
    width: "100%",

    backgroundColor: "#2FBFA0",

    borderRadius: 5,

    paddingVertical: 4,

    paddingHorizontal: 3,

    marginBottom: 3,
  },

  costText: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    textAlign: "center",
  },

  // ==========================================================
  // CUIDADOS
  // ==========================================================

  careBox: {
    width: "100%",

    backgroundColor: "#7FC241",

    borderRadius: 5,

    paddingVertical: 4,

    paddingHorizontal: 3,
  },

  careText: {
    color: COLORS.white,

    fontSize: 7.5,

    lineHeight: 9,

    fontWeight: "700",

    textAlign: "center",
  },

  // ==========================================================
  // BOTÃO
  // ==========================================================

  button: {
    height: 34,

    backgroundColor: COLORS.yellow,

    borderRadius: 6,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 5,

    marginHorizontal: 10,
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textTransform: "uppercase",
  },
});