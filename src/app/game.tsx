import React from "react";
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

import AchievementSystem from "@/components/game/AchievementSystem";
import MonthlyActions from "@/components/game/MonthlyActions";
import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",
};

export default function GameScreen() {
  const { gameState } = useGame();

  const { width } = useWindowDimensions();

  const [showNarrator, setShowNarrator] = React.useState(true);
  const [storyStep, setStoryStep] = React.useState(0);

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

  const pets = {
    dog: {
      name: "Cachorro",
      image: require("@/assets/images/pets/dog.png"),
      cost: 15,
    },

    cat: {
      name: "Gato",
      image: require("@/assets/images/pets/cat.png"),
      cost: 12,
    },

    hamster: {
      name: "Hamster",
      image: require("@/assets/images/pets/hamster.png"),
      cost: 8,
    },

    fish: {
      name: "Peixe",
      image: require("@/assets/images/pets/fish.png"),
      cost: 5,
    },

    bird: {
      name: "Pássaro",
      image: require("@/assets/images/pets/bird.png"),
      cost: 10,
    },

    turtle: {
      name: "Tartaruga",
      image: require("@/assets/images/pets/turtle.png"),
      cost: 7,
    },
  };

  /*
   * ============================================================
   * PERSONAGENS
   * ============================================================
   */

  const characters = {
    girl1: {
      name: "Luna",
      image: require("@/assets/images/characters/girl1.png"),
    },

    boy1: {
      name: "Max",
      image: require("@/assets/images/characters/boy1.png"),
    },

    girl2: {
      name: "Sofia",
      image: require("@/assets/images/characters/girl2.png"),
    },

    boy2: {
      name: "Diego",
      image: require("@/assets/images/characters/boy2.png"),
    },

    girl3: {
      name: "Zara",
      image: require("@/assets/images/characters/girl3.png"),
    },

    boy3: {
      name: "Kael",
      image: require("@/assets/images/characters/boy3.png"),
    },
  };

  /*
   * ============================================================
   * SELECIONADOS
   * ============================================================
   */

  const selectedCharacter =
    characters[
      gameState.selectedCharacter as keyof typeof characters
    ];

  const selectedPet =
    pets[
      gameState.selectedPet as keyof typeof pets
    ];

  /*
   * ============================================================
   * HISTÓRIA
   * ============================================================
   */

  const chapter1Stories = [
    {
      text: `Olá ${gameState.playerName}! Eu sou o Capitão Cofrinho, seu guia nesta aventura incrível!`,
    },

    {
      text: `Você acabou de adotar seu ${selectedPet?.name?.toLowerCase()} e ele está super animado para conhecer você!`,
    },

    {
      text: `Você ganhou R$ ${gameState.monthlyIncome} este mês. Agora vamos aprender os segredos do dinheiro juntos!`,
    },

    {
      text: `Lembre-se: Seu bichinho conta com você todos os meses. Ele precisa de comida, carinho e cuidados!`,
    },
  ];

  const otherStories = [
    {
      text: `Olá ${gameState.playerName}! Vamos continuar nossa aventura financeira juntos!`,
    },

    {
      text: `Seu ${selectedPet?.name?.toLowerCase()} continua contando com você para cuidar dele todos os meses.`,
    },

    {
      text: `Você recebeu R$ ${gameState.monthlyIncome} este mês. Que tal pensar bem antes de gastar?`,
    },

    {
      text: `Lembre-se: boas escolhas hoje ajudam você e seu bichinho amanhã!`,
    },
  ];

  const stories =
    gameState.currentMonth === 1
      ? chapter1Stories
      : otherStories;

  const currentStory = stories[storyStep];

  /*
   * ============================================================
   * FINAL DO JOGO
   * ============================================================
   */

  const gameEnded = gameState.currentMonth > 12;

  /*
   * ============================================================
   * REINICIAR HISTÓRIA
   * ============================================================
   */

  React.useEffect(() => {
    if (!gameEnded) {
      setStoryStep(0);
      setShowNarrator(true);
    }
  }, [gameState.currentMonth, gameEnded]);

  /*
   * ============================================================
   * AVANÇAR HISTÓRIA
   * ============================================================
   */

  const handleStoryNext = () => {
    if (storyStep < stories.length - 1) {
      setStoryStep((prev) => prev + 1);
      return;
    }

    setStoryStep(0);
    setShowNarrator(false);
  };

  /*
   * ============================================================
   * CABEÇALHO
   * ============================================================
   */

  const GameHeader = () => (
    <View
      style={[
        styles.topBar,
        {
          width: Math.min(width * 0.86, 350),
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
  );

  /*
   * ============================================================
   * PERSONAGEM + PET
   * ============================================================
   */

  const CharacterPet = () => (
    <View style={styles.characterPetArea}>

      <View style={styles.characterCircle}>
        <Image
          source={selectedCharacter?.image}
          style={styles.chapterCharacterImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.heartCircle}>
        <Text style={styles.heart}>
          ❤️
        </Text>
      </View>

      <View style={styles.petCircle}>
        <Image
          source={selectedPet?.image}
          style={styles.chapterPetImage}
          resizeMode="contain"
        />
      </View>

    </View>
  );

  /*
   * ============================================================
   * NARRADOR
   * ============================================================
   */

  if (showNarrator && !gameEnded) {
    return (
      <SafeAreaView style={styles.container}>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.narratorScrollContent}
          showsVerticalScrollIndicator={false}
        >

          <GameHeader />

          {/* ==================================================
              CARD SUPERIOR DO CAPÍTULO
              ================================================== */}

          <View style={styles.chapterCard}>

            <CharacterPet />

            <View style={styles.chapterBadge}>
              <Text style={styles.chapterBadgeText}>
                CAPÍTULO {gameState.currentMonth}
              </Text>
            </View>

            <Text style={styles.chapterTitle}>
              {gameState.playerName}
              {" & "}
              {selectedPet?.name}
            </Text>

          </View>

          {/* ==================================================
              HISTÓRIA
              ================================================== */}

          <View style={styles.storyCard}>

            {/* ==================================================
                CABEÇALHO DA HISTÓRIA
                ================================================== */}

            <View style={styles.storyHeader}>

              {/* PERSONAGEM */}

              <View style={styles.storyCharacterCircle}>

                <Image
                  source={selectedCharacter?.image}
                  style={styles.storyCharacter}
                  resizeMode="contain"
                />

              </View>

              {/* PET */}

              <View style={styles.storyPetCircle}>

                <Image
                  source={selectedPet?.image}
                  style={styles.storyPet}
                  resizeMode="contain"
                />

              </View>

              {/* TEXTO DO CAPÍTULO */}

              <View style={styles.storyHeaderText}>

                <Text style={styles.storyChapter}>
                  CAPÍTULO {gameState.currentMonth}
                </Text>

                <Text style={styles.storySubtitle}>
                  A GRANDE AVENTURA COMEÇA
                </Text>

              </View>

            </View>

            {/* ==================================================
                BALÃO DE FALA
                ================================================== */}

            <View style={styles.speechArea}>

              <Image
                source={require("@/assets/images/speech-bubble.png")}
                style={styles.speechBubble}
                resizeMode="stretch"
              />

              {/* TEXTO */}

              <View style={styles.speechTextArea}>

                <Text style={styles.storyText}>
                  {currentStory.text}
                </Text>

              </View>

              {/* PORQUINHO */}

              <Image
                source={require("@/assets/images/pig.png")}
                style={styles.storyPig}
                resizeMode="contain"
              />

            </View>

            {/* ==================================================
                INDICADORES
                ================================================== */}

            <View style={styles.storyDots}>

              {stories.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.storyDot,
                    index === storyStep
                      ? styles.storyDotActive
                      : styles.storyDotInactive,
                  ]}
                />
              ))}

            </View>

            {/* ==================================================
                BOTÃO
                ================================================== */}

            <TouchableOpacity
              style={styles.storyButton}
              onPress={handleStoryNext}
              activeOpacity={0.8}
            >

              <Text style={styles.storyButtonText}>
                {storyStep === stories.length - 1
                  ? "COMEÇAR MÊS"
                  : "CONTINUAR"}
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </SafeAreaView>
    );
  }

  /*
   * ============================================================
   * TELA PRINCIPAL
   * ============================================================
   */

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <GameHeader />

        <AchievementSystem />

        {!gameEnded && (
          <View style={styles.dashboard}>

            <CharacterPet />

            <View style={styles.chapterSection}>

              <Text style={styles.chapterLabel}>
                SUA AVENTURA
              </Text>

              <Text style={styles.chapterNumber}>
                CAPÍTULO {gameState.currentMonth}

                <Text style={styles.chapterTotal}>
                  {" / 12"}
                </Text>

              </Text>

            </View>

            {/* ==================================================
                ESTATÍSTICAS
                ================================================== */}

            <View style={styles.statsGrid}>

              <View
                style={[
                  styles.statCard,
                  styles.walletCard,
                ]}
              >
                <Text style={styles.statEmoji}>
                  💰
                </Text>

                <Text style={styles.statLabel}>
                  CARTEIRA
                </Text>

                <Text style={styles.statValue}>
                  R$ {gameState.balance.toFixed(0)}
                </Text>
              </View>

              <View
                style={[
                  styles.statCard,
                  styles.investmentCard,
                ]}
              >
                <Text style={styles.statEmoji}>
                  🌱
                </Text>

                <Text style={styles.statLabel}>
                  GUARDADO
                </Text>

                <Text style={styles.statValue}>
                  R$ {gameState.investmentBalance.toFixed(0)}
                </Text>
              </View>

              <View
                style={[
                  styles.statCard,
                  styles.petHealthCard,
                ]}
              >
                <Text style={styles.statEmoji}>
                  ❤️
                </Text>

                <Text style={styles.statLabel}>
                  SAÚDE DO PET
                </Text>

                <Text style={styles.statValue}>
                  {gameState.petHealth.toFixed(0)}%
                </Text>
              </View>

              <View
                style={[
                  styles.statCard,
                  styles.achievementCard,
                ]}
              >
                <Text style={styles.statEmoji}>
                  🏅
                </Text>

                <Text style={styles.statLabel}>
                  SELOS
                </Text>

                <Text style={styles.statValue}>
                  {gameState.achievements.length}
                </Text>
              </View>

            </View>

            {/* ==================================================
                META
                ================================================== */}

            {gameState.personalGoal && (
              <View style={styles.goalCard}>

                <View style={styles.goalHeader}>

                  <View style={styles.goalIcon}>
                    <Text style={styles.goalEmoji}>
                      🎯
                    </Text>
                  </View>

                  <View style={styles.goalTitleArea}>

                    <Text style={styles.goalLabel}>
                      MINHA META
                    </Text>

                    <Text style={styles.goalName}>
                      {gameState.personalGoal.name}
                    </Text>

                  </View>

                </View>

                <View style={styles.goalValues}>

                  <Text style={styles.goalCurrent}>
                    R${" "}
                    {gameState.personalGoal.currentAmount.toFixed(0)}
                  </Text>

                  <Text style={styles.goalTarget}>
                    de R$ {gameState.personalGoal.targetAmount}
                  </Text>

                </View>

                <View style={styles.progressBackground}>

                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${Math.min(
                          (gameState.personalGoal.currentAmount /
                            gameState.personalGoal.targetAmount) *
                            100,
                          100,
                        )}%`,
                      },
                    ]}
                  />

                </View>

              </View>
            )}

          </View>
        )}

        {/* ======================================================
            AÇÕES
            ====================================================== */}

        <View style={styles.actionsSection}>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              SUAS AÇÕES
            </Text>

            <Text style={styles.sectionSubtitle}>
              O que você vai fazer este mês?
            </Text>

          </View>

          <MonthlyActions />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

/*
 * ============================================================
 * ESTILOS
 * ============================================================
 */

const styles = StyleSheet.create({

  /*
   * ==========================================================
   * TELA
   * ==========================================================
   */

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",

    paddingHorizontal: 16,

    paddingBottom: 40,
  },

  narratorScrollContent: {
    alignItems: "center",

    paddingBottom: 30,
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
  },

  sicoobLogo: {
    width: 91,

    height: 34,
  },

  /*
   * ==========================================================
   * CARD SUPERIOR DO CAPÍTULO
   * ==========================================================
   */

  chapterCard: {
    width: "94%",

    maxWidth: 360,

    backgroundColor: COLORS.navy,

    borderRadius: 24,

    paddingTop: 18,

    paddingBottom: 20,

    alignItems: "center",
  },

  /*
   * PERSONAGEM + PET
   */

  characterPetArea: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 10,
  },

  characterCircle: {
    width: 84,

    height: 84,

    borderRadius: 42,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    overflow: "hidden",
  },

  petCircle: {
    width: 84,

    height: 84,

    borderRadius: 42,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    overflow: "hidden",
  },

  chapterCharacterImage: {
    width: 72,

    height: 72,
  },

  chapterPetImage: {
    width: 70,

    height: 70,
  },

  heartCircle: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    marginHorizontal: -5,

    zIndex: 5,
  },

  heart: {
    fontSize: 20,
  },

  chapterBadge: {
    backgroundColor: COLORS.yellow,

    borderRadius: 22,

    paddingHorizontal: 25,

    paddingVertical: 8,

    marginBottom: 8,
  },

  chapterBadgeText: {
    color: COLORS.navy,

    fontSize: 15,

    fontWeight: "900",

    textAlign: "center",
  },

  chapterTitle: {
    color: COLORS.white,

    fontSize: 22,

    fontWeight: "900",

    textAlign: "center",
  },

  /*
   * ==========================================================
   * CARD DA HISTÓRIA
   * ==========================================================
   */

  storyCard: {
    width: "94%",

    maxWidth: 360,

    backgroundColor: COLORS.navy,

    borderRadius: 12,

    marginTop: 12,

    padding: 7,

    paddingBottom: 13,

    alignItems: "center",

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * CABEÇALHO DA HISTÓRIA
   * ==========================================================
   */

  storyHeader: {
    width: "100%",

    height: 108,

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    borderRadius: 10,

    alignItems: "center",

    justifyContent: "flex-start",

    position: "relative",

    overflow: "hidden",
  },

  /*
   * CÍRCULO DO PERSONAGEM
   */

  storyCharacterCircle: {
    position: "absolute",

    left: "27%",

    top: 7,

    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    overflow: "hidden",
  },

  storyCharacter: {
    width: 54,

    height: 54,
  },

  /*
   * CÍRCULO DO PET
   */

  storyPetCircle: {
    position: "absolute",

    right: "27%",

    top: 7,

    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    overflow: "hidden",
  },

  storyPet: {
    width: 53,

    height: 53,
  },

  /*
   * TEXTO DO CABEÇALHO
   *
   * Fica abaixo dos círculos.
   */

  storyHeaderText: {
    position: "absolute",

    left: 0,

    right: 0,

    bottom: 7,

    alignItems: "center",

    justifyContent: "center",
  },

  storyChapter: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    fontStyle: "italic",

    lineHeight: 15,

    textAlign: "center",

    includeFontPadding: false,
  },

  storySubtitle: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 13,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * ÁREA DO BALÃO
   * ==========================================================
   */

  speechArea: {
    width: "100%",

    height: 184,

    position: "relative",

    marginTop: 8,
  },

  /*
   * PNG DO BALÃO
   */

  speechBubble: {
    position: "absolute",

    left: 0,

    top: 0,

    width: "100%",

    height: 128,

    borderRadius: 30,
  },

  /*
   * TEXTO DO BALÃO
   *
   * SUBIMOS O TEXTO.
   */

  speechTextArea: {
    position: "absolute",

    left: 17,

    right: 17,

    top: 4,

    height: 91,

    alignItems: "center",

    justifyContent: "center",

    zIndex: 2,
  },

  storyText: {
    color: COLORS.navy,

    fontSize: 14,

    lineHeight: 16,

    fontWeight: "700",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * PORQUINHO
   * ==========================================================
   */

  storyPig: {
    position: "absolute",

    width: 94,

    height: 94,

    right: 5,

    bottom: 3,

    zIndex: 5,
  },

  /*
   * ==========================================================
   * BOLINHAS
   * ==========================================================
   */

  storyDots: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    height: 18,

    marginTop: -7,

    marginBottom: 5,
  },

  storyDot: {
    width: 8,

    height: 8,

    borderRadius: 4,

    marginHorizontal: 3,
  },

  storyDotActive: {
    backgroundColor: COLORS.yellow,
  },

  storyDotInactive: {
    backgroundColor: COLORS.white,
  },

  /*
   * ==========================================================
   * BOTÃO DA HISTÓRIA
   * ==========================================================
   */

  storyButton: {
    width: "84%",

    height: 32,

    backgroundColor: COLORS.yellow,

    borderRadius: 7,

    alignItems: "center",

    justifyContent: "center",
  },

  storyButtonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DASHBOARD
   * ==========================================================
   */

  dashboard: {
    width: "100%",

    maxWidth: 460,

    backgroundColor: COLORS.white,

    borderRadius: 24,

    padding: 16,

    marginBottom: 16,
  },

  chapterSection: {
    alignItems: "center",

    marginBottom: 16,

    paddingBottom: 12,

    borderBottomWidth: 2,

    borderBottomColor: "#E6ECEC",
  },

  chapterLabel: {
    color: COLORS.turquoise,

    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 1,
  },

  chapterNumber: {
    color: COLORS.navy,

    fontSize: 24,

    fontWeight: "900",

    marginTop: 2,
  },

  chapterTotal: {
    color: "#7C8B8F",

    fontSize: 20,
  },

  /*
   * ==========================================================
   * ESTATÍSTICAS
   * ==========================================================
   */

  statsGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    gap: 8,
  },

  statCard: {
    width: "48%",

    borderRadius: 14,

    paddingVertical: 12,

    paddingHorizontal: 8,

    alignItems: "center",
  },

  walletCard: {
    backgroundColor: COLORS.green,
  },

  investmentCard: {
    backgroundColor: "#55B6FF",
  },

  petHealthCard: {
    backgroundColor: "#FF6BA6",
  },

  achievementCard: {
    backgroundColor: "#FFA233",
  },

  statEmoji: {
    fontSize: 20,

    marginBottom: 3,
  },

  statLabel: {
    color: COLORS.white,

    fontSize: 9,

    fontWeight: "900",

    textAlign: "center",
  },

  statValue: {
    color: COLORS.white,

    fontSize: 19,

    fontWeight: "900",

    marginTop: 1,
  },

  /*
   * ==========================================================
   * META
   * ==========================================================
   */

  goalCard: {
    backgroundColor: "#F1F8E6",

    borderWidth: 2,

    borderColor: COLORS.green,

    borderRadius: 14,

    padding: 12,

    marginTop: 10,
  },

  goalHeader: {
    flexDirection: "row",

    alignItems: "center",
  },

  goalIcon: {
    width: 38,

    height: 38,

    borderRadius: 19,

    backgroundColor: COLORS.yellow,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 9,
  },

  goalEmoji: {
    fontSize: 20,
  },

  goalTitleArea: {
    flex: 1,
  },

  goalLabel: {
    color: COLORS.green,

    fontSize: 9,

    fontWeight: "900",
  },

  goalName: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    marginTop: 1,
  },

  goalValues: {
    flexDirection: "row",

    alignItems: "baseline",

    marginTop: 9,
  },

  goalCurrent: {
    color: COLORS.navy,

    fontSize: 19,

    fontWeight: "900",
  },

  goalTarget: {
    color: "#68787B",

    fontSize: 11,

    fontWeight: "700",

    marginLeft: 4,
  },

  progressBackground: {
    height: 9,

    backgroundColor: "#DDE5D8",

    borderRadius: 5,

    overflow: "hidden",

    marginTop: 6,
  },

  progressBar: {
    height: "100%",

    backgroundColor: COLORS.green,

    borderRadius: 5,
  },

  /*
   * ==========================================================
   * AÇÕES
   * ==========================================================
   */

  actionsSection: {
    width: "100%",

    maxWidth: 460,

    backgroundColor: COLORS.navy,

    borderRadius: 24,

    padding: 14,
  },

  sectionHeader: {
    alignItems: "center",

    marginBottom: 8,
  },

  sectionTitle: {
    color: COLORS.yellow,

    fontSize: 18,

    fontWeight: "900",

    textAlign: "center",
  },

  sectionSubtitle: {
    color: COLORS.white,

    fontSize: 11,

    fontWeight: "600",

    textAlign: "center",

    marginTop: 2,
  },

});