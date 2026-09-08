import { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface SurpriseEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;

  options: {
    id: string;
    text: string;
    consequence: string;
    moneyChange: number;
    petHealthChange?: number;
    petHappinessChange?: number;
    lesson: string;
  }[];
}

interface SurpriseCardEventProps {
  onEventComplete: (result: any) => void;
}

export default function SurpriseCardEvent({
  onEventComplete,
}: SurpriseCardEventProps) {
  const { gameState } = useGame();

  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  const monthlyEvents: SurpriseEvent[] = [
    {
      id: "friend_help",

      title: "Amigo Precisa de Ajuda!",

      description:
        "Seu melhor amigo esqueceu o dinheiro do lanche em casa e está com muita fome.",

      emoji: "😢",

      options: [
        {
          id: "share_money",

          text: "Emprestar R$ 5 para ele",

          consequence:
            "Seu amigo ficou muito grato e prometeu devolver!",

          moneyChange: -5,

          petHappinessChange: 10,

          lesson:
            "Ajudar amigos fortalece as amizades!",
        },

        {
          id: "share_snack",

          text: "Dividir seu lanche com ele",

          consequence:
            "Vocês dividiram e foi muito divertido comer juntos!",

          moneyChange: 0,

          petHappinessChange: 5,

          lesson:
            "Dividir pode ser mais valioso que emprestar dinheiro!",
        },

        {
          id: "say_no",

          text: "Dizer que não pode ajudar",

          consequence:
            "Seu amigo ficou triste, mas entendeu sua situação.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson:
            "Às vezes precisamos dizer não, mas podemos ser gentis.",
        },
      ],
    },

    {
      id: "broken_toy",

      title: "Brinquedo Quebrou!",

      description:
        "Seu brinquedo favorito quebrou bem na hora que você mais queria brincar!",

      emoji: "😭",

      options: [
        {
          id: "buy_new",

          text: "Comprar um novo (R$ 25)",

          consequence:
            "Você tem um brinquedo novinho, mas gastou bastante!",

          moneyChange: -25,

          petHappinessChange: 5,

          lesson:
            "Nem sempre precisamos substituir algo imediatamente.",
        },

        {
          id: "try_fix",

          text: "Tentar consertar com ajuda",

          consequence:
            "Com criatividade, você conseguiu consertar! Que legal!",

          moneyChange: -2,

          petHappinessChange: 15,

          lesson:
            "Criatividade pode economizar muito dinheiro!",
        },

        {
          id: "wait_save",

          text: "Esperar e economizar para um melhor",

          consequence:
            "Foi difícil esperar, mas você está juntando para algo especial!",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson:
            "Esperar por algo melhor às vezes vale mais a pena!",
        },
      ],
    },

    {
      id: "find_money",

      title: "Dinheiro Encontrado!",

      description:
        "Você encontrou R$ 10 no chão! Mas tem uma pessoa procurando algo por perto...",

      emoji: "💰",

      options: [
        {
          id: "return_money",

          text: "Devolver para a pessoa",

          consequence:
            "A pessoa ficou muito grata e te deu R$ 15 de recompensa!",

          moneyChange: 15,

          petHappinessChange: 20,

          lesson:
            "Honestidade sempre é recompensada!",
        },

        {
          id: "keep_money",

          text: "Ficar com o dinheiro",

          consequence:
            "Você ficou com R$ 10, mas se sentiu mal por isso...",

          moneyChange: 10,

          petHappinessChange: -10,

          lesson:
            "Dinheiro ganho de forma errada não traz felicidade real.",
        },

        {
          id: "give_charity",

          text: "Doar para caridade",

          consequence:
            "Você doou o dinheiro e se sentiu incrível!",

          moneyChange: 0,

          petHappinessChange: 25,

          lesson:
            "Generosidade nos faz mais felizes que guardar dinheiro!",
        },
      ],
    },
  ];

  const currentEvent =
    monthlyEvents[gameState.currentMonth % monthlyEvents.length];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    const option = currentEvent.options.find(
      (opt) => opt.id === selectedOption,
    );

    if (!option) {
      return;
    }

    setShowResult(true);

    setTimeout(() => {
      onEventComplete({
        option,

        moneyChange: option.moneyChange,

        petHealthChange:
          option.petHealthChange || 0,

        petHappinessChange:
          option.petHappinessChange || 0,
      });
    }, 2000);
  };

  const selectedOptionData =
    currentEvent.options.find(
      (opt) => opt.id === selectedOption,
    );

  /*
   * ==========================================================
   * RESULTADO
   * ==========================================================
   */

  if (showResult && selectedOptionData) {
    return (
      <View style={styles.card}>

        <View style={styles.resultHeader}>

          <View style={styles.resultIcon}>
            <Text style={styles.resultEmoji}>
              ✨
            </Text>
          </View>

          <Text style={styles.resultLabel}>
            CARTA CONCLUÍDA
          </Text>

          <Text style={styles.resultTitle}>
            Resultado da Sua Escolha
          </Text>

        </View>

        <View style={styles.resultMessage}>
          <Text style={styles.resultMessageEmoji}>
            {currentEvent.emoji}
          </Text>

          <Text style={styles.resultText}>
            {selectedOptionData.consequence}
          </Text>
        </View>

        {/* LIÇÃO */}

        <View style={styles.lessonBox}>

          <View style={styles.lessonHeader}>
            <Text style={styles.lessonIcon}>
              📚
            </Text>

            <Text style={styles.lessonTitle}>
              O QUE VOCÊ APRENDEU?
            </Text>
          </View>

          <Text style={styles.lessonText}>
            {selectedOptionData.lesson}
          </Text>

        </View>

        {/* DINHEIRO */}

        {selectedOptionData.moneyChange !== 0 && (
          <View
            style={[
              styles.changeBox,
              selectedOptionData.moneyChange > 0
                ? styles.positiveBox
                : styles.negativeBox,
            ]}
          >
            <Text style={styles.changeEmoji}>
              {selectedOptionData.moneyChange > 0
                ? "💰"
                : "💸"}
            </Text>

            <View style={styles.changeContent}>
              <Text style={styles.changeLabel}>
                DINHEIRO
              </Text>

              <Text style={styles.changeText}>
                {selectedOptionData.moneyChange > 0
                  ? "+"
                  : ""}
                R${" "}
                {Math.abs(
                  selectedOptionData.moneyChange,
                )}
              </Text>
            </View>

          </View>
        )}

        {/* FELICIDADE */}

        {selectedOptionData.petHappinessChange !== 0 &&
          selectedOptionData.petHappinessChange !==
            undefined && (
            <View
              style={[
                styles.changeBox,
                selectedOptionData
                  .petHappinessChange > 0
                  ? styles.happyBox
                  : styles.sadBox,
              ]}
            >
              <Text style={styles.changeEmoji}>
                {selectedOptionData
                  .petHappinessChange > 0
                  ? "😊"
                  : "😢"}
              </Text>

              <View style={styles.changeContent}>
                <Text style={styles.changeLabel}>
                  FELICIDADE DO PET
                </Text>

                <Text style={styles.changeText}>
                  {selectedOptionData
                    .petHappinessChange > 0
                    ? "+"
                    : ""}
                  {
                    selectedOptionData
                      .petHappinessChange
                  }
                  %
                </Text>
              </View>

            </View>
          )}

        <View style={styles.continueBox}>
          <Text style={styles.continueEmoji}>
            🎉
          </Text>

          <Text style={styles.continueText}>
            Continuando para o restante do mês...
          </Text>
        </View>

      </View>
    );
  }

  /*
   * ==========================================================
   * CARTA
   * ==========================================================
   */

  return (
    <View style={styles.card}>

      {/* CABEÇALHO */}

      <View style={styles.mainHeader}>

        <View style={styles.cardSymbol}>
          <Text style={styles.cardSymbolText}>
            🎴
          </Text>
        </View>

        <Text style={styles.mainLabel}>
          EVENTO ALEATÓRIO
        </Text>

        <Text style={styles.mainTitle}>
          CARTA SURPRESA!
        </Text>

        <Text style={styles.mainSubtitle}>
          Uma nova situação apareceu...
        </Text>

      </View>

      {/* EVENTO */}

      <View style={styles.eventBox}>

        <View style={styles.eventEmojiCircle}>
          <Text style={styles.eventEmoji}>
            {currentEvent.emoji}
          </Text>
        </View>

        <Text style={styles.eventTitle}>
          {currentEvent.title}
        </Text>

        <Text style={styles.eventDescription}>
          {currentEvent.description}
        </Text>

      </View>

      {/* PERGUNTA */}

      <View style={styles.questionBox}>
        <Text style={styles.questionEmoji}>
          🤔
        </Text>

        <Text style={styles.question}>
          O que você faria?
        </Text>
      </View>

      {/* OPÇÕES */}

      <View style={styles.optionsContainer}>

        {currentEvent.options.map(
          (option, index) => {

            const isSelected =
              selectedOption === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  isSelected &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                  handleOptionSelect(option.id)
                }
              >

                <View
                  style={[
                    styles.optionNumber,
                    isSelected &&
                      styles.selectedOptionNumber,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionNumberText,
                      isSelected &&
                        styles.selectedOptionNumberText,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>

                <View style={styles.optionContent}>

                  <Text
                    style={[
                      styles.optionTitle,
                      isSelected &&
                        styles.selectedOptionTitle,
                    ]}
                  >
                    {option.text}
                  </Text>

                  {option.moneyChange !== 0 && (
                    <Text
                      style={[
                        styles.optionSub,
                        option.moneyChange > 0
                          ? styles.optionPositive
                          : styles.optionNegative,
                      ]}
                    >
                      💰{" "}
                      {option.moneyChange > 0
                        ? "+"
                        : ""}
                      R${" "}
                      {Math.abs(
                        option.moneyChange,
                      )}
                    </Text>
                  )}

                </View>

                {isSelected && (
                  <View style={styles.selectedCheck}>
                    <Text style={styles.checkText}>
                      ✓
                    </Text>
                  </View>
                )}

              </TouchableOpacity>
            );
          },
        )}

      </View>

      {/* BOTÃO */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.confirmButton,
          !selectedOption &&
            styles.disabledButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedOption}
      >
        <Text style={styles.confirmText}>
          {selectedOption
            ? "CONFIRMAR ESCOLHA! ✨"
            : "ESCOLHA UMA OPÇÃO"}
        </Text>
      </TouchableOpacity>

      {/* DICA */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Pense bem antes de decidir.
          Cada escolha faz parte da sua jornada!
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 3,
    borderColor: "#003F4A",

    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
  },

  /*
   * ==========================================================
   * HEADER
   * ==========================================================
   */

  mainHeader: {
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#7C3AED",
    paddingVertical: 17,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  cardSymbol: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  cardSymbolText: {
    fontSize: 36,
  },

  mainLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: "#7951A8",
  },

  mainTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#4C1D95",
    marginTop: 2,
  },

  mainSubtitle: {
    fontSize: 11,
    color: "#705D84",
    fontWeight: "600",
    marginTop: 3,
  },

  /*
   * ==========================================================
   * EVENTO
   * ==========================================================
   */

  eventBox: {
    alignItems: "center",
    backgroundColor: "#F8FAF9",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#DCE5E1",
    padding: 17,
    marginBottom: 14,
  },

  eventEmojiCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#FFF4C7",
    borderWidth: 3,
    borderColor: "#E6C83D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  eventEmoji: {
    fontSize: 45,
  },

  eventTitle: {
    color: "#003F4A",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 26,
  },

  eventDescription: {
    color: "#667672",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 7,
  },

  /*
   * ==========================================================
   * PERGUNTA
   * ==========================================================
   */

  questionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F6F2",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 11,
  },

  questionEmoji: {
    fontSize: 20,
    marginRight: 7,
  },

  question: {
    color: "#003F4A",
    fontSize: 15,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * OPÇÕES
   * ==========================================================
   */

  optionsContainer: {
    gap: 9,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D7E0DD",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 11,
    minHeight: 62,
  },

  selectedOption: {
    backgroundColor: "#E8F8F3",
    borderColor: "#2FBFA0",
    borderWidth: 3,
  },

  optionNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF2F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  selectedOptionNumber: {
    backgroundColor: "#2FBFA0",
  },

  optionNumberText: {
    color: "#667672",
    fontSize: 14,
    fontWeight: "900",
  },

  selectedOptionNumberText: {
    color: "#FFFFFF",
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    color: "#263D39",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },

  selectedOptionTitle: {
    color: "#003F4A",
    fontWeight: "900",
  },

  optionSub: {
    fontSize: 11,
    fontWeight: "800",
    marginTop: 3,
  },

  optionPositive: {
    color: "#159570",
  },

  optionNegative: {
    color: "#D14336",
  },

  selectedCheck: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2FBFA0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * BOTÃO
   * ==========================================================
   */

  confirmButton: {
    backgroundColor: "#7C3AED",
    borderWidth: 2,
    borderColor: "#4C1D95",
    borderRadius: 14,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,

    shadowColor: "#4C1D95",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },

  disabledButton: {
    backgroundColor: "#AFA9B9",
    borderColor: "#88818F",
    opacity: 0.7,
    shadowOpacity: 0,
    elevation: 0,
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  /*
   * ==========================================================
   * FOOTER
   * ==========================================================
   */

  footer: {
    backgroundColor: "#F5F7F6",
    borderRadius: 11,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 10,
  },

  footerText: {
    color: "#687772",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "center",
  },

  /*
   * ==========================================================
   * RESULTADO
   * ==========================================================
   */

  resultHeader: {
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#7C3AED",
    paddingVertical: 17,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  resultIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  resultEmoji: {
    fontSize: 34,
  },

  resultLabel: {
    color: "#7951A8",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  resultTitle: {
    color: "#4C1D95",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * MENSAGEM DO RESULTADO
   * ==========================================================
   */

  resultMessage: {
    alignItems: "center",
    backgroundColor: "#F8FAF9",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#DCE5E1",
    padding: 15,
    marginBottom: 11,
  },

  resultMessageEmoji: {
    fontSize: 42,
    marginBottom: 7,
  },

  resultText: {
    color: "#263D39",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
    textAlign: "center",
  },

  /*
   * ==========================================================
   * LIÇÃO
   * ==========================================================
   */

  lessonBox: {
    backgroundColor: "#FFF7D6",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#E5C84B",
    padding: 14,
    marginBottom: 10,
  },

  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  lessonIcon: {
    fontSize: 20,
    marginRight: 7,
  },

  lessonTitle: {
    flex: 1,
    color: "#655A22",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  lessonText: {
    color: "#514F3A",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19,
  },

  /*
   * ==========================================================
   * ALTERAÇÕES
   * ==========================================================
   */

  changeBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    padding: 11,
    marginBottom: 8,
    borderWidth: 2,
  },

  positiveBox: {
    backgroundColor: "#E4F8EC",
    borderColor: "#8DD3A8",
  },

  negativeBox: {
    backgroundColor: "#FFE9E7",
    borderColor: "#E6A19A",
  },

  happyBox: {
    backgroundColor: "#FFF4CE",
    borderColor: "#E4C85C",
  },

  sadBox: {
    backgroundColor: "#FFECE0",
    borderColor: "#E7B28D",
  },

  changeEmoji: {
    fontSize: 25,
    marginRight: 10,
  },

  changeContent: {
    flex: 1,
  },

  changeLabel: {
    color: "#687772",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  changeText: {
    color: "#003F4A",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 1,
  },

  /*
   * ==========================================================
   * CONTINUAÇÃO
   * ==========================================================
   */

  continueBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F6F2",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 6,
  },

  continueEmoji: {
    fontSize: 18,
    marginRight: 6,
  },

  continueText: {
    color: "#247B68",
    fontSize: 11,
    fontWeight: "800",
  },
});