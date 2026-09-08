import { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",
  lightGreen: "#EAF7D7",
  gray: "#68787B",
};

export default function AchievementSystem() {
  const { gameState, updateGameState } = useGame();

  const [showNewAchievement, setShowNewAchievement] = useState("");

  /*
   * ============================================================
   * CONQUISTAS
   * ============================================================
   */

  const achievements = [
    {
      id: "first_investment",
      name: "Primeira Semente",
      emoji: "🌱",
      description: "Guardou dinheiro pela primeira vez!",
    },

    {
      id: "pet_master",
      name: "Amigo dos Bichos",
      emoji: "🐾",
      description: "Manteve seu pet com 100% de saúde!",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description: "Criou sua primeira meta!",
    },

    {
      id: "saver",
      name: "Cofre de Ouro",
      emoji: "💎",
      description: "Juntou mais de R$ 100!",
    },

    {
      id: "helper",
      name: "Anjo da Guarda",
      emoji: "😇",
      description: "Ajudou alguém e ganhou dinheiro!",
    },

    {
      id: "resist_temptation",
      name: "Super Forte",
      emoji: "🛡️",
      description: "Resistiu a uma tentação!",
    },

    {
      id: "goal_achiever",
      name: "Conquistador",
      emoji: "🏅",
      description: "Realizou seu sonho!",
    },

    {
      id: "pet_lover",
      name: "Coração Animal",
      emoji: "💝",
      description: "Gastou mais de R$ 50 com pet!",
    },

    {
      id: "smart_spender",
      name: "Cérebro Financeiro",
      emoji: "🧠",
      description: "Gastou com inteligência!",
    },

    {
      id: "social_butterfly",
      name: "Amizade Dourada",
      emoji: "🦋",
      description: "Investiu nas amizades!",
    },

    {
      id: "emergency_prepared",
      name: "Sempre Pronto",
      emoji: "🚨",
      description: "Lidou com emergências!",
    },

    {
      id: "growth_expert",
      name: "Mago do Crescimento",
      emoji: "📈",
      description: "Dominou os investimentos!",
    },

    {
      id: "balanced_life",
      name: "Mestre do Equilíbrio",
      emoji: "⚖️",
      description: "Equilibrou tudo!",
    },

    {
      id: "wise_chooser",
      name: "Sábio das Decisões",
      emoji: "🦉",
      description: "Tomou ótimas decisões!",
    },

    {
      id: "generous_heart",
      name: "Coração Gigante",
      emoji: "❤️",
      description: "Ajudou muitas pessoas!",
    },

    {
      id: "future_planner",
      name: "Vidente Financeiro",
      emoji: "🔮",
      description: "Pensou no futuro!",
    },
  ];

  /*
   * ============================================================
   * VERIFICAR CONQUISTAS
   * ============================================================
   */

  const checkAchievements = () => {
    const newAchievements: string[] = [];

    /*
     * PET MASTER
     */

    if (
      !gameState.achievements.includes("pet_master") &&
      gameState.petHealth >= 100 &&
      gameState.currentMonth > 1
    ) {
      newAchievements.push("pet_master");
    }

    /*
     * GOAL SETTER
     */

    if (
      !gameState.achievements.includes("goal_setter") &&
      gameState.personalGoal
    ) {
      newAchievements.push("goal_setter");
    }

    /*
     * GOAL ACHIEVER
     */

    if (
      !gameState.achievements.includes("goal_achiever") &&
      gameState.personalGoal &&
      gameState.personalGoal.currentAmount >=
        gameState.personalGoal.targetAmount
    ) {
      newAchievements.push("goal_achiever");
    }

    /*
     * EMERGENCY PREPARED
     */

    if (
      !gameState.achievements.includes("emergency_prepared") &&
      gameState.parentLoan.amount > 0
    ) {
      newAchievements.push("emergency_prepared");
    }

    /*
     * ==========================================================
     * NOVAS CONQUISTAS
     * ==========================================================
     */

    if (newAchievements.length === 0) {
      return;
    }

    const updatedAchievements = [
      ...gameState.achievements,
      ...newAchievements,
    ];

    updateGameState({
      achievements: updatedAchievements,
    });

    /*
     * Mostra apenas a primeira conquista nova.
     */

    setShowNewAchievement(newAchievements[0]);

    setTimeout(() => {
      setShowNewAchievement("");
    }, 3500);
  };

  /*
   * ============================================================
   * VERIFICAÇÃO AUTOMÁTICA
   * ============================================================
   */

  useEffect(() => {
    checkAchievements();
  }, [
    gameState.petHealth,
    gameState.personalGoal?.currentAmount,
    gameState.personalGoal?.targetAmount,
    gameState.parentLoan.amount,
    gameState.balance,
    gameState.investmentBalance,
    gameState.currentMonth,
  ]);

  /*
   * ============================================================
   * SE NÃO HOUVER CONQUISTA NOVA
   * ============================================================
   */

  if (!showNewAchievement) {
    return null;
  }

  const achievement = achievements.find(
    (item) => item.id === showNewAchievement,
  );

  if (!achievement) {
    return null;
  }

  /*
   * ============================================================
   * POPUP
   * ============================================================
   */

  return (
    <View style={styles.overlay} pointerEvents="none">

      <View style={styles.card}>

        {/* ======================================================
            CABEÇALHO
            ====================================================== */}

        <View style={styles.topBar}>

          <View style={styles.starCircle}>
            <Text style={styles.star}>
              ★
            </Text>
          </View>

          <View style={styles.topBarCenter}>

            <Text style={styles.topBarTitle}>
              NOVA CONQUISTA!
            </Text>

            <Text style={styles.topBarSubtitle}>
              VOCÊ DESBLOQUEOU UM SELO
            </Text>

          </View>

          <View style={styles.starCircle}>
            <Text style={styles.star}>
              ★
            </Text>
          </View>

        </View>

        {/* ======================================================
            CONTEÚDO
            ====================================================== */}

        <View style={styles.content}>

          {/* ÍCONE */}

          <View style={styles.achievementIcon}>

            <Text style={styles.achievementEmoji}>
              {achievement.emoji}
            </Text>

          </View>

          {/* TEXTO */}

          <Text style={styles.conquestLabel}>
            CONQUISTA DESBLOQUEADA
          </Text>

          <Text style={styles.name}>
            {achievement.name}
          </Text>

          <Text style={styles.description}>
            {achievement.description}
          </Text>

          {/* DIVISOR */}

          <View style={styles.divider} />

          {/* RECOMPENSA */}

          <View style={styles.rewardPill}>

            <Text style={styles.rewardEmoji}>
              🏅
            </Text>

            <Text style={styles.rewardText}>
              Novo selo adicionado à sua coleção!
            </Text>

          </View>

        </View>

      </View>

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
   * OVERLAY
   * ==========================================================
   */

  overlay: {
    position: "absolute",

    top: 10,

    left: 12,

    right: 12,

    zIndex: 9999,

    alignItems: "center",
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    width: "100%",

    maxWidth: 380,

    backgroundColor: COLORS.white,

    borderRadius: 22,

    borderWidth: 3,

    borderColor: COLORS.navy,

    overflow: "hidden",

    elevation: 12,

    shadowColor: COLORS.navy,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    shadowOpacity: 0.28,

    shadowRadius: 10,
  },

  /*
   * ==========================================================
   * TOPO
   * ==========================================================
   */

  topBar: {
    minHeight: 58,

    backgroundColor: COLORS.navy,

    paddingHorizontal: 12,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  starCircle: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",
  },

  star: {
    color: COLORS.navy,

    fontSize: 20,

    fontWeight: "900",

    includeFontPadding: false,
  },

  topBarCenter: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 8,
  },

  topBarTitle: {
    color: COLORS.yellow,

    fontSize: 17,

    fontWeight: "900",

    letterSpacing: 0.8,

    textAlign: "center",

    includeFontPadding: false,
  },

  topBarSubtitle: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "700",

    marginTop: 3,

    letterSpacing: 0.4,

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CONTEÚDO
   * ==========================================================
   */

  content: {
    backgroundColor: "#F8FAF6",

    alignItems: "center",

    paddingHorizontal: 18,

    paddingTop: 18,

    paddingBottom: 16,
  },

  /*
   * ==========================================================
   * ÍCONE
   * ==========================================================
   */

  achievementIcon: {
    width: 78,

    height: 78,

    borderRadius: 39,

    backgroundColor: COLORS.yellow,

    borderWidth: 3,

    borderColor: COLORS.green,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 10,

    elevation: 4,

    shadowColor: COLORS.navy,

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.16,

    shadowRadius: 4,
  },

  achievementEmoji: {
    fontSize: 43,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * TEXTOS
   * ==========================================================
   */

  conquestLabel: {
    color: COLORS.turquoise,

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.7,

    textAlign: "center",

    marginBottom: 3,

    includeFontPadding: false,
  },

  name: {
    color: COLORS.navy,

    fontSize: 22,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 5,

    includeFontPadding: false,
  },

  description: {
    color: COLORS.gray,

    fontSize: 12,

    lineHeight: 17,

    fontWeight: "600",

    textAlign: "center",

    maxWidth: 300,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DIVISOR
   * ==========================================================
   */

  divider: {
    width: "65%",

    height: 2,

    backgroundColor: COLORS.yellow,

    marginVertical: 11,

    borderRadius: 999,
  },

  /*
   * ==========================================================
   * RECOMPENSA
   * ==========================================================
   */

  rewardPill: {
    backgroundColor: COLORS.lightGreen,

    borderWidth: 1.5,

    borderColor: COLORS.green,

    borderRadius: 999,

    minHeight: 32,

    paddingHorizontal: 12,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  rewardEmoji: {
    fontSize: 14,

    marginRight: 5,
  },

  rewardText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

});