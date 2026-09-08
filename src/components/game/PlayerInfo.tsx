import { StyleSheet, Text, View } from "react-native";

import { useGame } from "@/context/GameContext";

export default function PlayerInfo() {
  const { gameState } = useGame();

  const pets = {
    dog: {
      name: "Cachorrinho",
      emoji: "🐶",
      cost: 15,
    },

    cat: {
      name: "Gatinho",
      emoji: "🐱",
      cost: 12,
    },

    hamster: {
      name: "Hamster",
      emoji: "🐹",
      cost: 8,
    },

    fish: {
      name: "Peixinho",
      emoji: "🐠",
      cost: 5,
    },

    bird: {
      name: "Passarinho",
      emoji: "🐦",
      cost: 10,
    },

    turtle: {
      name: "Tartaruga",
      emoji: "🐢",
      cost: 7,
    },
  };

  const selectedPet =
    pets[gameState.selectedPet as keyof typeof pets];

  const progressPercentage =
    (gameState.currentMonth / 12) * 100;

  const totalMoney =
    gameState.balance +
    gameState.investmentBalance;

  const remainingMonths =
    Math.max(0, 12 - gameState.currentMonth);

  const ProgressBar = ({
    value,
    type = "default",
  }: {
    value: number;
    type?: "default" | "health" | "happiness" | "goal";
  }) => (
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          type === "health" && styles.healthFill,
          type === "happiness" && styles.happinessFill,
          type === "goal" && styles.goalFill,
          {
            width: `${Math.max(
              0,
              Math.min(100, value),
            )}%`,
          },
        ]}
      />
    </View>
  );

  const goalPercentage = gameState.personalGoal
    ? Math.min(
        100,
        (gameState.personalGoal.currentAmount /
          gameState.personalGoal.targetAmount) *
          100,
      )
    : 0;

  return (
    <View style={styles.container}>

      {/* ================================================== */}
      {/* JOGADOR / DINHEIRO */}
      {/* ================================================== */}

      <View style={styles.card}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>💰</Text>
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.cardTitle}>
              Meu Dinheiro
            </Text>

            <Text style={styles.cardSubtitle}>
              {gameState.playerName}
            </Text>
          </View>
        </View>

        <View style={styles.petMiniInfo}>
          <Text style={styles.petMiniEmoji}>
            {selectedPet?.emoji}
          </Text>

          <Text style={styles.petMiniText}>
            Cuidando do {selectedPet?.name}
          </Text>

          <View style={styles.petCostBadge}>
            <Text style={styles.petCostText}>
              R$ {selectedPet?.cost}/mês
            </Text>
          </View>
        </View>

        {/* DINHEIRO PRINCIPAL */}

        <View style={styles.moneyGrid}>

          <View style={styles.moneyBox}>

            <Text style={styles.moneyLabel}>
              💳 Na Carteira
            </Text>

            <Text style={styles.moneyValue}>
              R$ {gameState.balance.toFixed(0)}
            </Text>

          </View>

          <View style={styles.moneyBox}>

            <Text style={styles.moneyLabel}>
              🌱 Guardado
            </Text>

            <Text style={styles.investmentValue}>
              R$ {gameState.investmentBalance.toFixed(0)}
            </Text>

          </View>

        </View>

        {/* TOTAL */}

        <View style={styles.totalBox}>

          <View>
            <Text style={styles.totalLabel}>
              PATRIMÔNIO TOTAL
            </Text>

            <Text style={styles.totalHint}>
              Carteira + investimentos
            </Text>
          </View>

          <Text style={styles.totalValue}>
            R$ {totalMoney.toFixed(0)}
          </Text>

        </View>

        {/* META */}

        {gameState.personalGoal && (
          <View style={styles.goalBox}>

            <View style={styles.goalHeader}>

              <View style={styles.goalTitleContainer}>
                <Text style={styles.goalEmoji}>
                  🎯
                </Text>

                <View>
                  <Text style={styles.goalLabel}>
                    MINHA META
                  </Text>

                  <Text style={styles.goalTitle}>
                    {gameState.personalGoal.name}
                  </Text>
                </View>
              </View>

              <Text style={styles.goalPercentage}>
                {goalPercentage.toFixed(0)}%
              </Text>

            </View>

            <View style={styles.goalValues}>
              <Text style={styles.goalCurrent}>
                R${" "}
                {gameState.personalGoal.currentAmount.toFixed(
                  0,
                )}
              </Text>

              <Text style={styles.goalTarget}>
                de R${" "}
                {gameState.personalGoal.targetAmount.toFixed(
                  0,
                )}
              </Text>
            </View>

            <ProgressBar
              value={goalPercentage}
              type="goal"
            />

          </View>
        )}

      </View>

      {/* ================================================== */}
      {/* STATUS DO PET */}
      {/* ================================================== */}

      <View style={styles.card}>

        <View style={styles.sectionHeader}>

          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>
              {selectedPet?.emoji}
            </Text>
          </View>

          <View style={styles.sectionHeaderText}>

            <Text style={styles.cardTitle}>
              Status do Pet
            </Text>

            <Text style={styles.cardSubtitle}>
              {selectedPet?.name}
            </Text>

          </View>

        </View>

        <View style={styles.petStatusHero}>

          <View style={styles.petAvatar}>
            <Text style={styles.petEmoji}>
              {selectedPet?.emoji}
            </Text>
          </View>

          <View style={styles.petLevelBadge}>
            <Text style={styles.petLevel}>
              ⭐ Nível{" "}
              {Math.floor(gameState.petLevel)}
            </Text>
          </View>

        </View>

        <View style={styles.statusList}>

          {/* SAÚDE */}

          <View style={styles.statusCard}>

            <View style={styles.statusHeader}>

              <View style={styles.statusName}>
                <Text style={styles.statusIcon}>
                  ❤️
                </Text>

                <Text style={styles.statusLabel}>
                  Saúde
                </Text>
              </View>

              <Text style={styles.statusValue}>
                {gameState.petHealth.toFixed(0)}%
              </Text>

            </View>

            <ProgressBar
              value={gameState.petHealth}
              type="health"
            />

          </View>

          {/* FELICIDADE */}

          <View style={styles.statusCard}>

            <View style={styles.statusHeader}>

              <View style={styles.statusName}>
                <Text style={styles.statusIcon}>
                  😊
                </Text>

                <Text style={styles.statusLabel}>
                  Felicidade
                </Text>
              </View>

              <Text style={styles.statusValue}>
                {gameState.petHappiness.toFixed(0)}%
              </Text>

            </View>

            <ProgressBar
              value={gameState.petHappiness}
              type="happiness"
            />

          </View>

        </View>

      </View>

      {/* ================================================== */}
      {/* PROGRESSO DA AVENTURA */}
      {/* ================================================== */}

      <View style={styles.card}>

        <View style={styles.sectionHeader}>

          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>
              🗓️
            </Text>
          </View>

          <View style={styles.sectionHeaderText}>

            <Text style={styles.cardTitle}>
              Progresso da Aventura
            </Text>

            <Text style={styles.cardSubtitle}>
              Sua jornada financeira
            </Text>

          </View>

        </View>

        <View style={styles.adventureHero}>

          <Text style={styles.monthText}>
            Mês {gameState.currentMonth}
          </Text>

          <Text style={styles.monthTotal}>
            / 12
          </Text>

        </View>

        <View style={styles.adventurePercentage}>

          <Text style={styles.progressText}>
            Jornada completa
          </Text>

          <Text style={styles.percent}>
            {progressPercentage.toFixed(0)}%
          </Text>

        </View>

        <ProgressBar
          value={progressPercentage}
        />

        <View style={styles.remainingBox}>

          <Text style={styles.remainingIcon}>
            ⏳
          </Text>

          <Text style={styles.remainingText}>
            {remainingMonths === 0
              ? "Jornada concluída!"
              : remainingMonths === 1
                ? "1 mês restante"
                : `${remainingMonths} meses restantes`}
          </Text>

        </View>

        {/* CONQUISTAS */}

        {gameState.achievements.length > 0 && (
          <View style={styles.achievementBox}>

            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>
                🏅
              </Text>
            </View>

            <View style={styles.achievementInfo}>

              <Text style={styles.achievementTitle}>
                Conquistas
              </Text>

              <Text style={styles.achievementSubtitle}>
                Selos desbloqueados
              </Text>

            </View>

            <View style={styles.achievementCountBox}>
              <Text style={styles.achievementCount}>
                {gameState.achievements.length}
              </Text>
            </View>

          </View>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /*
   * ==========================================================
   * ESTRUTURA
   * ==========================================================
   */

  container: {
    gap: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D8E2DE",
    padding: 16,
    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#D7E900",
    borderWidth: 2,
    borderColor: "#003F4A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  sectionIconText: {
    fontSize: 24,
  },

  sectionHeaderText: {
    flex: 1,
  },

  cardTitle: {
    color: "#003F4A",
    fontSize: 19,
    fontWeight: "900",
  },

  cardSubtitle: {
    color: "#68787B",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * PET MINI
   * ==========================================================
   */

  petMiniInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE5E1",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },

  petMiniEmoji: {
    fontSize: 23,
    marginRight: 7,
  },

  petMiniText: {
    flex: 1,
    color: "#405C59",
    fontSize: 11,
    fontWeight: "700",
  },

  petCostBadge: {
    backgroundColor: "#E7F6F2",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  petCostText: {
    color: "#2B9D87",
    fontSize: 9,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * DINHEIRO
   * ==========================================================
   */

  moneyGrid: {
    flexDirection: "row",
    gap: 10,
  },

  moneyBox: {
    flex: 1,
    backgroundColor: "#F7FAF8",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DCE5E1",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },

  moneyLabel: {
    color: "#68787B",
    fontSize: 10,
    fontWeight: "700",
  },

  moneyValue: {
    color: "#2FBFA0",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },

  investmentValue: {
    color: "#7FC241",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },

  /*
   * ==========================================================
   * TOTAL
   * ==========================================================
   */

  totalBox: {
    marginTop: 10,
    backgroundColor: "#003F4A",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#D7E900",
    fontSize: 11,
    fontWeight: "900",
  },

  totalHint: {
    color: "#B8CAC7",
    fontSize: 8,
    marginTop: 2,
  },

  totalValue: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * META
   * ==========================================================
   */

  goalBox: {
    marginTop: 12,
    backgroundColor: "#F7FAF1",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#C8DDAA",
    padding: 12,
  },

  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  goalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  goalEmoji: {
    fontSize: 24,
    marginRight: 8,
  },

  goalLabel: {
    color: "#7B8A63",
    fontSize: 8,
    fontWeight: "900",
  },

  goalTitle: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 1,
  },

  goalPercentage: {
    color: "#4C8D36",
    fontSize: 18,
    fontWeight: "900",
  },

  goalValues: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 10,
    marginBottom: 6,
  },

  goalCurrent: {
    color: "#003F4A",
    fontSize: 17,
    fontWeight: "900",
  },

  goalTarget: {
    color: "#71807B",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },

  /*
   * ==========================================================
   * PET STATUS
   * ==========================================================
   */

  petStatusHero: {
    alignItems: "center",
    marginBottom: 14,
  },

  petAvatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#E7F6F2",
    borderWidth: 3,
    borderColor: "#2FBFA0",
    alignItems: "center",
    justifyContent: "center",
  },

  petEmoji: {
    fontSize: 50,
  },

  petLevelBadge: {
    backgroundColor: "#F3F6F5",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DCE5E1",
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginTop: 7,
  },

  petLevel: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "900",
  },

  statusList: {
    gap: 9,
  },

  statusCard: {
    backgroundColor: "#F7FAF8",
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#DCE5E1",
    padding: 10,
  },

  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  statusName: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    fontSize: 16,
    marginRight: 5,
  },

  statusLabel: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "800",
  },

  statusValue: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * BARRAS
   * ==========================================================
   */

  progressBackground: {
    height: 9,
    backgroundColor: "#DDE5E1",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2FBFA0",
    borderRadius: 999,
  },

  healthFill: {
    backgroundColor: "#E07A61",
  },

  happinessFill: {
    backgroundColor: "#2FBFA0",
  },

  goalFill: {
    backgroundColor: "#7FC241",
  },

  /*
   * ==========================================================
   * AVENTURA
   * ==========================================================
   */

  adventureHero: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 5,
  },

  monthText: {
    color: "#003F4A",
    fontSize: 32,
    fontWeight: "900",
  },

  monthTotal: {
    color: "#8A9995",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 3,
  },

  adventurePercentage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  progressText: {
    color: "#68787B",
    fontSize: 10,
    fontWeight: "700",
  },

  percent: {
    color: "#003F4A",
    fontSize: 12,
    fontWeight: "900",
  },

  remainingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6F5",
    borderRadius: 11,
    paddingVertical: 8,
    marginTop: 10,
  },

  remainingIcon: {
    fontSize: 15,
    marginRight: 5,
  },

  remainingText: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "800",
  },

  /*
   * ==========================================================
   * CONQUISTAS
   * ==========================================================
   */

  achievementBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7D7",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#9BCB68",
    padding: 9,
    marginTop: 10,
  },

  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#D7E900",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  achievementEmoji: {
    fontSize: 21,
  },

  achievementInfo: {
    flex: 1,
  },

  achievementTitle: {
    color: "#003F4A",
    fontSize: 12,
    fontWeight: "900",
  },

  achievementSubtitle: {
    color: "#68787B",
    fontSize: 9,
    marginTop: 2,
  },

  achievementCountBox: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#003F4A",
    alignItems: "center",
    justifyContent: "center",
  },

  achievementCount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});