import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function VisualPiggyBank() {
  const { gameState, updateGameState } = useGame();

  const [depositAmount, setDepositAmount] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const [showCreateGoal, setShowCreateGoal] = useState(false);

  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDescription, setGoalDescription] = useState("");

  const handleCreateGoal = () => {
    if (!goalName || !goalAmount || parseFloat(goalAmount) <= 0) {
      return;
    }

    updateGameState({
      personalGoal: {
        name: goalName,
        targetAmount: parseFloat(goalAmount),
        currentAmount: 0,
        description: goalDescription,
      },
    });

    setShowCreateGoal(false);

    setGoalName("");
    setGoalAmount("");
    setGoalDescription("");
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);

    if (
      !amount ||
      amount <= 0 ||
      amount > gameState.balance ||
      !gameState.personalGoal
    ) {
      return;
    }

    setShowAnimation(true);

    setTimeout(() => {
      const newGoalAmount = Math.min(
        gameState.personalGoal!.currentAmount + amount,
        gameState.personalGoal!.targetAmount,
      );

      updateGameState({
        balance: gameState.balance - amount,

        personalGoal: {
          ...gameState.personalGoal!,
          currentAmount: newGoalAmount,
        },

        currentMonthExtraExpenses: {
          ...gameState.currentMonthExtraExpenses,
          goalDeposits:
            gameState.currentMonthExtraExpenses.goalDeposits + amount,
        },
      });

      setDepositAmount("");
      setShowAnimation(false);
    }, 1000);
  };

  const suggestedGoals = [
    {
      name: "Bicicleta Nova",
      amount: 200,
      emoji: "🚲",
    },
    {
      name: "Videogame",
      amount: 300,
      emoji: "🎮",
    },
    {
      name: "Tablet",
      amount: 400,
      emoji: "📱",
    },
    {
      name: "Roupas Legais",
      amount: 150,
      emoji: "👕",
    },
    {
      name: "Kit de Arte",
      amount: 80,
      emoji: "🎨",
    },
  ];

  /*
   * ==========================================================
   * SEM META
   * ==========================================================
   */

  if (!gameState.personalGoal && !showCreateGoal) {
    return (
      <View style={styles.card}>

        <View style={styles.topBadge}>
          <Text style={styles.topBadgeEmoji}>🎯</Text>

          <Text style={styles.topBadgeText}>
            MINHA META
          </Text>
        </View>

        <View style={styles.dreamIcon}>
          <Text style={styles.bigEmoji}>💭</Text>
        </View>

        <Text style={styles.mainTitle}>
          O que você quer conquistar?
        </Text>

        <Text style={styles.goalDescription}>
          Escolha um sonho, defina quanto ele custa e comece
          a guardar dinheiro para realizá-lo!
        </Text>

        <View style={styles.dreamSteps}>

          <View style={styles.dreamStep}>
            <Text style={styles.stepEmoji}>💭</Text>
            <Text style={styles.stepText}>Sonhe</Text>
          </View>

          <Text style={styles.stepArrow}>→</Text>

          <View style={styles.dreamStep}>
            <Text style={styles.stepEmoji}>🪙</Text>
            <Text style={styles.stepText}>Guarde</Text>
          </View>

          <Text style={styles.stepArrow}>→</Text>

          <View style={styles.dreamStep}>
            <Text style={styles.stepEmoji}>🏆</Text>
            <Text style={styles.stepText}>Conquiste</Text>
          </View>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.primaryButton}
          onPress={() => setShowCreateGoal(true)}
        >
          <Text style={styles.buttonEmoji}>🎯</Text>

          <Text style={styles.buttonText}>
            Criar Minha Meta!
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  /*
   * ==========================================================
   * CRIANDO META
   * ==========================================================
   */

  if (showCreateGoal) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          <View style={styles.topBadge}>
            <Text style={styles.topBadgeEmoji}>✨</Text>

            <Text style={styles.topBadgeText}>
              NOVO SONHO
            </Text>
          </View>

          <Text style={styles.mainTitle}>
            Criar Minha Meta
          </Text>

          <Text style={styles.formDescription}>
            Conte qual é o seu sonho e descubra quanto precisa
            guardar para realizá-lo.
          </Text>

          <View style={styles.formSection}>

            <Text style={styles.label}>
              💭 O que você quer?
            </Text>

            <TextInput
              style={styles.input}
              value={goalName}
              onChangeText={setGoalName}
              placeholder="Ex: Bicicleta Nova"
              placeholderTextColor="#8A9693"
            />

            <Text style={styles.label}>
              💰 Quanto custa?
            </Text>

            <View style={styles.moneyInputWrapper}>
              <Text style={styles.moneyPrefix}>
                R$
              </Text>

              <TextInput
                style={styles.moneyInput}
                keyboardType="numeric"
                value={goalAmount}
                onChangeText={setGoalAmount}
                placeholder="200"
                placeholderTextColor="#8A9693"
              />
            </View>

            <Text style={styles.label}>
              ❤️ Por que é importante?
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
              ]}
              value={goalDescription}
              onChangeText={setGoalDescription}
              placeholder="Para passear com os amigos"
              placeholderTextColor="#8A9693"
              multiline
            />

          </View>

          <View style={styles.suggestionHeader}>
            <Text style={styles.sectionTitle}>
              💡 Sugestões Populares
            </Text>

            <Text style={styles.sectionSubtitle}>
              Toque para escolher
            </Text>
          </View>

          {suggestedGoals.map((goal) => (
            <TouchableOpacity
              activeOpacity={0.75}
              key={goal.name}
              style={[
                styles.suggestionCard,
                goalName === goal.name &&
                  styles.suggestionSelected,
              ]}
              onPress={() => {
                setGoalName(goal.name);
                setGoalAmount(goal.amount.toString());
              }}
            >
              <View style={styles.suggestionIcon}>
                <Text style={styles.suggestionEmoji}>
                  {goal.emoji}
                </Text>
              </View>

              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionName}>
                  {goal.name}
                </Text>

                <Text style={styles.suggestionAmount}>
                  R$ {goal.amount}
                </Text>
              </View>

              {goalName === goal.name && (
                <Text style={styles.selectedCheck}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.primaryButton}
            onPress={handleCreateGoal}
          >
            <Text style={styles.buttonEmoji}>🚀</Text>

            <Text style={styles.buttonText}>
              Criar Minha Meta!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryButton}
            onPress={() => setShowCreateGoal(false)}
          >
            <Text style={styles.secondaryButtonText}>
              ← Voltar
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }

  const goal = gameState.personalGoal;

  if (!goal) {
    return null;
  }

  const progress =
    (goal.currentAmount / goal.targetAmount) * 100;

  const isCompleted = progress >= 100;

  const remaining =
    goal.targetAmount - goal.currentAmount;

  const totalCoins = 20;

  const filledCoins = Math.floor(
    (progress / 100) * totalCoins,
  );

  /*
   * ==========================================================
   * META CONCLUÍDA
   * ==========================================================
   */

  if (isCompleted) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>

          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeEmoji}>
              🏆
            </Text>

            <Text style={styles.completedBadgeText}>
              CONQUISTA DESBLOQUEADA
            </Text>
          </View>

          <View style={styles.center}>

            <Text style={styles.trophy}>
              🏆
            </Text>

            <Text style={styles.completedTitle}>
              META CONQUISTADA!
            </Text>

            <Text style={styles.completedGoalName}>
              {goal.name}
            </Text>

            <View style={styles.completedMoneyBox}>

              <Text style={styles.completedMoneyLabel}>
                Você conseguiu juntar
              </Text>

              <Text style={styles.completedMoney}>
                R$ {goal.targetAmount.toFixed(0)}
              </Text>

            </View>

            <Text style={styles.completedMessage}>
              Você teve disciplina, guardou dinheiro
              e transformou um sonho em realidade! 🎉
            </Text>

          </View>

        </View>
      </ScrollView>
    );
  }

  /*
   * ==========================================================
   * META EM ANDAMENTO
   * ==========================================================
   */

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>

        <View style={styles.topBadge}>
          <Text style={styles.topBadgeEmoji}>🐷</Text>

          <Text style={styles.topBadgeText}>
            MEU COFRINHO
          </Text>
        </View>

        <Text style={styles.mainTitle}>
          {goal.name}
        </Text>

        {goal.description ? (
          <Text style={styles.goalMotivation}>
            "{goal.description}"
          </Text>
        ) : null}

        {/* COFRINHO */}

        <View style={styles.piggyContainer}>

          <View style={styles.piggyGlow}>
            <Text style={styles.pig}>
              🐷
            </Text>
          </View>

          {showAnimation && (
            <View style={styles.moneyAnimationContainer}>
              <Text style={styles.moneyAnimation}>
                💰
              </Text>
              <Text style={styles.moneyAnimation}>
                🪙
              </Text>
            </View>
          )}

          <Text style={styles.savedMoney}>
            R$ {goal.currentAmount.toFixed(0)}
          </Text>

          <Text style={styles.savedLabel}>
            já guardados
          </Text>

        </View>

        {/* PROGRESSO */}

        <View style={styles.progressHeader}>

          <Text style={styles.progressLabel}>
            PROGRESSO
          </Text>

          <Text style={styles.progressPercent}>
            {progress.toFixed(0)}%
          </Text>

        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress, 100)}%`,
              },
            ]}
          />
        </View>

        <View style={styles.progressValues}>

          <Text style={styles.progressCurrent}>
            R$ {goal.currentAmount.toFixed(0)}
          </Text>

          <Text style={styles.progressTarget}>
            R$ {goal.targetAmount.toFixed(0)}
          </Text>

        </View>

        {/* MOEDAS */}

        <View style={styles.coinSection}>

          <Text style={styles.coinTitle}>
            🪙 Seu cofrinho está enchendo!
          </Text>

          <View style={styles.coinsContainer}>
            {Array.from({
              length: totalCoins,
            }).map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.coin,
                  {
                    opacity:
                      index < filledCoins ? 1 : 0.18,
                  },
                ]}
              >
                🪙
              </Text>
            ))}
          </View>

        </View>

        {/* RESTANTE */}

        <View style={styles.remainingBox}>

          <Text style={styles.remainingEmoji}>
            🎯
          </Text>

          <View style={styles.remainingContent}>

            <Text style={styles.remainingLabel}>
              FALTA POUCO!
            </Text>

            <Text style={styles.remaining}>
              Faltam R$ {remaining.toFixed(0)}
            </Text>

          </View>

        </View>

        {/* DEPÓSITO */}

        <View style={styles.depositSection}>

          <Text style={styles.depositTitle}>
            💰 Quanto você quer guardar?
          </Text>

          <View style={styles.depositInputWrapper}>

            <Text style={styles.depositPrefix}>
              R$
            </Text>

            <TextInput
              style={styles.depositInput}
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
              placeholder="Digite um valor"
              placeholderTextColor="#8A9693"
            />

          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.primaryButton}
            onPress={handleDeposit}
          >
            <Text style={styles.buttonEmoji}>
              🪙
            </Text>

            <Text style={styles.buttonText}>
              Guardar no Cofrinho
            </Text>
          </TouchableOpacity>

          <Text style={styles.availableMoney}>
            💳 Disponível na carteira:{" "}
            <Text style={styles.availableMoneyBold}>
              R$ {gameState.balance.toFixed(0)}
            </Text>
          </Text>

        </View>

        {/* MOTIVAÇÃO */}

        <View style={styles.tipBox}>

          <Text style={styles.tipEmoji}>
            💡
          </Text>

          <View style={styles.tipContent}>

            <Text style={styles.tipTitle}>
              Dica do cofrinho
            </Text>

            <Text style={styles.tipText}>
              Guardar um pouco todos os meses pode
              te ajudar a alcançar seu sonho mais rápido!
            </Text>

          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /*
   * ==========================================================
   * ESTRUTURA
   * ==========================================================
   */

  scrollContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: COLORS.white,

    margin: 16,
    padding: 16,

    borderRadius: 20,

    borderWidth: 3,
    borderColor: "#003B49",

    shadowColor: "#003B49",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 7,

    elevation: 5,
  },

  center: {
    alignItems: "center",
  },

  /*
   * ==========================================================
   * BADGE
   * ==========================================================
   */

  topBadge: {
    alignSelf: "center",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F3E8FF",

    borderWidth: 2,
    borderColor: "#C084FC",

    borderRadius: 20,

    paddingVertical: 7,
    paddingHorizontal: 13,

    marginBottom: 12,
  },

  topBadgeEmoji: {
    fontSize: 18,
    marginRight: 6,
  },

  topBadgeText: {
    color: "#6B21A8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  /*
   * ==========================================================
   * TÍTULOS
   * ==========================================================
   */

  mainTitle: {
    fontSize: 23,
    fontWeight: "900",

    textAlign: "center",

    color: "#003B49",

    marginBottom: 10,
  },

  goalDescription: {
    color: "#60716D",
    fontSize: 14,
    lineHeight: 21,

    textAlign: "center",

    marginBottom: 18,
  },

  formDescription: {
    color: "#60716D",
    fontSize: 13,
    lineHeight: 20,

    textAlign: "center",

    marginBottom: 16,
  },

  goalMotivation: {
    color: "#6B21A8",
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "600",

    textAlign: "center",

    backgroundColor: "#F8F1FF",

    borderRadius: 10,

    paddingVertical: 8,
    paddingHorizontal: 12,

    marginBottom: 15,
  },

  /*
   * ==========================================================
   * SEM META
   * ==========================================================
   */

  dreamIcon: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: "#F3E8FF",

    borderWidth: 3,
    borderColor: "#D8B4FE",

    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",

    marginBottom: 14,
  },

  bigEmoji: {
    fontSize: 64,
  },

  dreamSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  dreamStep: {
    alignItems: "center",

    backgroundColor: "#F8FAF9",

    borderRadius: 12,

    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  stepEmoji: {
    fontSize: 22,
  },

  stepText: {
    color: "#003B49",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 2,
  },

  stepArrow: {
    color: "#9333EA",
    fontSize: 20,
    fontWeight: "900",
    marginHorizontal: 5,
  },

  /*
   * ==========================================================
   * FORMULÁRIO
   * ==========================================================
   */

  formSection: {
    backgroundColor: "#F8FAF9",

    borderRadius: 15,

    padding: 13,

    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#DCE5E1",
  },

  label: {
    color: "#003B49",

    fontSize: 13,
    fontWeight: "900",

    marginBottom: 6,
    marginTop: 5,
  },

  input: {
    backgroundColor: COLORS.white,

    borderWidth: 2,
    borderColor: "#C084FC",

    borderRadius: 11,

    paddingHorizontal: 12,
    paddingVertical: 11,

    fontSize: 14,

    color: "#003B49",

    marginBottom: 8,
  },

  descriptionInput: {
    minHeight: 65,
    textAlignVertical: "top",
  },

  moneyInputWrapper: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderWidth: 2,
    borderColor: "#C084FC",

    borderRadius: 11,

    marginBottom: 8,

    paddingLeft: 12,
  },

  moneyPrefix: {
    color: "#6B21A8",
    fontSize: 15,
    fontWeight: "900",
  },

  moneyInput: {
    flex: 1,

    paddingHorizontal: 8,
    paddingVertical: 11,

    color: "#003B49",
    fontSize: 15,
    fontWeight: "700",
  },

  /*
   * ==========================================================
   * SUGESTÕES
   * ==========================================================
   */

  suggestionHeader: {
    marginBottom: 9,
  },

  sectionTitle: {
    color: "#003B49",
    fontSize: 16,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#7A8985",
    fontSize: 10,
    marginTop: 2,
  },

  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F8F1FF",

    borderWidth: 2,
    borderColor: "#E2D0F5",

    borderRadius: 13,

    padding: 10,

    marginBottom: 8,
  },

  suggestionSelected: {
    backgroundColor: "#EFE0FF",
    borderColor: "#9333EA",
  },

  suggestionIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: COLORS.white,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  suggestionEmoji: {
    fontSize: 25,
  },

  suggestionContent: {
    flex: 1,
  },

  suggestionName: {
    color: "#003B49",
    fontSize: 13,
    fontWeight: "800",
  },

  suggestionAmount: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
  },

  selectedCheck: {
    color: "#7C3AED",
    fontSize: 22,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * COFRINHO
   * ==========================================================
   */

  piggyContainer: {
    alignItems: "center",

    backgroundColor: "#F8F1FF",

    borderRadius: 18,

    borderWidth: 2,
    borderColor: "#E2D0F5",

    paddingVertical: 15,

    marginBottom: 15,

    position: "relative",
  },

  piggyGlow: {
    width: 105,
    height: 105,

    borderRadius: 53,

    backgroundColor: "#E9D5FF",

    borderWidth: 3,
    borderColor: "#C084FC",

    alignItems: "center",
    justifyContent: "center",
  },

  pig: {
    fontSize: 68,
  },

  moneyAnimationContainer: {
    position: "absolute",

    top: 8,
    right: 50,

    flexDirection: "row",
  },

  moneyAnimation: {
    fontSize: 25,
    marginHorizontal: 2,
  },

  savedMoney: {
    fontSize: 34,
    fontWeight: "900",

    color: "#7C3AED",

    marginTop: 9,
  },

  savedLabel: {
    color: "#756B80",
    fontSize: 11,
    fontWeight: "600",
  },

  /*
   * ==========================================================
   * PROGRESSO
   * ==========================================================
   */

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 6,
  },

  progressLabel: {
    color: "#003B49",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  progressPercent: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "900",
  },

  progressBackground: {
    height: 17,

    backgroundColor: "#E9E7EC",

    borderRadius: 20,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    backgroundColor: "#9333EA",

    borderRadius: 20,
  },

  progressValues: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 5,
    marginBottom: 14,
  },

  progressCurrent: {
    color: "#7C3AED",
    fontSize: 11,
    fontWeight: "800",
  },

  progressTarget: {
    color: "#687772",
    fontSize: 11,
    fontWeight: "700",
  },

  /*
   * ==========================================================
   * MOEDAS
   * ==========================================================
   */

  coinSection: {
    backgroundColor: "#FFFBEB",

    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#F2D98A",

    padding: 11,

    marginBottom: 13,
  },

  coinTitle: {
    color: "#665817",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",

    marginBottom: 8,
  },

  coinsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    gap: 3,
  },

  coin: {
    fontSize: 19,
  },

  /*
   * ==========================================================
   * RESTANTE
   * ==========================================================
   */

  remainingBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EAF7D7",

    borderWidth: 2,
    borderColor: "#9ACB62",

    borderRadius: 14,

    padding: 11,

    marginBottom: 15,
  },

  remainingEmoji: {
    fontSize: 28,
    marginRight: 10,
  },

  remainingContent: {
    flex: 1,
  },

  remainingLabel: {
    color: "#567322",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  remaining: {
    color: "#003B49",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * DEPÓSITO
   * ==========================================================
   */

  depositSection: {
    backgroundColor: "#F8FAF9",

    borderRadius: 15,

    padding: 13,

    borderWidth: 1,
    borderColor: "#DCE5E1",

    marginBottom: 12,
  },

  depositTitle: {
    color: "#003B49",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",

    marginBottom: 9,
  },

  depositInputWrapper: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderWidth: 2,
    borderColor: "#C084FC",

    borderRadius: 11,

    paddingLeft: 12,

    marginBottom: 2,
  },

  depositPrefix: {
    color: "#6B21A8",
    fontSize: 16,
    fontWeight: "900",
  },

  depositInput: {
    flex: 1,

    paddingHorizontal: 9,
    paddingVertical: 12,

    color: "#003B49",

    fontSize: 15,
    fontWeight: "700",
  },

  availableMoney: {
    color: "#75827F",
    fontSize: 11,

    textAlign: "center",

    marginTop: 9,
  },

  availableMoneyBold: {
    color: "#003B49",
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * BOTÕES
   * ==========================================================
   */

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#9333EA",

    borderRadius: 13,

    paddingVertical: 14,

    marginTop: 12,

    shadowColor: "#6B21A8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,

    elevation: 3,
  },

  buttonEmoji: {
    fontSize: 20,
    marginRight: 7,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },

  secondaryButton: {
    alignItems: "center",

    backgroundColor: "#EEF1F0",

    borderRadius: 12,

    paddingVertical: 13,

    marginTop: 9,
  },

  secondaryButtonText: {
    color: "#52635F",
    fontSize: 14,
    fontWeight: "800",
  },

  /*
   * ==========================================================
   * DICA
   * ==========================================================
   */

  tipBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EFF6FF",

    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#BFDBFE",

    padding: 11,
  },

  tipEmoji: {
    fontSize: 27,
    marginRight: 9,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: "#1E40AF",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 2,
  },

  tipText: {
    color: "#405C72",
    fontSize: 11,
    lineHeight: 16,
  },

  /*
   * ==========================================================
   * META CONCLUÍDA
   * ==========================================================
   */

  completedBadge: {
    alignSelf: "center",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EAF7D7",

    borderWidth: 2,
    borderColor: "#7FC241",

    borderRadius: 20,

    paddingVertical: 7,
    paddingHorizontal: 13,

    marginBottom: 15,
  },

  completedBadgeEmoji: {
    fontSize: 18,
    marginRight: 6,
  },

  completedBadgeText: {
    color: "#4D681D",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  trophy: {
    fontSize: 90,
  },

  completedTitle: {
    fontSize: 25,
    fontWeight: "900",

    color: "#16A34A",

    textAlign: "center",

    marginTop: 5,
  },

  completedGoalName: {
    color: "#003B49",
    fontSize: 19,
    fontWeight: "900",

    textAlign: "center",

    marginTop: 4,
    marginBottom: 14,
  },

  completedMoneyBox: {
    backgroundColor: "#FFF7D6",

    borderWidth: 2,
    borderColor: "#E6C84F",

    borderRadius: 15,

    paddingVertical: 13,
    paddingHorizontal: 30,

    alignItems: "center",
  },

  completedMoneyLabel: {
    color: "#6B5C20",
    fontSize: 11,
    fontWeight: "700",
  },

  completedMoney: {
    color: "#003B49",
    fontSize: 32,
    fontWeight: "900",

    marginTop: 2,
  },

  completedMessage: {
    color: "#60716D",
    fontSize: 13,
    lineHeight: 20,

    textAlign: "center",

    marginTop: 15,
  },
});