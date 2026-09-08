import { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

export default function PetInteraction() {
  const { gameState, updateGameState } = useGame();

  const [lastInteraction, setLastInteraction] = useState("");
  const [interactionMessage, setInteractionMessage] = useState("");

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

  const needsVet = gameState.petHealth <= 0;

  const interactions = [
    {
      id: "feed",
      name: "Alimentar",
      emoji: "🍖",
      cost: 3,
      healthBonus: 10,
      happinessBonus: 5,
      message: `${selectedPet?.name} adorou a comida! Está mais forte e feliz!`,
    },
    {
      id: "play",
      name: "Brincar",
      emoji: "🎾",
      cost: 2,
      healthBonus: 5,
      happinessBonus: 15,
      message: `Que divertido! ${selectedPet?.name} adora brincar com você!`,
    },
    {
      id: "groom",
      name: "Cuidar",
      emoji: "🧼",
      cost: 4,
      healthBonus: 15,
      happinessBonus: 8,
      message: `${selectedPet?.name} está limpinho e cheiroso!`,
    },
    {
      id: "train",
      name: "Treinar",
      emoji: "🎯",
      cost: 5,
      healthBonus: 8,
      happinessBonus: 12,
      levelBonus: 0.1,
      message: `${selectedPet?.name} aprendeu algo novo!`,
    },
    {
      id: "cuddle",
      name: "Carinho",
      emoji: "💝",
      cost: 0,
      healthBonus: 3,
      happinessBonus: 10,
      message: `${selectedPet?.name} se sente muito amado!`,
    },
  ];

  const vetAction = {
    id: "vet",
    name: "Veterinário",
    emoji: "🏥",
    cost: 40,
    healthBonus: 50,
    happinessBonus: 20,
  };

  const handleInteraction = (interaction: any) => {
    if (interaction.cost > gameState.balance) {
      return;
    }

    let newHealth = Math.min(
      100,
      gameState.petHealth + interaction.healthBonus,
    );

    let newHappiness = Math.min(
      100,
      gameState.petHappiness + interaction.happinessBonus,
    );

    const levelIncrease = interaction.levelBonus || 0;

    const newLevel =
      gameState.petLevel + levelIncrease;

    if (
      interaction.id === "vet" &&
      gameState.petHealth <= 0
    ) {
      newHealth = Math.max(50, newHealth);
    }

    const newAchievements = [
      ...gameState.achievements,
    ];

    if (
      newHealth === 100 &&
      gameState.currentMonth > 1 &&
      !newAchievements.includes("pet_master")
    ) {
      newAchievements.push("pet_master");
    }

    updateGameState({
      balance:
        gameState.balance - interaction.cost,

      petHealth: newHealth,

      petHappiness: newHappiness,

      petLevel: newLevel,

      achievements: newAchievements,

      currentMonthExtraExpenses: {
        ...gameState.currentMonthExtraExpenses,
        petCare:
          gameState.currentMonthExtraExpenses.petCare +
          interaction.cost,
      },
    });

    setLastInteraction(interaction.id);

    setInteractionMessage(
      interaction.message ||
        "Interação realizada!",
    );

    setTimeout(() => {
      setLastInteraction("");
      setInteractionMessage("");
    }, 3000);
  };

  const handleParentLoan = () => {
    updateGameState({
      balance: gameState.balance + 40,

      parentLoan: {
        amount: 40,
        reason: `Veterinário para ${selectedPet?.name}`,
      },
    });

    setInteractionMessage(
      "Seus pais emprestaram R$ 40 para ajudar!",
    );
  };

  const getPetMood = () => {
    const avg =
      (gameState.petHealth +
        gameState.petHappiness) /
      2;

    if (gameState.petHealth <= 0) {
      return {
        emoji: "🚨",
        mood: "Muito Doente",
      };
    }

    if (avg >= 80) {
      return {
        emoji: "😍",
        mood: "Muito Feliz",
      };
    }

    if (avg >= 60) {
      return {
        emoji: "😊",
        mood: "Feliz",
      };
    }

    if (avg >= 40) {
      return {
        emoji: "😐",
        mood: "Normal",
      };
    }

    if (avg >= 20) {
      return {
        emoji: "😟",
        mood: "Triste",
      };
    }

    return {
      emoji: "😢",
      mood: "Muito Triste",
    };
  };

  const petMood = getPetMood();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          needsVet && styles.emergencyCard,
        ]}
      >

        {/* ================================================== */}
        {/* CABEÇALHO */}
        {/* ================================================== */}

        <View
          style={[
            styles.header,
            needsVet && styles.emergencyHeader,
          ]}
        >
          <Text style={styles.headerSmall}>
            {needsVet
              ? "ATENÇÃO"
              : "MEU PET"}
          </Text>

          <Text style={styles.title}>
            {needsVet
              ? "Emergência Veterinária"
              : `Cuidar do ${selectedPet?.name}`}
          </Text>

          <Text style={styles.headerSubtitle}>
            {needsVet
              ? "Seu bichinho precisa de cuidados"
              : "Cuide, brinque e fortaleça sua amizade"}
          </Text>
        </View>

        {/* ================================================== */}
        {/* PET */}
        {/* ================================================== */}

        <View style={styles.petBox}>

          <View
            style={[
              styles.petAvatar,
              needsVet && styles.petAvatarEmergency,
            ]}
          >
            <Text style={styles.petEmoji}>
              {selectedPet?.emoji}
            </Text>
          </View>

          <Text style={styles.petName}>
            {selectedPet?.name}
          </Text>

          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>
              ⭐ Nível {Math.floor(gameState.petLevel)}
            </Text>
          </View>

          <View
            style={[
              styles.moodBox,
              needsVet && styles.moodBoxEmergency,
            ]}
          >
            <Text style={styles.moodText}>
              {petMood.emoji} {petMood.mood}
            </Text>
          </View>

        </View>

        {/* ================================================== */}
        {/* STATUS */}
        {/* ================================================== */}

        <View style={styles.statusContainer}>

          <View style={styles.statusCard}>

            <View style={styles.statusTop}>
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

            <View style={styles.statusBar}>
              <View
                style={[
                  styles.statusFillHealth,
                  {
                    width: `${Math.max(
                      0,
                      Math.min(
                        100,
                        gameState.petHealth,
                      ),
                    )}%`,
                  },
                ]}
              />
            </View>

          </View>

          <View style={styles.statusCard}>

            <View style={styles.statusTop}>
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

            <View style={styles.statusBar}>
              <View
                style={[
                  styles.statusFillHappiness,
                  {
                    width: `${Math.max(
                      0,
                      Math.min(
                        100,
                        gameState.petHappiness,
                      ),
                    )}%`,
                  },
                ]}
              />
            </View>

          </View>

        </View>

        {/* ================================================== */}
        {/* MENSAGEM */}
        {/* ================================================== */}

        {interactionMessage !== "" && (
          <View style={styles.messageBox}>

            <Text style={styles.messageIcon}>
              💬
            </Text>

            <Text style={styles.messageText}>
              {interactionMessage}
            </Text>

          </View>
        )}

        {/* ================================================== */}
        {/* EMERGÊNCIA */}
        {/* ================================================== */}

        {needsVet && (
          <View style={styles.emergencyBox}>

            <View style={styles.emergencyBadge}>
              <Text style={styles.emergencyBadgeText}>
                🚨 ATENÇÃO
              </Text>
            </View>

            <Text style={styles.emergencyTitle}>
              Seu pet precisa de veterinário
            </Text>

            <Text style={styles.emergencyText}>
              A saúde chegou a 0%. É importante
              agir agora para cuidar dele.
            </Text>

            <View style={styles.emergencyInfoRow}>

              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyInfoLabel}>
                  Custo
                </Text>

                <Text style={styles.emergencyInfoValue}>
                  R$ 40
                </Text>
              </View>

              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyInfoLabel}>
                  Seu saldo
                </Text>

                <Text style={styles.emergencyInfoValue}>
                  R$ {gameState.balance}
                </Text>
              </View>

            </View>

            {gameState.balance >= 40 ? (
              <TouchableOpacity
                style={styles.vetButton}
                onPress={() =>
                  handleInteraction(vetAction)
                }
                activeOpacity={0.85}
              >
                <Text style={styles.buttonEmoji}>
                  🏥
                </Text>

                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    Levar ao Veterinário
                  </Text>

                  <Text style={styles.buttonSubtext}>
                    Custa R$ 40
                  </Text>
                </View>

                <Text style={styles.buttonArrow}>
                  →
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.loanButton}
                onPress={handleParentLoan}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonEmoji}>
                  🆘
                </Text>

                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    Pedir ajuda aos pais
                  </Text>

                  <Text style={styles.buttonSubtext}>
                    Empréstimo de R$ 40
                  </Text>
                </View>

                <Text style={styles.buttonArrow}>
                  →
                </Text>
              </TouchableOpacity>
            )}

          </View>
        )}

        {/* ================================================== */}
        {/* INTERAÇÕES */}
        {/* ================================================== */}

        {!needsVet && (
          <>

            <View style={styles.actionsHeader}>

              <Text style={styles.sectionTitle}>
                Como cuidar do pet?
              </Text>

              <Text style={styles.sectionSubtitle}>
                Cada cuidado muda a saúde e a felicidade dele.
              </Text>

            </View>

            <View style={styles.actionsList}>

              {interactions.map((interaction) => {
                const canAfford =
                  interaction.cost <=
                  gameState.balance;

                return (
                  <TouchableOpacity
                    key={interaction.id}
                    disabled={!canAfford}
                    style={[
                      styles.actionButton,
                      !canAfford &&
                        styles.actionButtonDisabled,
                    ]}
                    onPress={() =>
                      handleInteraction(interaction)
                    }
                    activeOpacity={0.8}
                  >

                    <View style={styles.actionIconBox}>
                      <Text style={styles.actionEmoji}>
                        {interaction.emoji}
                      </Text>
                    </View>

                    <View style={styles.actionInfo}>

                      <Text style={styles.actionTitle}>
                        {interaction.name}
                      </Text>

                      <Text style={styles.actionDescription}>
                        {interaction.id === "feed" &&
                          "Recupere um pouco da saúde"}

                        {interaction.id === "play" &&
                          "Deixe seu pet mais feliz"}

                        {interaction.id === "groom" &&
                          "Cuide da higiene e da saúde"}

                        {interaction.id === "train" &&
                          "Treine e aumente o nível"}

                        {interaction.id === "cuddle" &&
                          "Demonstre carinho e afeto"}
                      </Text>

                    </View>

                    <View style={styles.actionCostBox}>

                      <Text
                        style={[
                          styles.actionCost,
                          interaction.cost === 0 &&
                            styles.freeCost,
                        ]}
                      >
                        {interaction.cost === 0
                          ? "GRÁTIS"
                          : `R$ ${interaction.cost}`}
                      </Text>

                      <Text style={styles.actionArrow}>
                        →
                      </Text>

                    </View>

                  </TouchableOpacity>
                );
              })}

            </View>

          </>
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
    marginTop: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#D8E2DE",
    padding: 16,
    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 7,
    elevation: 3,
  },

  emergencyCard: {
    borderColor: "#E07A61",
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    backgroundColor: "#D7E900",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#003F4A",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  emergencyHeader: {
    backgroundColor: "#FFE4DC",
    borderColor: "#D4553F",
  },

  headerSmall: {
    color: "#405C59",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 3,
  },

  title: {
    color: "#003F4A",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },

  headerSubtitle: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 3,
  },

  /*
   * ==========================================================
   * PET
   * ==========================================================
   */

  petBox: {
    alignItems: "center",
    marginBottom: 16,
  },

  petAvatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#E7F6F2",
    borderWidth: 3,
    borderColor: "#2FBFA0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  petAvatarEmergency: {
    backgroundColor: "#FFE4DC",
    borderColor: "#D4553F",
  },

  petEmoji: {
    fontSize: 65,
  },

  petName: {
    color: "#003F4A",
    fontSize: 22,
    fontWeight: "900",
  },

  levelBadge: {
    backgroundColor: "#F3F6F5",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#D8E2DE",
  },

  levelText: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "800",
  },

  moodBox: {
    backgroundColor: "#EAF7D7",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 7,
  },

  moodBoxEmergency: {
    backgroundColor: "#FFE4DC",
  },

  moodText: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * STATUS
   * ==========================================================
   */

  statusContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  statusCard: {
    flex: 1,
    backgroundColor: "#F5F8F6",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DCE5E1",
    padding: 11,
  },

  statusTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    fontSize: 17,
    marginRight: 5,
  },

  statusLabel: {
    color: "#405C59",
    fontSize: 11,
    fontWeight: "800",
  },

  statusValue: {
    color: "#003F4A",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 3,
  },

  statusBar: {
    height: 7,
    backgroundColor: "#DDE5E1",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 7,
  },

  statusFillHealth: {
    height: "100%",
    backgroundColor: "#E07A61",
    borderRadius: 999,
  },

  statusFillHappiness: {
    height: "100%",
    backgroundColor: "#2FBFA0",
    borderRadius: 999,
  },

  /*
   * ==========================================================
   * MENSAGEM
   * ==========================================================
   */

  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7D7",
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#7FC241",
    padding: 11,
    marginBottom: 14,
  },

  messageIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  messageText: {
    flex: 1,
    color: "#003F4A",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
  },

  /*
   * ==========================================================
   * EMERGÊNCIA
   * ==========================================================
   */

  emergencyBox: {
    backgroundColor: "#FFF5F1",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#E07A61",
    padding: 14,
    marginBottom: 4,
  },

  emergencyBadge: {
    alignSelf: "center",
    backgroundColor: "#D4553F",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 7,
  },

  emergencyBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  emergencyTitle: {
    color: "#9F3828",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },

  emergencyText: {
    color: "#6F514B",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 12,
  },

  emergencyInfoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 11,
  },

  emergencyInfo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E8C5BC",
    paddingVertical: 8,
    alignItems: "center",
  },

  emergencyInfoLabel: {
    color: "#876C66",
    fontSize: 9,
    fontWeight: "700",
  },

  emergencyInfoValue: {
    color: "#9F3828",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 2,
  },

  vetButton: {
    backgroundColor: "#D4553F",
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#8F3022",
    minHeight: 53,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  loanButton: {
    backgroundColor: "#EA8A38",
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#9C531D",
    minHeight: 53,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonEmoji: {
    fontSize: 25,
    marginRight: 9,
  },

  buttonContent: {
    flex: 1,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  buttonSubtext: {
    color: "#FFFFFF",
    opacity: 0.85,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2,
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * AÇÕES
   * ==========================================================
   */

  actionsHeader: {
    marginBottom: 11,
  },

  sectionTitle: {
    color: "#003F4A",
    fontSize: 18,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#68787B",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },

  actionsList: {
    gap: 8,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAF8",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#D6E1DC",
    padding: 10,
    minHeight: 65,
  },

  actionButtonDisabled: {
    opacity: 0.38,
  },

  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E7F6F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  actionEmoji: {
    fontSize: 25,
  },

  actionInfo: {
    flex: 1,
  },

  actionTitle: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
  },

  actionDescription: {
    color: "#68787B",
    fontSize: 9,
    lineHeight: 13,
    marginTop: 2,
  },

  actionCostBox: {
    alignItems: "flex-end",
    marginLeft: 7,
  },

  actionCost: {
    color: "#2FBFA0",
    fontSize: 13,
    fontWeight: "900",
  },

  freeCost: {
    color: "#3D9A35",
  },

  actionArrow: {
    color: "#91A09C",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 2,
  },
});