import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
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
  green: "#7FC241",
  petInfo: "#16B9AA",
};

export default function PetSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const [selectedPet, setSelectedPet] = useState("");

  const { width } = useWindowDimensions();

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

  const pets = [
    {
      id: "dog",
      name: "CACHORRO",
      image: require("@/assets/images/pets/dog.png"),
      cost: 15,
      care: "Precisa de ração e\ncarinho",
    },
    {
      id: "cat",
      name: "GATO",
      image: require("@/assets/images/pets/cat.png"),
      cost: 12,
      care: "Ama petiscos,\narranhador e soneca",
    },
    {
      id: "fish",
      name: "PEIXE",
      image: require("@/assets/images/pets/fish.png"),
      cost: 5,
      care: "Quer aquário limpo\ne comida especial",
    },
    {
      id: "hamster",
      name: "HAMSTER",
      image: require("@/assets/images/pets/hamster.png"),
      cost: 8,
      care: "Gosta de sementes\ne rodinhas",
    },
    {
      id: "bird",
      name: "PÁSSARO",
      image: require("@/assets/images/pets/bird.png"),
      cost: 10,
      care: "Precisa de gaiola,\nalpiste e música",
    },
    {
      id: "turtle",
      name: "TARTARUGA",
      image: require("@/assets/images/pets/turtle.png"),
      cost: 7,
      care: "Adora verduras e um\ncantinho tranquilo",
    },
  ];

  /*
   * ============================================================
   * DIMENSÕES
   * ============================================================
   */

  const screenPadding = 8;

  const cardWidth = Math.min(
    width - screenPadding * 2,
    380,
  );

  const listWidth = cardWidth - 20;

  /*
   * ============================================================
   * SELECIONAR PET
   *
   * IMPORTANTE:
   * Aqui NÃO existe navegação.
   * O usuário apenas escolhe o animal.
   * ============================================================
   */

  const handleSelectPet = (petId: string) => {
    setSelectedPet(petId);
  };

  /*
   * ============================================================
   * CONTINUAR
   *
   * Só aqui avançamos para a tela de confirmação.
   * ============================================================
   */

  const handleContinue = () => {
    if (!selectedPet) return;

    updateGameState({
      selectedPet,
    });

    router.push("/pet_confirmation");
  };

  /*
   * ============================================================
   * VOLTAR
   * ============================================================
   */

  const handleBack = () => {
    router.back();
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

        <View
          style={[
            styles.topBar,
            {
              width: cardWidth - 28,
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

        {/* ==================================================
            CARD PRINCIPAL
            ================================================== */}

        <View
          style={[
            styles.card,
            {
              width: cardWidth,
            },
          ]}
        >

          {/* ==================================================
              CABEÇALHO
              ================================================== */}

          <View style={styles.header}>

            <Text style={styles.title}>
              ESCOLHA SEU ANIMAL
            </Text>

            <Text style={styles.subtitle}>
              {gameState.playerName}, qual bichinho você quer{"\n"}
              cuidar?
            </Text>

          </View>

          {/* ==================================================
              LISTA DOS ANIMAIS
              ================================================== */}

          <View
            style={[
              styles.petList,
              {
                width: listWidth,
              },
            ]}
          >

            {pets.map((pet) => {

              const isSelected =
                selectedPet === pet.id;

              return (
                <TouchableOpacity
                  key={pet.id}
                  activeOpacity={0.85}
                  onPress={() =>
                    handleSelectPet(pet.id)
                  }
                  style={[
                    styles.petCard,
                    isSelected && styles.petCardSelected,
                  ]}
                >

                  {/* ========================================
                      LADO ESQUERDO
                      ======================================== */}

                  <View style={styles.petLeft}>

                    <Image
                      source={pet.image}
                      style={styles.petImage}
                      resizeMode="contain"
                    />

                    <Text style={styles.petName}>
                      {pet.name}
                    </Text>

                  </View>

                  {/* ========================================
                      LADO DIREITO
                      ======================================== */}

                  <View style={styles.petRight}>

                    {/* CUSTO */}

                    <View style={styles.costBox}>

                      <Text style={styles.costText}>
                        Custo mensal: R$ {pet.cost}
                      </Text>

                    </View>

                    {/* CUIDADOS */}

                    <View style={styles.careBox}>

                      <Text style={styles.careText}>
                        {pet.care}
                      </Text>

                    </View>

                  </View>

                </TouchableOpacity>
              );
            })}

          </View>

          {/* ==================================================
              CONTINUAR
              ================================================== */}

          <TouchableOpacity
            style={[
              styles.button,
              {
                width: listWidth,
              },
              !selectedPet && styles.buttonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!selectedPet}
            onPress={handleContinue}
          >

            <Text style={styles.buttonText}>
              CONTINUAR
            </Text>

          </TouchableOpacity>

          {/* ==================================================
              VOLTAR
              ================================================== */}

          <TouchableOpacity
            style={[
              styles.backButton,
              {
                width: listWidth,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleBack}
          >

            <Text style={styles.backButtonText}>
              VOLTAR
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

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
  },

  scroll: {
    flex: 1,

    width: "100%",
  },

  scrollContent: {
    alignItems: "center",

    paddingTop: 0,

    paddingBottom: 25,
  },

  /*
   * ==========================================================
   * LOGOS
   * ==========================================================
   */

  topBar: {
    height: 64,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    alignSelf: "center",
  },

  gameLogo: {
    width: 120,

    height: 36,

    resizeMode: "contain",
  },

  sicoobLogo: {
    width: 95,

    height: 34,

    resizeMode: "contain",
  },

  /*
   * ==========================================================
   * CARD PRINCIPAL
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.navy,

    borderRadius: 8,

    alignItems: "center",

    alignSelf: "center",

    overflow: "hidden",

    paddingTop: 10,

    paddingBottom: 13,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    width: "100%",

    alignItems: "center",

    paddingHorizontal: 8,

    marginBottom: 10,
  },

  title: {
    color: COLORS.yellow,

    fontSize: 17,

    lineHeight: 20,

    fontWeight: "900",

    textAlign: "center",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 14,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 4,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * LISTA
   * ==========================================================
   */

  petList: {
    width: "100%",

    alignItems: "center",
  },

  /*
   * ==========================================================
   * CARD DO ANIMAL
   *
   * FORMATO:
   *
   * ┌──────────────────────────────┐
   * │   PET       CUSTO MENSAL     │
   * │  NOME       CUIDADOS         │
   * └──────────────────────────────┘
   * ==========================================================
   */

  petCard: {
    width: "100%",

    minHeight: 92,

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    borderRadius: 8,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 6,

    paddingVertical: 5,

    marginBottom: 7,

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * PET SELECIONADO
   * ==========================================================
   */

  petCardSelected: {
    backgroundColor: COLORS.yellow,

    borderColor: COLORS.yellow,

    borderWidth: 3,
  },

  /*
   * ==========================================================
   * LADO ESQUERDO
   * ==========================================================
   */

  petLeft: {
    width: "39%",

    height: 78,

    alignItems: "center",

    justifyContent: "center",
  },

  /*
   * ==========================================================
   * IMAGEM
   * ==========================================================
   */

  petImage: {
    width: 61,

    height: 55,

    resizeMode: "contain",
  },

  /*
   * ==========================================================
   * NOME
   * ==========================================================
   */

  petName: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 13,

    fontWeight: "900",

    textAlign: "center",

    marginTop: 1,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * LADO DIREITO
   * ==========================================================
   */

  petRight: {
    flex: 1,

    justifyContent: "center",

    paddingLeft: 2,
  },

  /*
   * ==========================================================
   * CUSTO
   * ==========================================================
   */

  costBox: {
    width: "100%",

    backgroundColor: COLORS.yellow,

    borderRadius: 5,

    paddingVertical: 4,

    paddingHorizontal: 3,

    marginBottom: 4,

    alignItems: "center",

    justifyContent: "center",
  },

  costText: {
    color: COLORS.white,

    fontSize: 8.5,

    lineHeight: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CUIDADOS
   * ==========================================================
   */

  careBox: {
    width: "100%",

    backgroundColor: COLORS.petInfo,

    borderRadius: 5,

    minHeight: 36,

    paddingVertical: 4,

    paddingHorizontal: 4,

    alignItems: "center",

    justifyContent: "center",
  },

  careText: {
    color: COLORS.white,

    fontSize: 8.5,

    lineHeight: 10,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO CONTINUAR
   * ==========================================================
   */

  button: {
    height: 34,

    backgroundColor: COLORS.yellow,

    borderRadius: 6,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 5,
  },

  buttonDisabled: {
    backgroundColor: COLORS.navy,

    borderWidth: 2,

    borderColor: "#6E7E00",
  },

  buttonText: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO VOLTAR
   * ==========================================================
   */

  backButton: {
    height: 32,

    backgroundColor: COLORS.white,

    borderRadius: 6,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 5,
  },

  backButtonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

});