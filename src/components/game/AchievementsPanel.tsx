import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  lightGreen: "#EAF7D7",
  lightGray: "#F3F6F5",
  gray: "#68787B",
  border: "#DCE6E5",

  locked: "#E9EEEC",
};

export default function AchievementsPanel() {
  const { gameState } = useGame();

  /*
   * ============================================================
   * TODAS AS CONQUISTAS
   * ============================================================
   *
   * Mantemos a mesma lista utilizada na coleção de selos.
   */

  const allAchievements = [
    {
      id: "first_investment",
      name: "Primeira Semente",
      emoji: "🌱",
      description: "Plantou sua primeira semente financeira!",
      requirement: "Faça seu primeiro investimento",
    },

    {
      id: "pet_master",
      name: "Amigo dos Bichos",
      emoji: "🐾",
      description: "Cuidou super bem do seu pet!",
      requirement: "Pet com saúde máxima",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description: "Criou seu primeiro sonho!",
      requirement: "Defina uma meta pessoal",
    },

    {
      id: "saver",
      name: "Cofre de Ouro",
      emoji: "💎",
      description: "Juntou uma fortuna incrível!",
      requirement: "Tenha R$ 100 total",
    },

    {
      id: "helper",
      name: "Anjo da Guarda",
      emoji: "😇",
      description: "Ajudou alguém em necessidade!",
      requirement: "Aceite uma oportunidade de ajuda",
    },

    {
      id: "resist_temptation",
      name: "Super Forte",
      emoji: "🛡️",
      description: "Resistiu a uma tentação difícil!",
      requirement: "Recuse uma oferta tentadora",
    },

    {
      id: "goal_achiever",
      name: "Conquistador",
      emoji: "🏅",
      description: "Realizou seu sonho!",
      requirement: "Complete sua meta",
    },

    {
      id: "pet_lover",
      name: "Coração Animal",
      emoji: "💝",
      description: "Mostrou muito amor pelo seu pet!",
      requirement: "Gaste R$ 50+ com pet",
    },

    {
      id: "smart_spender",
      name: "Cérebro Financeiro",
      emoji: "🧠",
      description: "Gastou com muita inteligência!",
      requirement: "Balance seus gastos",
    },

    {
      id: "social_butterfly",
      name: "Amizade Dourada",
      emoji: "🦋",
      description: "Investiu nas amizades com sabedoria!",
      requirement: "Gaste R$ 30-80 com amigos",
    },

    {
      id: "emergency_prepared",
      name: "Sempre Pronto",
      emoji: "🚨",
      description: "Enfrentou uma emergência!",
      requirement: "Lide com uma emergência",
    },

    {
      id: "growth_expert",
      name: "Mago do Crescimento",
      emoji: "📈",
      description: "Fez o dinheiro crescer!",
      requirement: "Faça seu investimento crescer",
    },

    {
      id: "balanced_life",
      name: "Mestre do Equilíbrio",
      emoji: "⚖️",
      description: "Equilibrou tudo perfeitamente!",
      requirement: "Pet saudável + meta + amigos",
    },

    {
      id: "wise_chooser",
      name: "Sábio das Decisões",
      emoji: "🦉",
      description: "Tomou decisões muito inteligentes!",
      requirement: "Faça 4+ escolhas sábias",
    },

    {
      id: "generous_heart",
      name: "Coração Gigante",
      emoji: "❤️",
      description: "Ajudou muitas pessoas!",
      requirement: "Ajude 2+ vezes",
    },

    {
      id: "future_planner",
      name: "Vidente Financeiro",
      emoji: "🔮",
      description: "Pensou sempre no futuro!",
      requirement: "Invista consistentemente",
    },
  ];

  /*
   * ============================================================
   * PROGRESSO
   * ============================================================
   */

  const unlockedCount = allAchievements.filter((achievement) =>
    gameState.achievements.includes(achievement.id),
  ).length;

  const totalCount = allAchievements.length;

  const progressPercentage =
    totalCount > 0
      ? (unlockedCount / totalCount) * 100
      : 0;

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <View style={styles.card}>

      {/* ======================================================
          CABEÇALHO
          ====================================================== */}

      <View style={styles.header}>

        <View style={styles.trophyCircle}>

          <Text style={styles.trophy}>
            🏆
          </Text>

        </View>

        <View style={styles.headerText}>

          <Text style={styles.title}>
            MINHAS CONQUISTAS
          </Text>

          <Text style={styles.subtitle}>
            Complete desafios e desbloqueie recompensas!
          </Text>

        </View>

      </View>

      {/* ======================================================
          PROGRESSO
          ====================================================== */}

      <View style={styles.progressSection}>

        <View style={styles.progressHeader}>

          <View>

            <Text style={styles.progressLabel}>
              SUA JORNADA
            </Text>

            <Text style={styles.progressDescription}>
              Continue jogando para desbloquear tudo!
            </Text>

          </View>

          <View style={styles.counterBadge}>

            <Text style={styles.counterValue}>
              {unlockedCount}
            </Text>

            <Text style={styles.counterTotal}>
              / {totalCount}
            </Text>

          </View>

        </View>

        <View style={styles.progressBar}>

          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
              },
            ]}
          />

        </View>

        <View style={styles.progressFooter}>

          <Text style={styles.progressText}>
            {unlockedCount} conquistas desbloqueadas
          </Text>

          <Text style={styles.percent}>
            {Math.round(progressPercentage)}%
          </Text>

        </View>

      </View>

      {/* ======================================================
          LISTA
          ====================================================== */}

      <ScrollView
        style={styles.list}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >

        {allAchievements.map((achievement) => {

          const isUnlocked =
            gameState.achievements.includes(
              achievement.id,
            );

          return (
            <View
              key={achievement.id}
              style={[
                styles.achievement,
                isUnlocked
                  ? styles.unlockedAchievement
                  : styles.lockedAchievement,
              ]}
            >

              {/* ÍCONE */}

              <View
                style={[
                  styles.achievementIcon,
                  isUnlocked
                    ? styles.unlockedIcon
                    : styles.lockedIcon,
                ]}
              >

                <Text style={styles.emoji}>
                  {isUnlocked
                    ? achievement.emoji
                    : "🔒"}
                </Text>

              </View>

              {/* INFORMAÇÕES */}

              <View style={styles.info}>

                <View style={styles.nameRow}>

                  <Text
                    style={[
                      styles.name,
                      !isUnlocked &&
                        styles.lockedName,
                    ]}
                    numberOfLines={1}
                  >
                    {achievement.name}
                  </Text>

                  {isUnlocked && (
                    <View style={styles.checkBadge}>

                      <Text style={styles.check}>
                        ✓
                      </Text>

                    </View>
                  )}

                </View>

                <Text
                  style={[
                    styles.description,
                    !isUnlocked &&
                      styles.lockedDescription,
                  ]}
                  numberOfLines={2}
                >
                  {isUnlocked
                    ? achievement.description
                    : achievement.requirement}
                </Text>

              </View>

            </View>
          );
        })}

      </ScrollView>

      {/* ======================================================
          CONCLUSÃO
          ====================================================== */}

      {unlockedCount === totalCount && (
        <View style={styles.masterBox}>

          <View style={styles.masterIcon}>

            <Text style={styles.masterEmoji}>
              👑
            </Text>

          </View>

          <View style={styles.masterContent}>

            <Text style={styles.masterTitle}>
              MESTRE SUPREMO!
            </Text>

            <Text style={styles.masterText}>
              Você desbloqueou todas as conquistas!
            </Text>

          </View>

        </View>
      )}

    </View>
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
   * CARD
   * ==========================================================
   */

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 22,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    overflow: "hidden",

    marginBottom: 14,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    backgroundColor: COLORS.navy,

    paddingHorizontal: 12,

    paddingVertical: 11,

    flexDirection: "row",

    alignItems: "center",
  },

  trophyCircle: {
    width: 46,

    height: 46,

    borderRadius: 23,

    backgroundColor: COLORS.yellow,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 9,
  },

  trophy: {
    fontSize: 25,
  },

  headerText: {
    flex: 1,
  },

  title: {
    color: COLORS.yellow,

    fontSize: 14,

    fontWeight: "900",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    fontSize: 8.5,

    fontWeight: "600",

    marginTop: 3,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * PROGRESSO
   * ==========================================================
   */

  progressSection: {
    paddingHorizontal: 12,

    paddingTop: 11,

    paddingBottom: 10,
  },

  progressHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 7,
  },

  progressLabel: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  progressDescription: {
    color: COLORS.gray,

    fontSize: 7.5,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

  counterBadge: {
    height: 34,

    minWidth: 48,

    paddingHorizontal: 7,

    borderRadius: 17,

    backgroundColor: COLORS.navy,

    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",
  },

  counterValue: {
    color: COLORS.yellow,

    fontSize: 14,

    fontWeight: "900",

    includeFontPadding: false,
  },

  counterTotal: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "800",

    includeFontPadding: false,
  },

  progressBar: {
    height: 10,

    backgroundColor: "#DDE5E3",

    borderRadius: 999,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    backgroundColor: COLORS.green,

    borderRadius: 999,
  },

  progressFooter: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 5,
  },

  progressText: {
    color: COLORS.gray,

    fontSize: 7.5,

    fontWeight: "600",

    includeFontPadding: false,
  },

  percent: {
    color: COLORS.green,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * LISTA
   * ==========================================================
   */

  list: {
    maxHeight: 390,

    paddingHorizontal: 10,
  },

  /*
   * ==========================================================
   * CONQUISTA
   * ==========================================================
   */

  achievement: {
    minHeight: 60,

    flexDirection: "row",

    alignItems: "center",

    borderRadius: 14,

    padding: 8,

    marginBottom: 7,

    borderWidth: 1.5,
  },

  unlockedAchievement: {
    backgroundColor: COLORS.lightGreen,

    borderColor: COLORS.green,
  },

  lockedAchievement: {
    backgroundColor: COLORS.lightGray,

    borderColor: COLORS.border,
  },

  /*
   * ==========================================================
   * ÍCONE
   * ==========================================================
   */

  achievementIcon: {
    width: 45,

    height: 45,

    borderRadius: 23,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 9,
  },

  unlockedIcon: {
    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: COLORS.yellow,
  },

  lockedIcon: {
    backgroundColor: COLORS.locked,
  },

  emoji: {
    fontSize: 23,
  },

  /*
   * ==========================================================
   * TEXTO
   * ==========================================================
   */

  info: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  name: {
    flex: 1,

    color: COLORS.navy,

    fontSize: 10.5,

    fontWeight: "900",

    includeFontPadding: false,
  },

  lockedName: {
    color: "#77827F",
  },

  description: {
    color: COLORS.gray,

    fontSize: 8,

    lineHeight: 11,

    marginTop: 3,

    fontWeight: "600",

    includeFontPadding: false,
  },

  lockedDescription: {
    color: "#929C99",
  },

  /*
   * ==========================================================
   * CHECK
   * ==========================================================
   */

  checkBadge: {
    width: 22,

    height: 22,

    borderRadius: 11,

    backgroundColor: COLORS.green,

    justifyContent: "center",

    alignItems: "center",

    marginLeft: 6,
  },

  check: {
    color: COLORS.white,

    fontSize: 13,

    fontWeight: "900",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * MESTRE SUPREMO
   * ==========================================================
   */

  masterBox: {
    margin: 10,

    marginTop: 3,

    padding: 10,

    borderRadius: 15,

    backgroundColor: COLORS.yellow,

    borderWidth: 2,

    borderColor: COLORS.navy,

    flexDirection: "row",

    alignItems: "center",
  },

  masterIcon: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: COLORS.white,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 9,
  },

  masterEmoji: {
    fontSize: 24,
  },

  masterContent: {
    flex: 1,
  },

  masterTitle: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  masterText: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

});