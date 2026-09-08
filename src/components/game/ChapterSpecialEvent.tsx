import { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EventOption {
  id: string;
  text: string;
  consequence: string;
  moneyChange: number;
  extraEarnings?: number;
  petHappinessChange?: number;
  lesson: string;
  achievement?: string;
}

interface ChapterEvent {
  id: string;
  type: "help" | "temptation" | "responsibility" | "opportunity";
  title: string;
  description: string;
  emoji: string;
  options: EventOption[];
}

interface ChapterSpecialEventProps {
  currentMonth: number;
  balance: number;
  petCost: number;
  onEventComplete: (result: any) => void;
}

export default function ChapterSpecialEvent({
  currentMonth,
  onEventComplete,
}: ChapterSpecialEventProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const [showResult, setShowResult] = useState(false);

  /*
   * ============================================================
   * EVENTOS
   * ============================================================
   */

  const chapterEvents: Record<number, ChapterEvent> = {
    1: {
      id: "first_help",
      type: "help",

      title: "Primeira Oportunidade de Ajuda!",

      description:
        "Dona Rosa precisa de ajuda para carregar as compras.",

      emoji: "👵",

      options: [
        {
          id: "help_enthusiastic",

          text: "Ajudar com muito prazer!",

          consequence:
            "Dona Rosa ficou emocionada e te deu R$15.",

          moneyChange: 0,

          extraEarnings: 15,

          petHappinessChange: 15,

          lesson:
            "Ajudar os outros sempre traz recompensas.",

          achievement: "helper",
        },

        {
          id: "help_hesitant",

          text: "Ajudar, mas com pressa",

          consequence:
            "Você ajudou rapidamente e ganhou R$8.",

          moneyChange: 0,

          extraEarnings: 8,

          petHappinessChange: 5,

          lesson:
            "Ajudar sempre vale a pena.",
        },

        {
          id: "dont_help",

          text: "Dizer que está ocupado",

          consequence:
            "Você se sentiu mal por não ajudar.",

          moneyChange: 0,

          petHappinessChange: -10,

          lesson:
            "Perdemos oportunidades quando não ajudamos.",
        },
      ],
    },

    2: {
      id: "first_temptation",
      type: "temptation",

      title: "Primeira Grande Tentação!",

      description:
        "Seu doce favorito está em promoção.",

      emoji: "🍭",

      options: [
        {
          id: "buy_all",

          text: "Comprar tudo (R$18)",

          consequence:
            "Você gastou bastante.",

          moneyChange: -18,

          petHappinessChange: 10,

          lesson:
            "Promoções podem enganar.",
        },

        {
          id: "buy_little",

          text: "Comprar só um pouco (R$8)",

          consequence:
            "Você se controlou.",

          moneyChange: -8,

          petHappinessChange: 5,

          lesson:
            "Moderação é importante.",

          achievement: "smart_spender",
        },

        {
          id: "resist",

          text: "Resistir",

          consequence:
            "Você venceu a tentação.",

          moneyChange: 0,

          petHappinessChange: 20,

          lesson:
            "Força de vontade é valiosa.",

          achievement: "resist_temptation",
        },
      ],
    },

    4: {
      id: "talent_opportunity",
      type: "opportunity",

      title: "Descobrindo Seus Talentos!",

      description:
        "A escola está organizando uma feira de talentos.",

      emoji: "🎨",

      options: [
        {
          id: "participate_art",

          text: "Vender desenhos (R$5)",

          consequence:
            "Você ganhou R$25 com seus desenhos.",

          moneyChange: -5,

          extraEarnings: 25,

          petHappinessChange: 20,

          lesson:
            "Investir nos seus talentos vale a pena.",

          achievement: "helper",
        },

        {
          id: "participate_music",

          text: "Tocar música",

          consequence:
            "Você ganhou R$12 de gorjetas.",

          moneyChange: 0,

          extraEarnings: 12,

          petHappinessChange: 15,

          lesson:
            "Talentos podem gerar renda.",
        },

        {
          id: "not_participate",

          text: "Não participar",

          consequence:
            "Você perdeu uma oportunidade.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson:
            "A timidez pode nos impedir de crescer.",
        },
      ],
    },

    5: {
      id: "sweet_temptation",
      type: "temptation",

      title: "Festival de Doces!",

      description:
        "A cidade inteira está participando.",

      emoji: "🍬",

      options: [
        {
          id: "go_crazy",

          text: "Comer tudo (R$30)",

          consequence:
            "Você exagerou nos doces.",

          moneyChange: -30,

          petHappinessChange: 5,

          lesson:
            "Exageros têm consequências.",
        },

        {
          id: "enjoy_moderately",

          text: "Comer com moderação (R$12)",

          consequence:
            "Você se divertiu sem exagerar.",

          moneyChange: -12,

          petHappinessChange: 15,

          lesson:
            "Moderação é sabedoria.",

          achievement: "smart_spender",
        },

        {
          id: "resist_festival",

          text: "Resistir",

          consequence:
            "Você mostrou força de vontade.",

          moneyChange: 0,

          petHappinessChange: 25,

          lesson:
            "Disciplina gera crescimento.",

          achievement: "resist_temptation",
        },
      ],
    },

    6: {
      id: "school_uniform",
      type: "responsibility",

      title: "Uniforme Escolar!",

      description:
        "A escola exige um uniforme novo.",

      emoji: "👔",

      options: [
        {
          id: "buy_new",

          text: "Comprar novo (R$45)",

          consequence:
            "Você comprou o uniforme oficial.",

          moneyChange: -45,

          petHappinessChange: 5,

          lesson:
            "Alguns gastos são obrigatórios.",

          achievement: "emergency_prepared",
        },

        {
          id: "ask_help",

          text: "Pedir ajuda aos pais",

          consequence:
            "Seus pais ajudaram você.",

          moneyChange: 0,

          extraEarnings: 45,

          lesson:
            "Pedir ajuda é normal.",
        },

        {
          id: "try_used",

          text: "Comprar usado (R$25)",

          consequence:
            "Você economizou bastante.",

          moneyChange: -25,

          petHappinessChange: 10,

          lesson:
            "Pesquisar antes economiza dinheiro.",

          achievement: "smart_spender",
        },
      ],
    },

    7: {
      id: "pet_emergency",
      type: "responsibility",

      title: "Emergência do Pet!",

      description:
        "Seu bichinho ficou doente e precisa de cuidados.",

      emoji: "🏥",

      options: [
        {
          id: "vet_now",

          text: "Levar ao veterinário (R$35)",

          consequence:
            "Seu pet se recuperou rapidamente.",

          moneyChange: -35,

          petHappinessChange: 30,

          lesson:
            "Precisamos estar preparados para emergências.",

          achievement: "pet_lover",
        },

        {
          id: "basic_care",

          text: "Cuidar em casa (R$10)",

          consequence:
            "Seu pet melhorou devagar.",

          moneyChange: -10,

          petHappinessChange: 10,

          lesson:
            "Nem sempre a solução mais barata é a melhor.",
        },

        {
          id: "ignore",

          text: "Esperar passar",

          consequence:
            "Seu pet ficou triste e piorou.",

          moneyChange: 0,

          petHappinessChange: -25,

          lesson:
            "Responsabilidade exige ação.",
        },
      ],
    },

    8: {
      id: "community_event",
      type: "help",

      title: "Mutirão da Comunidade!",

      description:
        "O bairro está organizando uma ação voluntária.",

      emoji: "🤝",

      options: [
        {
          id: "help_all_day",

          text: "Participar o dia inteiro",

          consequence:
            "Você recebeu reconhecimento da comunidade.",

          moneyChange: 0,

          extraEarnings: 20,

          petHappinessChange: 20,

          lesson:
            "Ajudar gera valor para todos.",

          achievement: "generous_heart",
        },

        {
          id: "help_some_hours",

          text: "Participar algumas horas",

          consequence:
            "Você colaborou e aprendeu bastante.",

          moneyChange: 0,

          extraEarnings: 10,

          petHappinessChange: 10,

          lesson:
            "Toda ajuda faz diferença.",
        },

        {
          id: "stay_home",

          text: "Ficar em casa",

          consequence:
            "Você perdeu uma experiência importante.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson:
            "Participar da comunidade é valioso.",
        },
      ],
    },

    9: {
      id: "investment_opportunity",
      type: "opportunity",

      title: "Oportunidade de Crescimento!",

      description:
        "Você encontrou uma forma de fazer seu dinheiro render.",

      emoji: "📈",

      options: [
        {
          id: "invest_big",

          text: "Investir bastante (R$30)",

          consequence:
            "Seu dinheiro começou a crescer.",

          moneyChange: -30,

          extraEarnings: 45,

          petHappinessChange: 10,

          lesson:
            "Investimentos podem gerar retorno.",

          achievement: "growth_expert",
        },

        {
          id: "invest_little",

          text: "Investir pouco (R$10)",

          consequence:
            "Você teve um retorno moderado.",

          moneyChange: -10,

          extraEarnings: 15,

          petHappinessChange: 5,

          lesson:
            "Começar pequeno também funciona.",
        },

        {
          id: "dont_invest",

          text: "Não investir",

          consequence:
            "Você perdeu a oportunidade.",

          moneyChange: 0,

          lesson:
            "Oportunidades precisam ser aproveitadas.",
        },
      ],
    },

    10: {
      id: "friend_needs_help",
      type: "help",

      title: "Um Amigo Precisa de Você",

      description:
        "Seu amigo está arrecadando dinheiro para uma causa importante.",

      emoji: "❤️",

      options: [
        {
          id: "donate_generously",

          text: "Doar R$20",

          consequence:
            "Seu amigo ficou muito feliz.",

          moneyChange: -20,

          petHappinessChange: 15,

          lesson:
            "Generosidade transforma vidas.",

          achievement: "generous_heart",
        },

        {
          id: "donate_little",

          text: "Doar R$10",

          consequence:
            "Você ajudou dentro das suas possibilidades.",

          moneyChange: -10,

          petHappinessChange: 10,

          lesson:
            "Toda ajuda importa.",
        },

        {
          id: "dont_donate",

          text: "Não ajudar",

          consequence:
            "Você guardou seu dinheiro.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson:
            "Às vezes precisamos pensar nos outros também.",
        },
      ],
    },

    11: {
      id: "holiday_shopping",
      type: "temptation",

      title: "Promoção Imperdível!",

      description:
        "Uma grande loja lançou descontos incríveis.",

      emoji: "🛍️",

      options: [
        {
          id: "buy_everything",

          text: "Comprar muitas coisas (R$40)",

          consequence:
            "Você gastou bastante dinheiro.",

          moneyChange: -40,

          petHappinessChange: 5,

          lesson:
            "Nem toda promoção vale a pena.",
        },

        {
          id: "buy_needed",

          text: "Comprar apenas o necessário (R$15)",

          consequence:
            "Você fez compras conscientes.",

          moneyChange: -15,

          petHappinessChange: 10,

          lesson:
            "Planejamento evita desperdícios.",

          achievement: "smart_spender",
        },

        {
          id: "skip_sale",

          text: "Não comprar",

          consequence:
            "Você economizou dinheiro.",

          moneyChange: 0,

          petHappinessChange: 15,

          lesson:
            "Resistir também é uma escolha inteligente.",

          achievement: "resist_temptation",
        },
      ],
    },

    12: {
      id: "final_challenge",
      type: "opportunity",

      title: "Grande Desafio Final!",

      description:
        "Chegou a última oportunidade da sua jornada.",

      emoji: "🏆",

      options: [
        {
          id: "take_risk",

          text: "Aceitar o desafio",

          consequence:
            "Você mostrou coragem e ganhou uma recompensa.",

          moneyChange: 0,

          extraEarnings: 50,

          petHappinessChange: 20,

          lesson:
            "Grandes conquistas exigem coragem.",

          achievement: "future_planner",
        },

        {
          id: "play_safe",

          text: "Seguir com segurança",

          consequence:
            "Você manteve estabilidade financeira.",

          moneyChange: 0,

          extraEarnings: 20,

          petHappinessChange: 10,

          lesson:
            "Segurança também é importante.",
        },

        {
          id: "do_nothing",

          text: "Não participar",

          consequence:
            "Você encerrou o ano sem mudanças.",

          moneyChange: 0,

          lesson:
            "Oportunidades não voltam para sempre.",
        },
      ],
    },
  };

  const currentEvent = chapterEvents[currentMonth];

  if (!currentEvent) {
    return null;
  }

  const selectedEventOption = currentEvent.options.find(
    (option) => option.id === selectedOption,
  );

  /*
   * ============================================================
   * ESCOLHA
   * ============================================================
   */

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowResult(true);
  };

  /*
   * ============================================================
   * CONTINUAR
   * ============================================================
   */

  const handleContinue = () => {
    if (!selectedEventOption) {
      return;
    }

    onEventComplete({
      moneyChange: selectedEventOption.moneyChange,

      extraEarnings:
        selectedEventOption.extraEarnings || 0,

      petHappinessChange:
        selectedEventOption.petHappinessChange || 0,

      achievement:
        selectedEventOption.achievement,

      lesson:
        selectedEventOption.lesson,
    });
  };

  /*
   * ============================================================
   * EVENTO
   * ============================================================
   */

  if (!showResult) {
    return (
      <View style={styles.container}>

        <View style={styles.eventCard}>

          {/* ÍCONE */}

          <View style={styles.emojiCircle}>
            <Text style={styles.emoji}>
              {currentEvent.emoji}
            </Text>
          </View>

          {/* TIPO */}

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              DECISÃO DO CAPÍTULO
            </Text>
          </View>

          {/* TÍTULO */}

          <Text style={styles.title}>
            {currentEvent.title}
          </Text>

          {/* DESCRIÇÃO */}

          <Text style={styles.description}>
            {currentEvent.description}
          </Text>

        </View>

        {/* OPÇÕES */}

        <View style={styles.optionsCard}>

          <Text style={styles.chooseTitle}>
            🤔 O que você vai fazer?
          </Text>

          <Text style={styles.chooseSubtitle}>
            Sua escolha terá consequências.
          </Text>

          <View style={styles.optionsContainer}>

            {currentEvent.options.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => handleSelectOption(option.id)}
                activeOpacity={0.8}
              >

                <View style={styles.optionNumber}>
                  <Text style={styles.optionNumberText}>
                    {index + 1}
                  </Text>
                </View>

                <Text style={styles.optionText}>
                  {option.text}
                </Text>

                <Text style={styles.optionArrow}>
                  →
                </Text>

              </TouchableOpacity>
            ))}

          </View>

        </View>

      </View>
    );
  }

  /*
   * ============================================================
   * RESULTADO
   * ============================================================
   */

  return (
    <View style={styles.container}>

      <View style={styles.resultCard}>

        {/* ÍCONE */}

        <View style={styles.resultEmojiCircle}>
          <Text style={styles.resultEmoji}>
            {currentEvent.emoji}
          </Text>
        </View>

        <View style={styles.resultBadge}>
          <Text style={styles.resultBadgeText}>
            ESCOLHA REALIZADA
          </Text>
        </View>

        {/* TÍTULO */}

        <Text style={styles.resultTitle}>
          Resultado da Sua Escolha
        </Text>

        {/* ESCOLHA */}

        <View style={styles.choiceBox}>

          <Text style={styles.choiceLabel}>
            VOCÊ ESCOLHEU
          </Text>

          <Text style={styles.choiceText}>
            {selectedEventOption?.text}
          </Text>

        </View>

        {/* CONSEQUÊNCIA */}

        <Text style={styles.resultDescription}>
          {selectedEventOption?.consequence}
        </Text>

        {/* DINHEIRO */}

        {selectedEventOption?.moneyChange !== 0 && (
          <View
            style={[
              styles.infoBox,
              selectedEventOption?.moneyChange > 0
                ? styles.positiveBox
                : styles.negativeBox,
            ]}
          >
            <Text style={styles.infoEmoji}>
              {selectedEventOption?.moneyChange > 0
                ? "💰"
                : "💸"}
            </Text>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                DINHEIRO
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  selectedEventOption?.moneyChange > 0
                    ? styles.positiveText
                    : styles.negativeText,
                ]}
              >
                {selectedEventOption?.moneyChange > 0
                  ? "+"
                  : ""}
                R$ {Math.abs(selectedEventOption?.moneyChange)}
              </Text>
            </View>
          </View>
        )}

        {/* GANHOS EXTRAS */}

        {!!selectedEventOption?.extraEarnings && (
          <View style={[styles.infoBox, styles.positiveBox]}>

            <Text style={styles.infoEmoji}>
              ✨
            </Text>

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                GANHO EXTRA
              </Text>

              <Text style={[styles.infoValue, styles.positiveText]}>
                + R$ {selectedEventOption.extraEarnings}
              </Text>

            </View>

          </View>
        )}

        {/* LIÇÃO */}

        <View style={styles.lessonBox}>

          <View style={styles.lessonHeader}>

            <Text style={styles.lessonEmoji}>
              📚
            </Text>

            <Text style={styles.lessonTitle}>
              LIÇÃO APRENDIDA
            </Text>

          </View>

          <Text style={styles.lessonText}>
            {selectedEventOption?.lesson}
          </Text>

        </View>

        {/* CONQUISTA */}

        {selectedEventOption?.achievement && (
          <View style={styles.achievementBox}>

            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>
                🏅
              </Text>
            </View>

            <View style={styles.achievementContent}>

              <Text style={styles.achievementTitle}>
                NOVA CONQUISTA!
              </Text>

              <Text style={styles.achievementText}>
                Você desbloqueou um novo selo.
              </Text>

            </View>

          </View>
        )}

        {/* CONTINUAR */}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>
            Continuar
          </Text>

          <Text style={styles.continueArrow}>
            →
          </Text>
        </TouchableOpacity>

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
   * CONTAINER
   */

  container: {
    width: "100%",
  },

  /*
   * EVENTO
   */

  eventCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    borderWidth: 3,

    borderColor: "#003F4A",

    padding: 18,

    alignItems: "center",

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.14,

    shadowRadius: 7,

    elevation: 4,
  },

  emojiCircle: {
    width: 82,

    height: 82,

    borderRadius: 41,

    backgroundColor: "#D7E900",

    borderWidth: 3,

    borderColor: "#7FC241",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 10,
  },

  emoji: {
    fontSize: 48,
  },

  typeBadge: {
    backgroundColor: "#003F4A",

    paddingHorizontal: 12,

    paddingVertical: 5,

    borderRadius: 999,

    marginBottom: 10,
  },

  typeText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.7,
  },

  title: {
    color: "#003F4A",

    fontSize: 23,

    lineHeight: 28,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 8,
  },

  description: {
    color: "#405C59",

    fontSize: 14,

    lineHeight: 21,

    textAlign: "center",

    maxWidth: 320,
  },

  /*
   * OPÇÕES
   */

  optionsCard: {
    backgroundColor: "#F5F8F6",

    borderRadius: 20,

    borderWidth: 2,

    borderColor: "#D8E2DE",

    padding: 16,

    marginTop: 12,
  },

  chooseTitle: {
    color: "#003F4A",

    fontSize: 18,

    fontWeight: "900",

    textAlign: "center",
  },

  chooseSubtitle: {
    color: "#68787B",

    fontSize: 12,

    fontWeight: "600",

    textAlign: "center",

    marginTop: 3,

    marginBottom: 14,
  },

  optionsContainer: {
    gap: 10,
  },

  optionButton: {
    minHeight: 62,

    backgroundColor: "#7FC241",

    borderRadius: 15,

    borderWidth: 2,

    borderColor: "#003F4A",

    paddingHorizontal: 12,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,

      height: 2,
    },

    shadowOpacity: 0.12,

    shadowRadius: 3,

    elevation: 2,
  },

  optionNumber: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: "#D7E900",

    borderWidth: 2,

    borderColor: "#003F4A",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 10,
  },

  optionNumberText: {
    color: "#003F4A",

    fontSize: 15,

    fontWeight: "900",
  },

  optionText: {
    flex: 1,

    color: "#FFFFFF",

    fontSize: 14,

    lineHeight: 19,

    fontWeight: "800",
  },

  optionArrow: {
    color: "#FFFFFF",

    fontSize: 23,

    fontWeight: "900",

    marginLeft: 8,
  },

  /*
   * RESULTADO
   */

  resultCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    borderWidth: 3,

    borderColor: "#003F4A",

    padding: 18,

    alignItems: "center",

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,

      height: 4,
    },

    shadowOpacity: 0.14,

    shadowRadius: 7,

    elevation: 4,
  },

  resultEmojiCircle: {
    width: 76,

    height: 76,

    borderRadius: 38,

    backgroundColor: "#D7E900",

    borderWidth: 3,

    borderColor: "#7FC241",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 9,
  },

  resultEmoji: {
    fontSize: 43,
  },

  resultBadge: {
    backgroundColor: "#2FBFA0",

    paddingHorizontal: 12,

    paddingVertical: 5,

    borderRadius: 999,

    marginBottom: 9,
  },

  resultBadgeText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.6,
  },

  resultTitle: {
    color: "#003F4A",

    fontSize: 22,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 12,
  },

  choiceBox: {
    width: "100%",

    backgroundColor: "#F3F7F5",

    borderRadius: 13,

    borderWidth: 1.5,

    borderColor: "#D6E0DC",

    paddingVertical: 10,

    paddingHorizontal: 13,

    alignItems: "center",

    marginBottom: 12,
  },

  choiceLabel: {
    color: "#7A8988",

    fontSize: 9,

    fontWeight: "900",

    letterSpacing: 0.6,

    marginBottom: 3,
  },

  choiceText: {
    color: "#003F4A",

    fontSize: 14,

    fontWeight: "800",

    textAlign: "center",
  },

  resultDescription: {
    color: "#405C59",

    fontSize: 14,

    lineHeight: 21,

    textAlign: "center",

    marginBottom: 12,
  },

  /*
   * INFORMAÇÕES FINANCEIRAS
   */

  infoBox: {
    width: "100%",

    borderRadius: 13,

    borderWidth: 1.5,

    paddingVertical: 10,

    paddingHorizontal: 13,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  positiveBox: {
    backgroundColor: "#EAF7D7",

    borderColor: "#7FC241",
  },

  negativeBox: {
    backgroundColor: "#FFF1ED",

    borderColor: "#F2B8A7",
  },

  infoEmoji: {
    fontSize: 24,

    marginRight: 10,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#68787B",

    fontSize: 8,

    fontWeight: "900",

    letterSpacing: 0.6,

    marginBottom: 1,
  },

  infoValue: {
    fontSize: 17,

    fontWeight: "900",
  },

  positiveText: {
    color: "#3D9A35",
  },

  negativeText: {
    color: "#D4553F",
  },

  /*
   * LIÇÃO
   */

  lessonBox: {
    width: "100%",

    backgroundColor: "#FFF9D8",

    borderRadius: 14,

    borderWidth: 2,

    borderColor: "#D7E900",

    padding: 13,

    marginTop: 4,

    marginBottom: 9,
  },

  lessonHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 5,
  },

  lessonEmoji: {
    fontSize: 18,

    marginRight: 6,
  },

  lessonTitle: {
    color: "#003F4A",

    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 0.5,
  },

  lessonText: {
    color: "#405C59",

    fontSize: 12,

    lineHeight: 18,

    fontWeight: "600",
  },

  /*
   * CONQUISTA
   */

  achievementBox: {
    width: "100%",

    backgroundColor: "#E7F6F2",

    borderRadius: 14,

    borderWidth: 2,

    borderColor: "#2FBFA0",

    padding: 11,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 10,
  },

  achievementIcon: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#D7E900",

    borderWidth: 2,

    borderColor: "#003F4A",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 9,
  },

  achievementEmoji: {
    fontSize: 23,
  },

  achievementContent: {
    flex: 1,
  },

  achievementTitle: {
    color: "#003F4A",

    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 0.4,

    marginBottom: 2,
  },

  achievementText: {
    color: "#405C59",

    fontSize: 11,

    fontWeight: "600",
  },

  /*
   * BOTÃO
   */

  continueButton: {
    width: "100%",

    minHeight: 52,

    backgroundColor: "#2FBFA0",

    borderRadius: 14,

    borderWidth: 2,

    borderColor: "#003F4A",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 5,

    shadowColor: "#003F4A",

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.16,

    shadowRadius: 4,

    elevation: 3,
  },

  continueButtonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "900",

    marginRight: 8,
  },

  continueArrow: {
    color: "#FFFFFF",

    fontSize: 21,

    fontWeight: "900",
  },
});