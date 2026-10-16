import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
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
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  white: "#FFFFFF",
  petInfo: "#16B9AA",
};

const PETS = {
  dog: {
    id: "dog",
    name: "CACHORRO",
    image: require("@/assets/images/pets/dog.png"),
    cost: 15,
    care: "Precisa de ração e carinho",
  },
  cat: {
    id: "cat",
    name: "GATO",
    image: require("@/assets/images/pets/cat.png"),
    cost: 12,
    care: "Ama petiscos, arranhador e soneca",
  },
  fish: {
    id: "fish",
    name: "PEIXE",
    image: require("@/assets/images/pets/fish.png"),
    cost: 5,
    care: "Quer aquário limpo e comida especial",
  },
  hamster: {
    id: "hamster",
    name: "HAMSTER",
    image: require("@/assets/images/pets/hamster.png"),
    cost: 8,
    care: "Gosta de sementes e rodinhas",
  },
  bird: {
    id: "bird",
    name: "PÁSSARO",
    image: require("@/assets/images/pets/bird.png"),
    cost: 10,
    care: "Precisa de gaiola, alpiste e música",
  },
  turtle: {
    id: "turtle",
    name: "TARTARUGA",
    image: require("@/assets/images/pets/turtle.png"),
    cost: 7,
    care: "Adora verduras e um cantinho tranquilo",
  },
};

export default function PetConfirmationScreen() {
  const { gameState, updateGameState } = useGame();

  const { width } = useWindowDimensions();

  const [petName, setPetName] = useState(
    gameState.petName ?? ""
  );

  const selectedPet =
    PETS[
      gameState.selectedPet as keyof typeof PETS
    ] ?? PETS.dog;

  const panelWidth = Math.min(width - 16, 420);

  const handleContinue = () => {
    const name = petName.trim();

    if (!name) return;

    updateGameState({
      petName: name,
    });

    // Avança para a próxima etapa do seu jogo.
    // Ajuste esta rota para o arquivo da tela seguinte.
    router.push("/pet_final_confirmation");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGOS */}
        <View
          style={[
            styles.topBar,
            {
              width: width * 0.78,
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

        {/* PAINEL PRINCIPAL */}
        <View
          style={[
            styles.panel,
            {
              width: panelWidth,
            },
          ]}
        >
          {/* TÍTULO */}
          <Text style={styles.title}>
            ESCOLHA SEU ANIMAL
          </Text>

          {/* ANIMAL SELECIONADO */}
          <View style={styles.petCard}>
            {/* IMAGEM E NOME */}
            <View style={styles.petLeft}>
              <Image
                source={selectedPet.image}
                style={styles.petImage}
                resizeMode="contain"
              />

              <Text style={styles.petName}>
                {selectedPet.name}
              </Text>
            </View>

            {/* CUSTO E CUIDADOS */}
            <View style={styles.petRight}>
              <View style={styles.costBox}>
                <Text style={styles.costText}>
                  Custo mensal: R$ {selectedPet.cost}
                </Text>
              </View>

              <View style={styles.careBox}>
                <Text style={styles.careText}>
                  {selectedPet.care}
                </Text>
              </View>
            </View>
          </View>

          {/* PERGUNTA */}
          <Text style={styles.question}>
            Nome, qual vai ser o nome{"\n"}
            do seu {selectedPet.id === "dog"
              ? "cachorro"
              : selectedPet.id === "cat"
                ? "gato"
                : selectedPet.id === "fish"
                  ? "peixe"
                  : selectedPet.id === "hamster"
                    ? "hamster"
                    : selectedPet.id === "bird"
                      ? "pássaro"
                      : "tartaruga"}?
          </Text>

          {/* CAMPO DE NOME */}
          <TextInput
            value={petName}
            onChangeText={setPetName}
            placeholder="Digite um nome para seu animal de estimação"
            placeholderTextColor={COLORS.navy}
            style={styles.input}
            maxLength={24}
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />

          {/* CONTINUAR */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !petName.trim() && styles.continueDisabled,
            ]}
            activeOpacity={0.8}
            onPress={handleContinue}
            disabled={!petName.trim()}
          >
            <Text style={styles.continueText}>
              CONTINUAR
            </Text>
          </TouchableOpacity>

          {/* VOLTAR */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            <Text style={styles.backText}>
              VOLTAR
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 24,
  },

  // LOGOS
  topBar: {
    height: 71,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  gameLogo: {
    width: 116,
    height: 38,
  },

  sicoobLogo: {
    width: 100,
    height: 36,
  },

  // PAINEL
  panel: {
    backgroundColor: COLORS.navy,
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingTop: 11,
    paddingBottom: 15,
    alignItems: "center",
    alignSelf: "center",
  },

  // TÍTULO
  title: {
    color: COLORS.yellow,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
    includeFontPadding: false,
  },

  // CARD DO ANIMAL
  petCard: {
    width: "100%",
    minHeight: 118,
    backgroundColor: COLORS.white,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 6,
  },

  petLeft: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },

  petImage: {
    width: 83,
    height: 65,
  },

  petName: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 1,
    includeFontPadding: false,
  },

  petRight: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },

  // CUSTO
  costBox: {
    width: "100%",
    minHeight: 25,
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 3,
  },

  costText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
    includeFontPadding: false,
  },

  // CUIDADOS
  careBox: {
    width: "100%",
    minHeight: 39,
    backgroundColor: COLORS.petInfo,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 4,
  },

  careText: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "800",
    textAlign: "left",
    alignSelf: "stretch",
    includeFontPadding: false,
  },

  // PERGUNTA
  question: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 13,
    includeFontPadding: false,
  },

  // CAMPO DE NOME
  input: {
    width: "100%",
    height: 34,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 0,
    color: COLORS.navy,
    fontSize: 10,
    includeFontPadding: false,
  },

  // CONTINUAR
  continueButton: {
    width: "84%",
    height: 32,
    backgroundColor: COLORS.yellow,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  continueDisabled: {
    opacity: 1,
  },

  continueText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    includeFontPadding: false,
  },

  // VOLTAR
  backButton: {
    width: "84%",
    height: 32,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },

  backText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    includeFontPadding: false,
  },
});