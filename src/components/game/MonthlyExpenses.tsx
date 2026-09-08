import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ExtraTaskOpportunity from "@/components/game/ExtraTaskOpportunity";
import { useGame } from "@/context/GameContext";

interface MonthlyExpensesProps {
  currentMonth: number;
  balance: number;
  petCost: number;
  extraEarnings?: number;
  acceptedTemptation?: { cost: number } | null;
  acceptedSpecialAction?: { cost: number } | null;
  onExpensesConfirm: (
    expenses: Record<string, number>,
    extraEarnings?: number,
  ) => void;
}

export default function MonthlyExpenses({
  currentMonth,
  balance,
  petCost,
  extraEarnings = 0,
  acceptedTemptation = null,
  acceptedSpecialAction = null,
  onExpensesConfirm,
}: MonthlyExpensesProps) {
  const { gameState } = useGame();

  const [expenses, setExpenses] = useState<Record<string, number>>({
    pet: petCost,
  });

  const [showExtraTask, setShowExtraTask] = useState(false);

  const [currentExtraEarnings, setCurrentExtraEarnings] =
    useState(extraEarnings);

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

  const realPetCost = selectedPet?.cost || 15;

  /*
   * ============================================================
   * ATUALIZA DESPESAS FIXAS
   * ============================================================
   */

  useEffect(() => {
    setExpenses((prev) => {
      const updated = {
        ...prev,
        pet: realPetCost,
      };

      if (acceptedTemptation) {
        updated.temptation = acceptedTemptation.cost;
      } else {
        delete updated.temptation;
      }

      if (acceptedSpecialAction) {
        updated.specialAction = acceptedSpecialAction.cost;
      } else {
        delete updated.specialAction;
      }

      return updated;
    });
  }, [
    realPetCost,
    acceptedTemptation,
    acceptedSpecialAction,
  ]);

  /*
   * ============================================================
   * GANHOS EXTRAS
   * ============================================================
   */

  useEffect(() => {
    setCurrentExtraEarnings(extraEarnings);
  }, [extraEarnings]);

  /*
   * ============================================================
   * CATEGORIAS
   * ============================================================
   */

  const simpleCategories = [
    {
      id: "necessities",
      name: "Coisas Importantes",
      emoji: "📚",
      description:
        "Material escolar, roupas e transporte",
    },

    {
      id: "wants",
      name: "Coisas Divertidas",
      emoji: "🎮",
      description:
        "Jogos, doces e brinquedos",
    },

    {
      id: "friends",
      name: "Diversão com Amigos",
      emoji: "👫",
      description:
        "Cinema, presentes e lanches",
    },
  ];

  /*
   * ============================================================
   * ALTERAR CATEGORIA
   * ============================================================
   */

  const handleCategoryChange = (
    categoryId: string,
    amount: number,
  ) => {
    setExpenses((prev) => ({
      ...prev,
      [categoryId]: amount,
    }));
  };

  /*
   * ============================================================
   * CÁLCULOS
   * ============================================================
   */

  const getTotalSpent = () => {
    return Object.values(expenses).reduce(
      (sum, amount) => sum + amount,
      0,
    );
  };

  const totalAvailable =
    balance + currentExtraEarnings;

  const totalSpent = getTotalSpent();

  const remainingBalance =
    totalAvailable - totalSpent;

  /*
   * ============================================================
   * TRABALHO EXTRA
   * ============================================================
   */

  const handleExtraTaskAccept = (task: any) => {
    setCurrentExtraEarnings(
      (prev) => prev + task.earning,
    );

    setShowExtraTask(false);
  };

  const handleExtraTaskReject = () => {
    setShowExtraTask(false);
  };

  /*
   * ============================================================
   * CONFIRMAR
   * ============================================================
   */

  const handleConfirm = () => {
    if (remainingBalance < 0 && !showExtraTask) {
      setShowExtraTask(true);
      return;
    }

    if (remainingBalance < 0) {
      return;
    }

    onExpensesConfirm(
      expenses,
      currentExtraEarnings,
    );
  };

  /*
   * ============================================================
   * TRABALHO EXTRA
   * ============================================================
   */

  if (showExtraTask) {
    return (
      <ExtraTaskOpportunity
        currentMonth={currentMonth}
        deficit={Math.abs(remainingBalance)}
        onTaskAccept={handleExtraTaskAccept}
        onTaskReject={handleExtraTaskReject}
      />
    );
  }

  /*
   * ============================================================
   * TELA
   * ============================================================
   */

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>

        {/* ================================================== */}
        {/* RESUMO FINANCEIRO */}
        {/* ================================================== */}

        <View style={styles.mainCard}>

          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>
              PLANEJAMENTO FINANCEIRO
            </Text>
          </View>

          <Text style={styles.title}>
            💰 Meu Dinheiro
          </Text>

          <Text style={styles.monthText}>
            Mês {currentMonth}
          </Text>

          <View style={styles.moneyBox}>

            <Text style={styles.moneyLabel}>
              Tenho disponível
            </Text>

            <Text style={styles.moneyValue}>
              R$ {totalAvailable.toFixed(0)}
            </Text>

            {currentExtraEarnings > 0 && (
              <View style={styles.extraMoneyBadge}>
                <Text style={styles.extraMoney}>
                  + R$ {currentExtraEarnings} extras ✨
                </Text>
              </View>
            )}

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryEmoji}>
                💸
              </Text>

              <Text style={styles.summaryLabel}>
                Gastei
              </Text>

              <Text style={styles.summarySpent}>
                R$ {totalSpent.toFixed(0)}
              </Text>
            </View>

            <View
              style={[
                styles.summaryCard,
                remainingBalance < 0 &&
                  styles.summaryDanger,
              ]}
            >
              <Text style={styles.summaryEmoji}>
                {remainingBalance >= 0
                  ? "💰"
                  : "⚠️"}
              </Text>

              <Text style={styles.summaryLabel}>
                {remainingBalance >= 0
                  ? "Sobra"
                  : "Falta"}
              </Text>

              <Text
                style={[
                  styles.summaryRemaining,
                  {
                    color:
                      remainingBalance >= 0
                        ? "#3D9A35"
                        : "#D4553F",
                  },
                ]}
              >
                R$ {Math.abs(remainingBalance).toFixed(0)}
              </Text>
            </View>

          </View>

        </View>

        {/* ================================================== */}
        {/* PET */}
        {/* ================================================== */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <View style={styles.sectionIcon}>
              <Text style={styles.sectionEmoji}>
                🐾
              </Text>
            </View>

            <View style={styles.sectionHeaderText}>

              <Text style={styles.sectionTitle}>
                Cuidados com o Pet
              </Text>

              <Text style={styles.sectionSubtitle}>
                Um gasto importante todos os meses
              </Text>

            </View>

          </View>

          <View style={styles.petRow}>

            <View style={styles.petEmojiBox}>
              <Text style={styles.petEmoji}>
                {selectedPet?.emoji}
              </Text>
            </View>

            <View style={styles.petInfo}>

              <Text style={styles.petTitle}>
                Meu {selectedPet?.name}
              </Text>

              <Text style={styles.petDescription}>
                Precisa de cuidados todos os meses
              </Text>

              <View style={styles.petStatsRow}>

                <View style={styles.petStat}>
                  <Text style={styles.petStatText}>
                    ❤️ {gameState.petHealth.toFixed(0)}%
                  </Text>
                </View>

                <View style={styles.petStat}>
                  <Text style={styles.petStatText}>
                    😊 {gameState.petHappiness.toFixed(0)}%
                  </Text>
                </View>

              </View>

            </View>

            <View style={styles.petCostBox}>

              <Text style={styles.petCost}>
                R$ {realPetCost}
              </Text>

              <Text style={styles.required}>
                FIXO
              </Text>

            </View>

          </View>

        </View>

        {/* ================================================== */}
        {/* CATEGORIAS */}
        {/* ================================================== */}

        <Text style={styles.sectionMainTitle}>
          🛒 Como você vai gastar?
        </Text>

        <Text style={styles.sectionMainDescription}>
          Escolha quanto pretende gastar em cada categoria.
        </Text>

        {simpleCategories.map((category) => {

          const currentAmount =
            expenses[category.id] || 0;

          const alreadyCommitted =
            realPetCost +
            (expenses.temptation || 0) +
            (expenses.specialAction || 0);

          const maxValue = Math.max(
            0,
            totalAvailable - alreadyCommitted,
          );

          return (
            <View
              key={category.id}
              style={styles.categoryCard}
            >

              <View style={styles.categoryHeader}>

                <View style={styles.categoryEmojiBox}>
                  <Text style={styles.categoryEmoji}>
                    {category.emoji}
                  </Text>
                </View>

                <View style={styles.categoryInfo}>

                  <Text style={styles.categoryTitle}>
                    {category.name}
                  </Text>

                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>

                </View>

                <View style={styles.categoryValueBox}>

                  <Text style={styles.categoryValueLabel}>
                    Gasto
                  </Text>

                  <Text style={styles.categoryValue}>
                    R$ {currentAmount}
                  </Text>

                </View>

              </View>

              <View style={styles.divider} />

              <Text style={styles.chooseAmount}>
                Escolha um valor:
              </Text>

              <View style={styles.optionsRow}>

                {[0, 0.2, 0.4, 0.6, 0.8, 1].map(
                  (percentage) => {

                    const amount = Math.floor(
                      maxValue * percentage,
                    );

                    const selected =
                      currentAmount === amount;

                    return (
                      <TouchableOpacity
                        key={percentage}
                        style={[
                          styles.optionButton,
                          selected &&
                            styles.optionSelected,
                        ]}
                        onPress={() =>
                          handleCategoryChange(
                            category.id,
                            amount,
                          )
                        }
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selected &&
                              styles.optionTextSelected,
                          ]}
                        >
                          R$ {amount}
                        </Text>
                      </TouchableOpacity>
                    );
                  },
                )}

              </View>

            </View>
          );
        })}

        {/* ================================================== */}
        {/* CONFIRMAÇÃO */}
        {/* ================================================== */}

        <View
          style={[
            styles.confirmCard,
            remainingBalance < 0 &&
              styles.confirmDanger,
          ]}
        >

          <View style={styles.confirmIcon}>
            <Text style={styles.confirmEmoji}>
              {remainingBalance >= 0
                ? "✅"
                : "💪"}
            </Text>
          </View>

          <Text style={styles.confirmTitle}>
            {remainingBalance >= 0
              ? "Planejamento do Mês"
              : "Seu orçamento não fecha"}
          </Text>

          {remainingBalance >= 0 ? (
            <Text style={styles.confirmDescription}>
              Você está dentro do orçamento!
              Ainda sobraram{" "}
              <Text style={styles.confirmHighlight}>
                R$ {remainingBalance.toFixed(0)}
              </Text>
              .
            </Text>
          ) : (
            <Text style={styles.warning}>
              Faltam R${" "}
              {Math.abs(remainingBalance).toFixed(0)}.
              Você pode ganhar dinheiro extra para
              equilibrar o orçamento.
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.confirmButton,
              remainingBalance < 0 &&
                styles.extraButton,
            ]}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >

            <Text style={styles.confirmButtonText}>
              {remainingBalance >= 0
                ? "Confirmar Planejamento"
                : "Buscar Trabalho Extra"}
            </Text>

            <Text style={styles.confirmArrow}>
              →
            </Text>

          </TouchableOpacity>

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
    paddingBottom: 30,
  },

  container: {
    padding: 16,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    borderWidth: 3,

    borderColor: "#003F4A",

    padding: 18,

    marginBottom: 16,

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,

      height: 4,
    },

    shadowOpacity: 0.14,

    shadowRadius: 7,

    elevation: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    borderWidth: 2,

    borderColor: "#D8E2DE",

    padding: 16,

    marginBottom: 16,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  headerBadge: {
    alignSelf: "center",

    backgroundColor: "#003F4A",

    borderRadius: 999,

    paddingHorizontal: 12,

    paddingVertical: 5,

    marginBottom: 8,
  },

  headerBadgeText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.7,
  },

  title: {
    color: "#003F4A",

    fontSize: 25,

    fontWeight: "900",

    textAlign: "center",
  },

  monthText: {
    color: "#68787B",

    fontSize: 13,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 2,

    marginBottom: 15,
  },

  /*
   * ==========================================================
   * DINHEIRO
   * ==========================================================
   */

  moneyBox: {
    backgroundColor: "#FFF8D7",

    borderRadius: 17,

    borderWidth: 2,

    borderColor: "#D7E900",

    paddingVertical: 17,

    alignItems: "center",

    marginBottom: 12,
  },

  moneyLabel: {
    color: "#68787B",

    fontSize: 12,

    fontWeight: "700",

    marginBottom: 2,
  },

  moneyValue: {
    color: "#003F4A",

    fontSize: 38,

    fontWeight: "900",
  },

  extraMoneyBadge: {
    backgroundColor: "#EAF7D7",

    borderRadius: 999,

    paddingHorizontal: 10,

    paddingVertical: 4,

    marginTop: 5,
  },

  extraMoney: {
    color: "#3D9A35",

    fontSize: 11,

    fontWeight: "900",
  },

  /*
   * ==========================================================
   * RESUMO
   * ==========================================================
   */

  summaryRow: {
    flexDirection: "row",

    gap: 10,
  },

  summaryCard: {
    flex: 1,

    backgroundColor: "#F4F7F6",

    borderRadius: 14,

    borderWidth: 1.5,

    borderColor: "#DDE5E1",

    paddingVertical: 11,

    alignItems: "center",
  },

  summaryDanger: {
    backgroundColor: "#FFF3EF",

    borderColor: "#F2B8A7",
  },

  summaryEmoji: {
    fontSize: 20,

    marginBottom: 2,
  },

  summaryLabel: {
    color: "#68787B",

    fontSize: 10,

    fontWeight: "800",
  },

  summarySpent: {
    color: "#D4553F",

    fontSize: 20,

    fontWeight: "900",

    marginTop: 2,
  },

  summaryRemaining: {
    fontSize: 20,

    fontWeight: "900",

    marginTop: 2,
  },

  /*
   * ==========================================================
   * SEÇÃO PET
   * ==========================================================
   */

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 14,
  },

  sectionIcon: {
    width: 42,

    height: 42,

    borderRadius: 12,

    backgroundColor: "#D7E900",

    borderWidth: 2,

    borderColor: "#003F4A",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 10,
  },

  sectionEmoji: {
    fontSize: 23,
  },

  sectionHeaderText: {
    flex: 1,
  },

  sectionTitle: {
    color: "#003F4A",

    fontSize: 17,

    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#68787B",

    fontSize: 11,

    marginTop: 2,

    fontWeight: "600",
  },

  petRow: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F4F8F5",

    borderRadius: 15,

    borderWidth: 1.5,

    borderColor: "#DCE6E1",

    padding: 11,
  },

  petEmojiBox: {
    width: 55,

    height: 55,

    borderRadius: 15,

    backgroundColor: "#E7F6F2",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 10,
  },

  petEmoji: {
    fontSize: 34,
  },

  petInfo: {
    flex: 1,
  },

  petTitle: {
    color: "#003F4A",

    fontSize: 15,

    fontWeight: "900",
  },

  petDescription: {
    color: "#68787B",

    fontSize: 10,

    marginTop: 2,

    lineHeight: 14,
  },

  petStatsRow: {
    flexDirection: "row",

    gap: 5,

    marginTop: 5,
  },

  petStat: {
    backgroundColor: "#FFFFFF",

    borderRadius: 8,

    paddingHorizontal: 6,

    paddingVertical: 3,
  },

  petStatText: {
    color: "#405C59",

    fontSize: 9,

    fontWeight: "800",
  },

  petCostBox: {
    alignItems: "center",

    marginLeft: 7,
  },

  petCost: {
    color: "#003F4A",

    fontSize: 18,

    fontWeight: "900",
  },

  required: {
    color: "#D4553F",

    fontSize: 8,

    fontWeight: "900",

    marginTop: 2,
  },

  /*
   * ==========================================================
   * TÍTULO DAS CATEGORIAS
   * ==========================================================
   */

  sectionMainTitle: {
    color: "#003F4A",

    fontSize: 21,

    fontWeight: "900",

    marginBottom: 3,
  },

  sectionMainDescription: {
    color: "#68787B",

    fontSize: 12,

    fontWeight: "600",

    marginBottom: 12,
  },

  /*
   * ==========================================================
   * CATEGORIAS
   * ==========================================================
   */

  categoryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 19,

    borderWidth: 2,

    borderColor: "#D8E2DE",

    padding: 14,

    marginBottom: 12,
  },

  categoryHeader: {
    flexDirection: "row",

    alignItems: "center",
  },

  categoryEmojiBox: {
    width: 48,

    height: 48,

    borderRadius: 14,

    backgroundColor: "#E7F6F2",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 10,
  },

  categoryEmoji: {
    fontSize: 27,
  },

  categoryInfo: {
    flex: 1,
  },

  categoryTitle: {
    color: "#003F4A",

    fontSize: 15,

    fontWeight: "900",
  },

  categoryDescription: {
    color: "#68787B",

    fontSize: 10,

    lineHeight: 14,

    marginTop: 2,
  },

  categoryValueBox: {
    alignItems: "flex-end",

    marginLeft: 5,
  },

  categoryValueLabel: {
    color: "#899592",

    fontSize: 8,

    fontWeight: "800",

    textTransform: "uppercase",
  },

  categoryValue: {
    color: "#2FBFA0",

    fontSize: 19,

    fontWeight: "900",

    marginTop: 1,
  },

  divider: {
    height: 1,

    backgroundColor: "#E5ECE8",

    marginVertical: 12,
  },

  chooseAmount: {
    color: "#405C59",

    fontSize: 10,

    fontWeight: "800",

    marginBottom: 7,
  },

  optionsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 6,
  },

  optionButton: {
    backgroundColor: "#F0F4F2",

    borderRadius: 9,

    borderWidth: 1.5,

    borderColor: "#D3DEDA",

    paddingVertical: 8,

    paddingHorizontal: 9,

    minWidth: 48,

    alignItems: "center",
  },

  optionSelected: {
    backgroundColor: "#2FBFA0",

    borderColor: "#003F4A",
  },

  optionText: {
    color: "#003F4A",

    fontSize: 10,

    fontWeight: "800",
  },

  optionTextSelected: {
    color: "#FFFFFF",

    fontWeight: "900",
  },

  /*
   * ==========================================================
   * CONFIRMAÇÃO
   * ==========================================================
   */

  confirmCard: {
    backgroundColor: "#EAF7D7",

    borderRadius: 20,

    borderWidth: 2.5,

    borderColor: "#7FC241",

    padding: 18,

    alignItems: "center",

    marginTop: 4,

    marginBottom: 15,
  },

  confirmDanger: {
    backgroundColor: "#FFF4EE",

    borderColor: "#EA580C",
  },

  confirmIcon: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: "#D7E900",

    borderWidth: 2,

    borderColor: "#003F4A",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 8,
  },

  confirmEmoji: {
    fontSize: 25,
  },

  confirmTitle: {
    color: "#003F4A",

    fontSize: 19,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 5,
  },

  confirmDescription: {
    color: "#405C59",

    fontSize: 12,

    lineHeight: 18,

    textAlign: "center",

    marginBottom: 13,
  },

  confirmHighlight: {
    color: "#3D9A35",

    fontWeight: "900",
  },

  warning: {
    color: "#A74330",

    fontSize: 12,

    lineHeight: 18,

    textAlign: "center",

    fontWeight: "700",

    marginBottom: 13,
  },

  confirmButton: {
    width: "100%",

    minHeight: 51,

    borderRadius: 14,

    backgroundColor: "#2FBFA0",

    borderWidth: 2,

    borderColor: "#003F4A",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.16,

    shadowRadius: 4,

    elevation: 3,
  },

  extraButton: {
    backgroundColor: "#EA580C",
  },

  confirmButtonText: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "900",
  },

  confirmArrow: {
    color: "#FFFFFF",

    fontSize: 20,

    fontWeight: "900",

    marginLeft: 8,
  },
});