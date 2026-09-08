import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

import ChapterSpecialEvent from "./ChapterSpecialEvent";
import CollectibleStickers from "./CollectibleStickers";
import GameEnding from "./GameEnding";
import MonthlyExpenses from "./MonthlyExpenses";
import PetInteraction from "./PetInteraction";
import ShoppingMiniGame from "./ShoppingMiniGame";
import VisualPiggyBank from "./VisualPiggyBank";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  blue: "#55B6FF",
  pink: "#FF6BA6",
  orange: "#FFA233",
  white: "#FFFFFF",
  lightGray: "#F1F1F1",
  gray: "#D1D5DB",
  darkGray: "#68787B",
  danger: "#E52B2B",
};

export default function MonthlyActions() {
  const { gameState, updateGameState } = useGame();

  /*
   * ============================================================
   * ESTADO
   * ============================================================
   */

  const [currentStep, setCurrentStep] = useState("expenses");

  const [monthlyExpenses, setMonthlyExpenses] = useState<
    Record<string, number>
  >({});

  const [extraEarnings, setExtraEarnings] = useState(0);

  const [investmentAmount, setInvestmentAmount] = useState("");

  const [activeTab, setActiveTab] = useState("expenses");

  const [showChapterEvent, setShowChapterEvent] = useState(false);

  const [showShoppingGame, setShowShoppingGame] = useState(false);

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

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

  const petCost = selectedPet?.cost || 15;

  /*
   * ============================================================
   * PET PRECISA DE VETERINÁRIO
   * ============================================================
   */

  const needsVet = gameState.petHealth <= 0;

  /*
   * ============================================================
   * CONTROLE DO MÊS
   * ============================================================
   */

  useEffect(() => {
    if (gameState.currentMonth <= 1) {
      return;
    }

    updateGameState({
      currentMonthExtraExpenses: {
        goalDeposits: 0,
        petCare: 0,
      },
    });

    setShowChapterEvent(false);
    setShowShoppingGame(false);

    const healthDecrease = Math.random() * 15 + 5;
    const happinessDecrease = Math.random() * 10 + 5;

    updateGameState({
      petHealth: Math.max(
        0,
        gameState.petHealth - healthDecrease,
      ),

      petHappiness: Math.max(
        0,
        gameState.petHappiness - happinessDecrease,
      ),
    });

    const timer = setTimeout(() => {
      if (gameState.currentMonth === 3) {
        setShowShoppingGame(true);
      } else {
        setShowChapterEvent(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [gameState.currentMonth]);

  /*
   * ============================================================
   * SE PET ESTÁ SEM SAÚDE, ABRIR ABA PET
   * ============================================================
   */

  useEffect(() => {
    if (needsVet) {
      setActiveTab("pet");
    }
  }, [needsVet]);

  /*
   * ============================================================
   * FINAL DO JOGO
   * ============================================================
   */

  if (gameState.currentMonth > 12) {
    return <GameEnding />;
  }

  /*
   * ============================================================
   * EVENTO ESPECIAL
   * ============================================================
   */

  const handleChapterEventComplete = (result: any) => {
    if (result.moneyChange !== 0) {
      updateGameState({
        balance:
          gameState.balance + result.moneyChange,
      });
    }

    if (result.petHappinessChange !== 0) {
      updateGameState({
        petHappiness: Math.min(
          100,
          Math.max(
            0,
            gameState.petHappiness +
              result.petHappinessChange,
          ),
        ),
      });
    }

    if (result.extraEarnings > 0) {
      setExtraEarnings(
        (prev) => prev + result.extraEarnings,
      );
    }

    if (result.achievement) {
      if (
        !gameState.achievements.includes(
          result.achievement,
        )
      ) {
        updateGameState({
          achievements: [
            ...gameState.achievements,
            result.achievement,
          ],
        });
      }
    }

    setShowChapterEvent(false);
  };

  /*
   * ============================================================
   * MINI GAME DE COMPRAS
   * ============================================================
   */

  const handleShoppingGameComplete = (
    savings: number,
  ) => {
    if (savings > 0) {
      setExtraEarnings(
        (prev) => prev + savings,
      );

      if (
        !gameState.achievements.includes(
          "smart_spender",
        )
      ) {
        updateGameState({
          achievements: [
            ...gameState.achievements,
            "smart_spender",
          ],
        });
      }
    }

    setShowShoppingGame(false);
  };

  /*
   * ============================================================
   * CONFIRMAR GASTOS
   * ============================================================
   */

  const handleExpensesConfirm = (
    expenses: Record<string, number>,
    earnings = 0,
  ) => {
    const expensesWithExtras = {
      ...expenses,

      goalDeposit:
        gameState.currentMonthExtraExpenses
          .goalDeposits,

      petCareExtra:
        gameState.currentMonthExtraExpenses
          .petCare,
    };

    setMonthlyExpenses(
      expensesWithExtras,
    );

    setExtraEarnings(earnings);

    setCurrentStep("investment");
  };

  /*
   * ============================================================
   * SALDO APÓS GASTOS
   * ============================================================
   */

  const calculateRemainingAfterExpenses = () => {
    const totalExpenses =
      Object.values(monthlyExpenses).reduce(
        (sum, amount) => sum + amount,
        0,
      );

    return (
      gameState.balance +
      extraEarnings -
      totalExpenses
    );
  };

  /*
   * ============================================================
   * CONFIRMAR INVESTIMENTO
   * ============================================================
   */

  const handleInvestmentConfirm = () => {
    const investAmount =
      parseFloat(investmentAmount) || 0;

    let newBalance =
      calculateRemainingAfterExpenses() -
      investAmount;

    let newInvestmentBalance =
      gameState.investmentBalance +
      investAmount;

    newInvestmentBalance *= 1.01;

    const newMonth =
      gameState.currentMonth + 1;

    let parentLoanDeduction = 0;

    let updatedParentLoan =
      gameState.parentLoan;

    /*
     * ========================================================
     * EMPRÉSTIMO DOS PAIS
     * ========================================================
     */

    if (gameState.parentLoan.amount > 0) {
      parentLoanDeduction =
        gameState.parentLoan.amount;

      newBalance -= parentLoanDeduction;

      updatedParentLoan = {
        amount: 0,
        reason: "",
      };
    }

    /*
     * ========================================================
     * NOVA RENDA
     * ========================================================
     */

    if (newMonth <= 12) {
      newBalance += gameState.monthlyIncome;
    }

    /*
     * ========================================================
     * HISTÓRICO DE GASTOS
     * ========================================================
     */

    const newMonthlyExpenses = [
      ...gameState.monthlyExpenses,

      {
        pet:
          monthlyExpenses.pet || 0,

        personal:
          (monthlyExpenses.necessities ||
            0) +
          (monthlyExpenses.wants ||
            0) +
          (monthlyExpenses.temptation ||
            0) +
          (monthlyExpenses.specialAction ||
            0) +
          (monthlyExpenses.goalDeposit ||
            0) +
          (monthlyExpenses.petCareExtra ||
            0),

        friends:
          monthlyExpenses.friends || 0,

        investments:
          investAmount,

        emergencies:
          parentLoanDeduction,
      },
    ];

    /*
     * ========================================================
     * CONQUISTAS
     * ========================================================
     */

    const newAchievements = [
      ...gameState.achievements,
    ];

    if (
      investAmount > 0 &&
      !newAchievements.includes(
        "first_investment",
      )
    ) {
      newAchievements.push(
        "first_investment",
      );
    }

    const monthsWithInvestments =
      newMonthlyExpenses.filter(
        (month) =>
          month.investments > 0,
      ).length;

    if (
      monthsWithInvestments >= 3 &&
      !newAchievements.includes(
        "future_planner",
      )
    ) {
      newAchievements.push(
        "future_planner",
      );
    }

    if (
      newBalance +
        newInvestmentBalance >=
        100 &&
      gameState.currentMonth >= 3 &&
      !newAchievements.includes(
        "saver",
      )
    ) {
      newAchievements.push(
        "saver",
      );
    }

    /*
     * ========================================================
     * PET
     * ========================================================
     */

    const totalPetCare =
      newMonthlyExpenses.reduce(
        (sum, month) =>
          sum + month.pet,
        0,
      ) +
      gameState.currentMonthExtraExpenses
        .petCare;

    /*
     * ========================================================
     * AMIGOS
     * ========================================================
     */

    const totalFriends =
      newMonthlyExpenses.reduce(
        (sum, month) =>
          sum + month.friends,
        0,
      );

    if (
      gameState.petHealth >= 70 &&
      gameState.personalGoal &&
      totalFriends >= 20 &&
      gameState.currentMonth >= 4 &&
      !newAchievements.includes(
        "balanced_life",
      )
    ) {
      newAchievements.push(
        "balanced_life",
      );
    }

    if (
      totalPetCare >= 50 &&
      !newAchievements.includes(
        "pet_lover",
      )
    ) {
      newAchievements.push(
        "pet_lover",
      );
    }

    if (
      totalFriends >= 30 &&
      totalFriends <= 100 &&
      !newAchievements.includes(
        "social_butterfly",
      )
    ) {
      newAchievements.push(
        "social_butterfly",
      );
    }

    /*
     * ========================================================
     * SALVAR ESTADO
     * ========================================================
     */

    updateGameState({
      currentMonth: newMonth,

      balance: Math.max(
        0,
        newBalance,
      ),

      investmentBalance:
        newInvestmentBalance,

      monthlyExpenses:
        newMonthlyExpenses,

      parentLoan:
        updatedParentLoan,

      achievements:
        newAchievements,
    });

    setCurrentStep("results");
  };

  /*
   * ============================================================
   * RESET PARA PRÓXIMO MÊS
   * ============================================================
   */

  const resetForNextMonth = () => {
    setCurrentStep("expenses");

    setActiveTab("expenses");

    setMonthlyExpenses({});

    setExtraEarnings(0);

    setInvestmentAmount("");
  };

  /*
   * ============================================================
   * ABA / NAVEGAÇÃO
   * ============================================================
   */

  const tabs = [
    {
      id: "expenses",
      name: "Gastos",
      emoji: "💰",
    },

    {
      id: "pet",
      name: needsVet
        ? "Vet"
        : "Pet",
      emoji: needsVet
        ? "🚨"
        : selectedPet?.emoji ||
          "🐾",
    },

    {
      id: "goal",
      name: "Meta",
      emoji: "🎯",
    },

    {
      id: "stickers",
      name: "Selos",
      emoji: "🏷️",
    },
  ];

  /*
   * ============================================================
   * RENDER - GASTOS
   * ============================================================
   */

  if (currentStep === "expenses") {

    /*
     * ========================================================
     * EVENTO DO CAPÍTULO
     * ========================================================
     */

    if (showChapterEvent) {
      return (
        <View style={styles.fullWidth}>
          <ChapterSpecialEvent
            currentMonth={
              gameState.currentMonth
            }
            balance={
              gameState.balance +
              extraEarnings
            }
            petCost={petCost}
            onEventComplete={
              handleChapterEventComplete
            }
          />
        </View>
      );
    }

    /*
     * ========================================================
     * MINI GAME
     * ========================================================
     */

    if (showShoppingGame) {
      return (
        <View style={styles.fullWidth}>
          <ShoppingMiniGame
            onComplete={
              handleShoppingGameComplete
            }
          />
        </View>
      );
    }

    /*
     * ========================================================
     * CONTEÚDO PRINCIPAL
     * ========================================================
     */

    return (
      <View style={styles.container}>

        {/* ==================================================
            ALERTA VETERINÁRIO
            ================================================== */}

        {needsVet && (
          <View style={styles.alertCard}>

            <Text
              style={styles.alertTitle}
            >
              🚨 EMERGÊNCIA VETERINÁRIA
            </Text>

            <Text
              style={styles.alertText}
            >
              Seu pet precisa de ajuda!
            </Text>

          </View>
        )}

        {/* ==================================================
            EMPRÉSTIMO
            ================================================== */}

        {gameState.parentLoan.amount >
          0 && (
          <View
            style={styles.loanCard}
          >

            <Text
              style={styles.loanText}
            >
              💳 Empréstimo: R${" "}
              {
                gameState.parentLoan
                  .amount
              }
            </Text>

          </View>
        )}

        {/* ==================================================
            ABAS
            ================================================== */}

        <View style={styles.tabsContainer}>

          {tabs.map((tab) => {

            const isActive =
              activeTab === tab.id;

            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.8}
                onPress={() =>
                  setActiveTab(tab.id)
                }
                style={[
                  styles.tab,
                  isActive &&
                    styles.tabActive,
                ]}
              >

                <Text
                  style={[
                    styles.tabEmoji,
                    isActive &&
                      styles.tabEmojiActive,
                  ]}
                >
                  {tab.emoji}
                </Text>

                <Text
                  style={[
                    styles.tabName,
                    isActive &&
                      styles.tabNameActive,
                  ]}
                >
                  {tab.name}
                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* ==================================================
            GASTOS
            ================================================== */}

        {activeTab ===
          "expenses" &&
          !needsVet && (
            <View
              style={
                styles.contentWrapper
              }
            >
              <MonthlyExpenses
                currentMonth={
                  gameState.currentMonth
                }

                balance={
                  gameState.balance
                }

                petCost={petCost}

                onExpensesConfirm={
                  handleExpensesConfirm
                }

                extraEarnings={
                  extraEarnings
                }

                acceptedTemptation={
                  monthlyExpenses.temptation
                    ? {
                        cost:
                          monthlyExpenses
                            .temptation,
                      }
                    : null
                }

                acceptedSpecialAction={
                  monthlyExpenses
                    .specialAction
                    ? {
                        cost:
                          monthlyExpenses
                            .specialAction,
                      }
                    : null
                }
              />
            </View>
          )}

        {/* ==================================================
            PET
            ================================================== */}

        {activeTab === "pet" && (
          <View
            style={
              styles.contentWrapper
            }
          >
            <PetInteraction />
          </View>
        )}

        {/* ==================================================
            META
            ================================================== */}

        {activeTab === "goal" && (
          <View
            style={
              styles.contentWrapper
            }
          >
            <VisualPiggyBank />
          </View>
        )}

        {/* ==================================================
            SELOS
            ================================================== */}

        {activeTab ===
          "stickers" && (
          <View
            style={
              styles.contentWrapper
            }
          >
            <CollectibleStickers />
          </View>
        )}

      </View>
    );
  }

  /*
   * ============================================================
   * RENDER - INVESTIMENTO
   * ============================================================
   */

  if (currentStep === "investment") {

    const availableForInvestment =
      calculateRemainingAfterExpenses();

    /*
     * ========================================================
     * SALDO BAIXO
     * ========================================================
     */

    if (
      availableForInvestment < 10
    ) {
      return (
        <View
          style={
            styles.investmentCard
          }
        >

          <Text
            style={
              styles.investmentEmoji
            }
          >
            😅
          </Text>

          <Text
            style={
              styles.investmentTitle
            }
          >
            Saldo Baixo
          </Text>

          <Text
            style={
              styles.investmentDescription
            }
          >
            Sobrou apenas R${" "}
            {availableForInvestment.toFixed(
              0,
            )}
          </Text>

          <Text
            style={
              styles.investmentDescription
            }
          >
            É melhor guardar dinheiro no
            próximo mês.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              handleInvestmentConfirm
            }
            style={
              styles.nextMonthButton
            }
          >
            <Text
              style={
                styles.nextMonthButtonText
              }
            >
              PRÓXIMO MÊS
            </Text>
          </TouchableOpacity>

        </View>
      );
    }

    /*
     * ========================================================
     * OPÇÕES DE INVESTIMENTO
     * ========================================================
     */

    const investmentOptions = [
      {
        amount: 0,
        label: "Não Guardar",
        emoji: "🛍️",
      },

      {
        amount: Math.floor(
          availableForInvestment *
            0.3,
        ),
        label: "Pouco",
        emoji: "🌱",
      },

      {
        amount: Math.floor(
          availableForInvestment *
            0.5,
        ),
        label: "Médio",
        emoji: "🌿",
      },

      {
        amount: Math.floor(
          availableForInvestment *
            0.7,
        ),
        label: "Muito",
        emoji: "🌳",
      },
    ].filter(
      (option) =>
        option.amount <=
        availableForInvestment,
    );

    return (
      <View
        style={
          styles.investmentContainer
        }
      >

        {/* ==================================================
            CABEÇALHO
            ================================================== */}

        <View
          style={
            styles.investmentHeader
          }
        >

          <Text
            style={
              styles.investmentHeaderText
            }
          >
            🌱 Vamos Fazer o Dinheiro
            Crescer
          </Text>

        </View>

        <View
          style={
            styles.investmentBody
          }
        >

          {/* ==================================================
              COMO FUNCIONA
              ================================================== */}

          <View
            style={
              styles.howItWorksCard
            }
          >

            <Text
              style={
                styles.howItWorksTitle
              }
            >
              Como Funciona?
            </Text>

            <Text
              style={
                styles.howItWorksText
              }
            >
              É como plantar uma
              sementinha.
            </Text>

            <Text
              style={
                styles.howItWorksText
              }
            >
              Quanto mais tempo ela fica
              guardada,
            </Text>

            <Text
              style={
                styles.howItWorksText
              }
            >
              mais dinheiro ela produz.
            </Text>

          </View>

          {/* ==================================================
              DISPONÍVEL
              ================================================== */}

          <View
            style={
              styles.availableCard
            }
          >

            <Text
              style={
                styles.availableLabel
              }
            >
              Você Tem Disponível
            </Text>

            <Text
              style={
                styles.availableValue
              }
            >
              R${" "}
              {availableForInvestment.toFixed(
                0,
              )}
            </Text>

            {extraEarnings > 0 && (
              <Text
                style={
                  styles.extraText
                }
              >
                +R$ {extraEarnings} extras
              </Text>
            )}

          </View>

          {/* ==================================================
              QUANTO GUARDAR
              ================================================== */}

          <Text
            style={
              styles.questionTitle
            }
          >
            Quanto Quer Guardar?
          </Text>

          <View
            style={
              styles.investmentOptions
            }
          >

            {investmentOptions.map(
              (option) => {

                const selected =
                  investmentAmount ===
                  option.amount.toString();

                return (
                  <TouchableOpacity
                    key={
                      option.amount
                    }
                    activeOpacity={0.8}
                    onPress={() =>
                      setInvestmentAmount(
                        option.amount.toString(),
                      )
                    }
                    style={[
                      styles.investmentOption,
                      selected &&
                        styles.investmentOptionSelected,
                    ]}
                  >

                    <Text
                      style={
                        styles.optionEmoji
                      }
                    >
                      {option.emoji}
                    </Text>

                    <Text
                      style={
                        styles.optionLabel
                      }
                    >
                      {option.label}
                    </Text>

                    <Text
                      style={
                        styles.optionAmount
                      }
                    >
                      R$ {option.amount}
                    </Text>

                    <Text
                      style={
                        styles.optionDescription
                      }
                    >
                      {option.label ===
                      "Não Guardar"
                        ? "Deixar tudo na carteira"
                        : option.label ===
                            "Pouco"
                          ? "Guardar um pouquinho"
                          : option.label ===
                              "Médio"
                            ? "Guardar uma parte"
                            : "Guardar bastante"}
                    </Text>

                    <Text
                      style={
                        styles.optionFuture
                      }
                    >
                      Em 1 ano: R${" "}
                      {Math.floor(
                        option.amount *
                          1.15,
                      )}
                    </Text>

                    <View
                      style={[
                        styles.optionBar,
                        selected &&
                          styles.optionBarSelected,
                      ]}
                    />

                  </TouchableOpacity>
                );
              },
            )}

          </View>

          {/* ==================================================
              BOTÕES
              ================================================== */}

          <View
            style={
              styles.investmentButtons
            }
          >

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setCurrentStep(
                  "expenses",
                )
              }
              style={
                styles.backButton
              }
            >
              <Text
                style={
                  styles.backButtonText
                }
              >
                VOLTAR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                handleInvestmentConfirm
              }
              style={
                styles.confirmButton
              }
            >
              <Text
                style={
                  styles.confirmButtonText
                }
              >
                CONFIRMAR ESCOLHA
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    );
  }

  /*
   * ============================================================
   * RESULTADOS
   * ============================================================
   */

  if (currentStep === "results") {

    return (
      <View
        style={
          styles.resultsCard
        }
      >

        <Text
          style={
            styles.resultsTitle
          }
        >
          RESUMO DO CAPÍTULO{" "}
          {gameState.currentMonth - 1}
        </Text>

        <Text
          style={
            styles.resultsSubtitle
          }
        >
          O que aconteceu neste
          capítulo
        </Text>

        <View
          style={
            styles.resultsExpenses
          }
        >

          {Object.entries(
            monthlyExpenses,
          ).map(
            ([category, amount]) =>
              amount > 0 ? (
                <View
                  key={category}
                  style={
                    styles.resultRow
                  }
                >

                  <Text
                    style={
                      styles.resultCategory
                    }
                  >
                    {category}
                  </Text>

                  <Text
                    style={
                      styles.resultAmount
                    }
                  >
                    R${" "}
                    {amount.toFixed(
                      0,
                    )}
                  </Text>

                </View>
              ) : null,
          )}

        </View>

        {extraEarnings > 0 && (
          <View
            style={
              styles.extraResult
            }
          >

            <Text
              style={
                styles.extraResultText
              }
            >
              Ganhos Extras
            </Text>

            <Text
              style={
                styles.extraResultValue
              }
            >
              +R${" "}
              {extraEarnings.toFixed(
                0,
              )}
            </Text>

          </View>
        )}

        <View
          style={
            styles.finalBalanceCard
          }
        >

          <View
            style={
              styles.finalBalanceRow
            }
          >
            <Text
              style={
                styles.finalBalanceLabel
              }
            >
              Carteira
            </Text>

            <Text
              style={
                styles.finalBalanceValue
              }
            >
              R${" "}
              {gameState.balance.toFixed(
                0,
              )}
            </Text>
          </View>

          <View
            style={
              styles.finalBalanceRow
            }
          >
            <Text
              style={
                styles.finalBalanceLabel
              }
            >
              Investimentos
            </Text>

            <Text
              style={
                styles.finalBalanceValue
              }
            >
              R${" "}
              {gameState.investmentBalance.toFixed(
                0,
              )}
            </Text>
          </View>

          <View
            style={
              styles.totalRow
            }
          >

            <Text
              style={
                styles.totalLabel
              }
            >
              TOTAL
            </Text>

            <Text
              style={
                styles.totalValue
              }
            >
              R${" "}
              {(
                gameState.balance +
                gameState.investmentBalance
              ).toFixed(0)}
            </Text>

          </View>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            resetForNextMonth
          }
          style={
            styles.nextChapterButton
          }
        >

          <Text
            style={
              styles.nextChapterButtonText
            }
          >
            {gameState.currentMonth >
            12
              ? "FINALIZAR JORNADA"
              : "PRÓXIMO CAPÍTULO"}
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return null;
}

/*
 * ============================================================
 * ESTILOS
 * ============================================================
 */

const styles = StyleSheet.create({

  /*
   * ==========================================================
   * BASE
   * ==========================================================
   */

  container: {
    width: "100%",

    alignSelf: "stretch",

    gap: 12,
  },

  fullWidth: {
    width: "100%",

    alignSelf: "stretch",
  },

  contentWrapper: {
    width: "100%",

    alignSelf: "stretch",

    minWidth: 0,
  },

  /*
   * ==========================================================
   * ALERTAS
   * ==========================================================
   */

  alertCard: {
    width: "100%",

    backgroundColor: "#FFF0F0",

    borderWidth: 2,
    borderColor: COLORS.danger,

    borderRadius: 16,

    paddingVertical: 10,
    paddingHorizontal: 14,

    alignItems: "center",
  },

  alertTitle: {
    color: COLORS.danger,

    fontSize: 12,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  alertText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 2,

    includeFontPadding: false,
  },

  loanCard: {
    width: "100%",

    backgroundColor: "#FFF7D6",

    borderWidth: 2,
    borderColor: "#E9B949",

    borderRadius: 16,

    paddingVertical: 9,
    paddingHorizontal: 14,

    alignItems: "center",
  },

  loanText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * ABAS
   * ==========================================================
   */

  tabsContainer: {
    width: "100%",

    minHeight: 74,

    backgroundColor: COLORS.white,

    borderRadius: 20,

    borderWidth: 2,

    borderColor: "#D8D8D8",

    padding: 5,

    flexDirection: "row",

    alignItems: "stretch",

    overflow: "hidden",
  },

  tab: {
    flex: 1,

    minWidth: 0,

    minHeight: 62,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 2,
    paddingVertical: 5,

    backgroundColor: COLORS.lightGray,

    marginHorizontal: 1,
  },

  tabActive: {
    backgroundColor: "#3267E3",
  },

  tabEmoji: {
    fontSize: 19,

    lineHeight: 23,

    includeFontPadding: false,

    textAlign: "center",
  },

  tabEmojiActive: {
    color: COLORS.white,
  },

  tabName: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 14,

    fontWeight: "900",

    textAlign: "center",

    marginTop: 2,

    includeFontPadding: false,
  },

  tabNameActive: {
    color: COLORS.white,
  },

  /*
   * ==========================================================
   * INVESTIMENTO
   * ==========================================================
   */

  investmentContainer: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 20,

    borderWidth: 2,

    borderColor: "#BFD7FF",

    overflow: "hidden",
  },

  investmentHeader: {
    width: "100%",

    backgroundColor: "#DCE8F8",

    paddingVertical: 16,
    paddingHorizontal: 12,

    alignItems: "center",

    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  investmentHeaderText: {
    color: COLORS.navy,

    fontSize: 18,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  investmentBody: {
    width: "100%",

    padding: 14,
  },

  howItWorksCard: {
    width: "100%",

    backgroundColor: "#FFFBE8",

    borderWidth: 1,
    borderColor: "#F2C94C",

    borderRadius: 16,

    padding: 14,

    marginBottom: 12,

    alignItems: "center",
  },

  howItWorksTitle: {
    color: COLORS.navy,

    fontSize: 15,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 7,

    includeFontPadding: false,
  },

  howItWorksText: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 16,

    textAlign: "center",

    includeFontPadding: false,
  },

  availableCard: {
    width: "100%",

    backgroundColor: "#EAF8EF",

    borderWidth: 1,
    borderColor: "#69D17D",

    borderRadius: 16,

    padding: 15,

    alignItems: "center",

    marginBottom: 16,
  },

  availableLabel: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "700",

    includeFontPadding: false,
  },

  availableValue: {
    color: "#1EA84A",

    fontSize: 32,

    fontWeight: "900",

    marginTop: 3,

    includeFontPadding: false,
  },

  extraText: {
    color: "#1EA84A",

    fontSize: 11,

    fontWeight: "800",

    marginTop: 2,

    includeFontPadding: false,
  },

  questionTitle: {
    color: COLORS.navy,

    fontSize: 16,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 12,

    includeFontPadding: false,
  },

  investmentOptions: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  investmentOption: {
    width: "48%",

    backgroundColor: "#F8F8F8",

    borderWidth: 2,
    borderColor: "#DDDDDD",

    borderRadius: 16,

    padding: 10,

    marginBottom: 10,

    alignItems: "center",

    minHeight: 150,
  },

  investmentOptionSelected: {
    backgroundColor: "#DFF7E5",

    borderColor: "#1EA84A",
  },

  optionEmoji: {
    fontSize: 22,

    marginBottom: 3,
  },

  optionLabel: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  optionAmount: {
    color: "#1EA84A",

    fontSize: 18,

    fontWeight: "900",

    marginTop: 3,

    includeFontPadding: false,
  },

  optionDescription: {
    color: COLORS.darkGray,

    fontSize: 9,

    lineHeight: 12,

    textAlign: "center",

    marginTop: 4,

    includeFontPadding: false,
  },

  optionFuture: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 5,

    includeFontPadding: false,
  },

  optionBar: {
    width: "100%",

    height: 7,

    backgroundColor: "#19A84A",

    borderRadius: 4,

    marginTop: "auto",
  },

  optionBarSelected: {
    height: 9,
  },

  investmentButtons: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 6,
  },

  backButton: {
    width: "47.5%",

    minHeight: 44,

    backgroundColor: "#3267E3",

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,
  },

  backButtonText: {
    color: COLORS.white,

    fontSize: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  confirmButton: {
    width: "47.5%",

    minHeight: 44,

    backgroundColor: "#1EA84A",

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,
  },

  confirmButtonText: {
    color: COLORS.white,

    fontSize: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  investmentCard: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 20,

    borderWidth: 2,

    borderColor: "#FFD166",

    padding: 20,

    alignItems: "center",
  },

  investmentEmoji: {
    fontSize: 34,

    marginBottom: 6,
  },

  investmentTitle: {
    color: COLORS.navy,

    fontSize: 21,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 8,

    includeFontPadding: false,
  },

  investmentDescription: {
    color: COLORS.navy,

    fontSize: 12,

    lineHeight: 17,

    textAlign: "center",

    marginBottom: 5,

    includeFontPadding: false,
  },

  nextMonthButton: {
    width: "85%",

    minHeight: 44,

    backgroundColor: "#69D17D",

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 14,
  },

  nextMonthButtonText: {
    color: COLORS.white,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * RESULTADOS
   * ==========================================================
   */

  resultsCard: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 20,

    padding: 18,

    alignItems: "center",
  },

  resultsTitle: {
    color: COLORS.navy,

    fontSize: 19,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  resultsSubtitle: {
    color: COLORS.darkGray,

    fontSize: 12,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 5,
    marginBottom: 14,

    includeFontPadding: false,
  },

  resultsExpenses: {
    width: "100%",

    backgroundColor: "#F6F7F7",

    borderRadius: 15,

    padding: 10,

    marginBottom: 10,
  },

  resultRow: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 7,

    paddingHorizontal: 5,

    borderBottomWidth: 1,

    borderBottomColor: "#E3E6E6",
  },

  resultCategory: {
    flex: 1,

    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "700",

    includeFontPadding: false,
  },

  resultAmount: {
    color: COLORS.danger,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  extraResult: {
    width: "100%",

    backgroundColor: "#EAF8EF",

    borderRadius: 14,

    paddingVertical: 10,

    paddingHorizontal: 12,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 10,
  },

  extraResultText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "800",

    includeFontPadding: false,
  },

  extraResultValue: {
    color: "#1EA84A",

    fontSize: 14,

    fontWeight: "900",

    includeFontPadding: false,
  },

  finalBalanceCard: {
    width: "100%",

    backgroundColor: "#F1F8E6",

    borderRadius: 16,

    padding: 13,

    marginBottom: 12,
  },

  finalBalanceRow: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 5,
  },

  finalBalanceLabel: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "700",

    includeFontPadding: false,
  },

  finalBalanceValue: {
    color: COLORS.navy,

    fontSize: 13,

    fontWeight: "900",

    includeFontPadding: false,
  },

  totalRow: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 7,

    paddingTop: 9,

    borderTopWidth: 2,

    borderTopColor: "#D8E4D0",
  },

  totalLabel: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  totalValue: {
    color: "#1EA84A",

    fontSize: 18,

    fontWeight: "900",

    includeFontPadding: false,
  },

  nextChapterButton: {
    width: "88%",

    minHeight: 44,

    backgroundColor: COLORS.yellow,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",
  },

  nextChapterButtonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },
});