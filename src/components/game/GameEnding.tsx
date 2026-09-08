
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  blue: "#55B6FF",
  pink: "#FF6BA6",
  orange: "#FFA233",

  lightGreen: "#F1F8E6",
  lightYellow: "#FFF8D6",
  lightBlue: "#EAF6FF",
  lightPink: "#FFF0F6",

  gray: "#E6ECEC",
  darkGray: "#68787B",
};

export default function GameEnding() {
  const { gameState } = useGame();

  /*
   * ============================================================
   * PERSONAGENS
   * ============================================================
   */

  const characters = {
    girl1: {
      image: require("@/assets/images/characters/girl1.png"),
    },

    boy1: {
      image: require("@/assets/images/characters/boy1.png"),
    },

    girl2: {
      image: require("@/assets/images/characters/girl2.png"),
    },

    boy2: {
      image: require("@/assets/images/characters/boy2.png"),
    },

    girl3: {
      image: require("@/assets/images/characters/girl3.png"),
    },

    boy3: {
      image: require("@/assets/images/characters/boy3.png"),
    },
  };

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

  const pets = {
    dog: {
      image: require("@/assets/images/pets/dog.png"),
    },

    cat: {
      image: require("@/assets/images/pets/cat.png"),
    },

    hamster: {
      image: require("@/assets/images/pets/hamster.png"),
    },

    fish: {
      image: require("@/assets/images/pets/fish.png"),
    },

    bird: {
      image: require("@/assets/images/pets/bird.png"),
    },

    turtle: {
      image: require("@/assets/images/pets/turtle.png"),
    },
  };

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
   * CÁLCULOS
   * ============================================================
   */

  const totalEarned =
    gameState.monthlyIncome * 12;

  const finalBalance =
    gameState.balance +
    gameState.investmentBalance;

  const totalInvested =
    gameState.monthlyExpenses.reduce(
      (sum, month) =>
        sum + (month.investments || 0),
      0,
    );

  /*
   * ============================================================
   * NÍVEL DE DESEMPENHO
   * ============================================================
   */

  const getPerformanceLevel = () => {
    if (finalBalance >= totalEarned * 1.2) {
      return "expert";
    }

    if (finalBalance >= totalEarned * 1.1) {
      return "great";
    }

    if (finalBalance >= totalEarned * 0.9) {
      return "good";
    }

    return "learning";
  };

  const performanceData = {
    expert: {
      emoji: "🏆",
      title: "MESTRE FINANCEIRO",
      message:
        "Você é um verdadeiro gênio do dinheiro!",
      achievement:
        "Conquistou o Troféu de Ouro",
      background: COLORS.lightYellow,
      border: COLORS.yellow,
      accent: COLORS.orange,
    },

    great: {
      emoji: "⭐",
      title: "SUPER INTELIGENTE",
      message:
        "Parabéns! Você fez escolhas muito inteligentes!",
      achievement:
        "Conquistou a Medalha de Prata",
      background: COLORS.lightBlue,
      border: COLORS.blue,
      accent: COLORS.blue,
    },

    good: {
      emoji: "👍",
      title: "MUITO BOM",
      message:
        "Você aprendeu muito sobre dinheiro!",
      achievement:
        "Conquistou a Medalha de Bronze",
      background: COLORS.lightGreen,
      border: COLORS.green,
      accent: COLORS.green,
    },

    learning: {
      emoji: "📚",
      title: "CONTINUE APRENDENDO",
      message:
        "Cada erro é um aprendizado incrível!",
      achievement:
        "Conquistou o Certificado de Coragem",
      background: "#F3F3F3",
      border: "#BFC7C9",
      accent: COLORS.navy,
    },
  };

  const performance =
    performanceData[
      getPerformanceLevel() as keyof typeof performanceData
    ];

  /*
   * ============================================================
   * NOMES DAS CONQUISTAS
   * ============================================================
   */

  const achievementNames: Record<
    string,
    string
  > = {
    first_investment:
      "🌱 Primeiro Investimento",

    pet_master:
      "🏆 Mestre dos Pets",

    goal_setter:
      "🎯 Sonhador",

    saver:
      "💎 Poupador Expert",

    helper:
      "😇 Anjinho Bondoso",

    resist_temptation:
      "🛡️ Resistente",

    goal_achiever:
      "🏅 Realizador",

    pet_lover:
      "💝 Amor de Pet",

    smart_spender:
      "🧠 Gastador Inteligente",

    social_butterfly:
      "🦋 Borboleta Social",

    emergency_prepared:
      "🚨 Sempre Preparado",

    growth_expert:
      "📈 Expert em Crescimento",

    balanced_life:
      "⚖️ Vida Equilibrada",

    wise_chooser:
      "🦉 Escolhedor Sábio",

    generous_heart:
      "❤️ Coração Generoso",

    future_planner:
      "🔮 Planejador do Futuro",
  };

  /*
   * ============================================================
   * REINICIAR
   * ============================================================
   */

  const restartGame = () => {
    router.replace("/");
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {/* ====================================================
            CABEÇALHO
            ==================================================== */}

        <View style={styles.topHeader}>

          <Image
            source={require(
              "@/assets/images/game-logo-white.png",
            )}
            style={styles.gameLogo}
            resizeMode="contain"
          />

          <Image
            source={require(
              "@/assets/images/sicoob-logo-white.png",
            )}
            style={styles.sicoobLogo}
            resizeMode="contain"
          />

        </View>

        {/* ====================================================
            CARD PRINCIPAL
            ==================================================== */}

        <View style={styles.mainCard}>

          {/* PERSONAGEM + PET */}

          <View style={styles.characterPetArea}>

            <View style={styles.characterCircle}>

              {selectedCharacter?.image && (
                <Image
                  source={
                    selectedCharacter.image
                  }
                  style={styles.characterImage}
                  resizeMode="contain"
                />
              )}

            </View>

            <View style={styles.heartCircle}>
              <Text style={styles.heart}>
                ❤️
              </Text>
            </View>

            <View style={styles.petCircle}>

              {selectedPet?.image && (
                <Image
                  source={selectedPet.image}
                  style={styles.petImage}
                  resizeMode="contain"
                />
              )}

            </View>

          </View>

          {/* FINAL */}

          <View style={styles.finalBadge}>
            <Text style={styles.finalBadgeText}>
              JORNADA CONCLUÍDA
            </Text>
          </View>

          <Text style={styles.finalTitle}>
            VOCÊ CONSEGUIU!
          </Text>

          <Text style={styles.finalSubtitle}>
            12 meses de aprendizado
          </Text>

          {/* ==================================================
              DESEMPENHO
              ================================================== */}

          <View
            style={[
              styles.performanceCard,
              {
                backgroundColor:
                  performance.background,

                borderColor:
                  performance.border,
              },
            ]}
          >

            <Text style={styles.performanceEmoji}>
              {performance.emoji}
            </Text>

            <Text
              style={[
                styles.performanceTitle,
                {
                  color: performance.accent,
                },
              ]}
            >
              {performance.title}
            </Text>

            <Text style={styles.performanceMessage}>
              {performance.message}
            </Text>

            <Text style={styles.performanceAchievement}>
              {performance.achievement}
            </Text>

          </View>

          {/* ==================================================
              RESULTADOS
              ================================================== */}

          <View style={styles.resultsSection}>

            <Text style={styles.sectionTitle}>
              SEU RESULTADO
            </Text>

            <View style={styles.statsGrid}>

              {/* DINHEIRO */}

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
                  DINHEIRO FINAL
                </Text>

                <Text style={styles.statValue}>
                  R$ {finalBalance.toFixed(0)}
                </Text>

              </View>

              {/* INVESTIMENTOS */}

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
                  INVESTIDO
                </Text>

                <Text style={styles.statValue}>
                  R$ {totalInvested.toFixed(0)}
                </Text>

              </View>

              {/* PET */}

              <View
                style={[
                  styles.statCard,
                  styles.petCard,
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

              {/* SELOS */}

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

          </View>

        </View>

        {/* ====================================================
            CONQUISTAS
            ==================================================== */}

        {gameState.achievements.length > 0 && (
          <View style={styles.sectionCard}>

            <Text style={styles.sectionTitle}>
              🏅 SEUS SELOS
            </Text>

            <Text style={styles.sectionSubtitle}>
              Tudo que você conquistou durante a aventura
            </Text>

            <View style={styles.achievementsGrid}>

              {gameState.achievements.map(
                (achievement) => (
                  <View
                    key={achievement}
                    style={
                      styles.achievementItem
                    }
                  >

                    <Text
                      style={
                        styles.achievementText
                      }
                    >
                      {
                        achievementNames[
                          achievement
                        ] || achievement
                      }
                    </Text>

                  </View>
                ),
              )}

            </View>

          </View>
        )}

        {/* ====================================================
            O QUE VOCÊ APRENDEU
            ==================================================== */}

        <View style={styles.sectionCard}>

          <Text style={styles.sectionTitle}>
            🎓 O QUE VOCÊ APRENDEU
          </Text>

          <View style={styles.lessonItem}>

            <View style={styles.lessonIcon}>
              <Text>🐾</Text>
            </View>

            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>
                Cuidar de um bichinho
              </Text>

              <Text style={styles.lessonText}>
                Responsabilidade também faz parte
                do dinheiro.
              </Text>
            </View>

          </View>

          <View style={styles.lessonItem}>

            <View style={styles.lessonIcon}>
              <Text>🤔</Text>
            </View>

            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>
                Querer x Precisar
              </Text>

              <Text style={styles.lessonText}>
                Nem tudo que queremos precisa ser
                comprado.
              </Text>
            </View>

          </View>

          <View style={styles.lessonItem}>

            <View style={styles.lessonIcon}>
              <Text>🌱</Text>
            </View>

            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>
                Fazer o dinheiro crescer
              </Text>

              <Text style={styles.lessonText}>
                Guardar dinheiro ajuda a construir
                o futuro.
              </Text>
            </View>

          </View>

          <View style={styles.lessonItem}>

            <View style={styles.lessonIcon}>
              <Text>🛡️</Text>
            </View>

            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>
                Preparação para emergências
              </Text>

              <Text style={styles.lessonText}>
                Ter uma reserva ajuda quando algo
                inesperado acontece.
              </Text>
            </View>

          </View>

        </View>

        {/* ====================================================
            MENSAGEM FINAL
            ==================================================== */}

        <View style={styles.finalCard}>

          <Text style={styles.finalEmoji}>
            🎉
          </Text>

          <Text style={styles.finalCardTitle}>
            SUA AVENTURA TERMINOU!
          </Text>

          <Text style={styles.finalMessage}>
            {gameState.playerName}, você completou
            todos os 12 meses e aprendeu muito
            sobre dinheiro e responsabilidade.
          </Text>

          <Text style={styles.finalMessageSmall}>
            Agora você está pronto para continuar
            fazendo boas escolhas!
          </Text>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={restartGame}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>
              JOGAR NOVAMENTE
            </Text>
          </TouchableOpacity>

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

    paddingHorizontal: 14,

    paddingBottom: 40,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  topHeader: {
    width: "100%",
    maxWidth: 360,

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
   * CARD PRINCIPAL
   * ==========================================================
   */

  mainCard: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: COLORS.white,

    borderRadius: 28,

    padding: 16,

    alignItems: "center",

    marginBottom: 14,
  },

  /*
   * ==========================================================
   * PERSONAGEM + PET
   * ==========================================================
   */

  characterPetArea: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 12,
  },

  characterCircle: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: COLORS.white,

    borderWidth: 4,

    borderColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  characterImage: {
    width: 82,
    height: 82,
  },

  heartCircle: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: -7,

    zIndex: 5,
  },

  heart: {
    fontSize: 21,
  },

  petCircle: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: COLORS.white,

    borderWidth: 4,

    borderColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  petImage: {
    width: 82,
    height: 82,
  },

  /*
   * ==========================================================
   * TÍTULO
   * ==========================================================
   */

  finalBadge: {
    backgroundColor: COLORS.yellow,

    borderRadius: 20,

    paddingHorizontal: 18,
    paddingVertical: 7,

    marginBottom: 7,
  },

  finalBadgeText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  finalTitle: {
    color: COLORS.navy,

    fontSize: 26,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  finalSubtitle: {
    color: COLORS.turquoise,

    fontSize: 12,

    fontWeight: "800",

    marginTop: 3,

    marginBottom: 14,

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DESEMPENHO
   * ==========================================================
   */

  performanceCard: {
    width: "100%",

    borderWidth: 2,

    borderRadius: 20,

    padding: 14,

    alignItems: "center",
  },

  performanceEmoji: {
    fontSize: 38,

    marginBottom: 3,
  },

  performanceTitle: {
    fontSize: 18,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 4,

    includeFontPadding: false,
  },

  performanceMessage: {
    color: COLORS.navy,

    fontSize: 12,

    lineHeight: 17,

    fontWeight: "600",

    textAlign: "center",

    marginBottom: 7,

    includeFontPadding: false,
  },

  performanceAchievement: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * RESULTADOS
   * ==========================================================
   */

  resultsSection: {
    width: "100%",

    marginTop: 15,
  },

  sectionTitle: {
    color: COLORS.navy,

    fontSize: 17,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 3,

    includeFontPadding: false,
  },

  sectionSubtitle: {
    color: COLORS.darkGray,

    fontSize: 10,

    fontWeight: "600",

    textAlign: "center",

    marginBottom: 10,

    includeFontPadding: false,
  },

  statsGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    gap: 8,
  },

  statCard: {
    width: "48%",

    minHeight: 105,

    borderRadius: 16,

    paddingVertical: 10,
    paddingHorizontal: 7,

    alignItems: "center",
    justifyContent: "center",
  },

  walletCard: {
    backgroundColor: COLORS.green,
  },

  investmentCard: {
    backgroundColor: COLORS.blue,
  },

  petCard: {
    backgroundColor: COLORS.pink,
  },

  achievementCard: {
    backgroundColor: COLORS.orange,
  },

  statEmoji: {
    fontSize: 20,

    marginBottom: 2,
  },

  statLabel: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  statValue: {
    color: COLORS.white,

    fontSize: 18,

    fontWeight: "900",

    marginTop: 2,

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CARDS DE SEÇÃO
   * ==========================================================
   */

  sectionCard: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: COLORS.white,

    borderRadius: 24,

    padding: 15,

    marginBottom: 14,
  },

  /*
   * ==========================================================
   * CONQUISTAS
   * ==========================================================
   */

  achievementsGrid: {
    gap: 7,
  },

  achievementItem: {
    backgroundColor: COLORS.lightYellow,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    borderRadius: 14,

    paddingVertical: 10,

    paddingHorizontal: 12,
  },

  achievementText: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * LIÇÕES
   * ==========================================================
   */

  lessonItem: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F5F7F7",

    borderRadius: 15,

    padding: 10,

    marginTop: 7,
  },

  lessonIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  lessonContent: {
    flex: 1,
  },

  lessonTitle: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    marginBottom: 2,

    includeFontPadding: false,
  },

  lessonText: {
    color: COLORS.darkGray,

    fontSize: 10,

    lineHeight: 14,

    fontWeight: "600",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CARD FINAL
   * ==========================================================
   */

  finalCard: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: COLORS.navy,

    borderRadius: 26,

    padding: 18,

    alignItems: "center",

    marginBottom: 20,
  },

  finalEmoji: {
    fontSize: 42,

    marginBottom: 5,
  },

  finalCardTitle: {
    color: COLORS.yellow,

    fontSize: 20,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 8,

    includeFontPadding: false,
  },

  finalMessage: {
    color: COLORS.white,

    fontSize: 12,

    lineHeight: 17,

    fontWeight: "600",

    textAlign: "center",

    includeFontPadding: false,
  },

  finalMessageSmall: {
    color: COLORS.white,

    fontSize: 11,

    lineHeight: 16,

    fontWeight: "600",

    textAlign: "center",

    marginTop: 5,

    opacity: 0.9,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO
   * ==========================================================
   */

  restartButton: {
    width: "88%",

    minHeight: 46,

    backgroundColor: COLORS.yellow,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 15,

    paddingHorizontal: 12,
  },

  restartButtonText: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },
});