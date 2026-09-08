import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EarningOpportunity {
  id: string;
  title: string;
  description: string;
  earning: number;
  emoji: string;
  effort: string;
  lesson: string;
}

interface EarningOpportunitiesProps {
  currentMonth: number;

  onEarningAccept: (
    opportunity: EarningOpportunity,
  ) => void;

  onEarningReject: () => void;
}

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  lightGreen: "#EAF7D7",
  lightBlue: "#E9F7F5",
  lightYellow: "#FFF8D6",
  lightGray: "#F4F7F7",

  gray: "#68787B",
  border: "#DCE6E5",
};

export default function EarningOpportunities({
  currentMonth,
  onEarningAccept,
  onEarningReject,
}: EarningOpportunitiesProps) {
  /*
   * ============================================================
   * OPORTUNIDADES ESPECIAIS
   * ============================================================
   */

  const opportunitiesByMonth: Record<
    number,
    EarningOpportunity
  > = {
    1: {
      id: "help_neighbor",

      title: "Ajudar Dona Maria",

      description:
        "Dona Maria precisa de ajuda para carregar as compras até em casa!",

      earning: 10,

      emoji: "👵",

      effort:
        "Vai ser um pouco cansativo, mas ela ficará muito feliz!",

      lesson:
        "Ajudar os outros sempre traz boas recompensas!",
    },

    4: {
      id: "clean_yard",

      title: "Limpar o Quintal",

      description:
        "Seus pais ofereceram dinheiro para você ajudar a limpar o quintal!",

      earning: 15,

      emoji: "🧹",

      effort:
        "Vai sujar as mãos, mas é um trabalho honesto!",

      lesson:
        "Trabalhar em casa ajuda toda a família!",
    },

    7: {
      id: "sell_drawings",

      title: "Vender Seus Desenhos",

      description:
        "Você pode vender seus desenhos incríveis para os amigos!",

      earning: 12,

      emoji: "🎨",

      effort:
        "Precisa caprichar bem nos desenhos!",

      lesson:
        "Usar seus talentos pode gerar dinheiro!",
    },

    10: {
      id: "return_wallet",

      title: "Devolver Carteira Perdida",

      description:
        "Você achou uma carteira na rua! O dono quer te dar uma recompensa!",

      earning: 20,

      emoji: "💳",

      effort:
        "Fazer a coisa certa às vezes demora, mas vale a pena!",

      lesson:
        "Honestidade sempre é recompensada!",
    },
  };

  /*
   * ============================================================
   * OPORTUNIDADES GENÉRICAS
   * ============================================================
   */

  let currentOpportunity =
    opportunitiesByMonth[currentMonth];

  if (!currentOpportunity) {
    const genericOpportunities: EarningOpportunity[] = [
      {
        id: "walk_dogs",

        title: "Passear com Cachorros",

        description:
          "Dona Rosa precisa de alguém para passear com seus cachorrinhos!",

        earning: 8,

        emoji: "🐕",

        effort:
          "Os cachorros são fofos e obedientes!",

        lesson:
          "Cuidar de animais é uma responsabilidade!",
      },

      {
        id: "help_library",

        title: "Organizar Biblioteca",

        description:
          "A biblioteca da escola precisa de ajuda para organizar os livros!",

        earning: 12,

        emoji: "📚",

        effort:
          "É um trabalho calmo e você aprende coisas novas!",

        lesson:
          "Ajudar a comunidade sempre vale a pena!",
      },

      {
        id: "wash_car",

        title: "Lavar Carros",

        description:
          "Seus vizinhos querem lavar os carros e podem te pagar!",

        earning: 18,

        emoji: "🚗",

        effort:
          "Vai molhar um pouco, mas é divertido!",

        lesson:
          "Trabalho duro sempre é recompensado!",
      },
    ];

    const opportunityIndex =
      currentMonth % genericOpportunities.length;

    currentOpportunity =
      genericOpportunities[opportunityIndex];
  }

  /*
   * ============================================================
   * AÇÕES
   * ============================================================
   */

  const handleAccept = () => {
    onEarningAccept(currentOpportunity);
  };

  const handleReject = () => {
    onEarningReject();
  };

  /*
   * ============================================================
   * TELA
   * ============================================================
   */

  return (
    <View style={styles.card}>

      {/* ======================================================
          CABEÇALHO
          ====================================================== */}

      <View style={styles.header}>

        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>
            {currentOpportunity.emoji}
          </Text>
        </View>

        <View style={styles.headerTextArea}>

          <Text style={styles.headerTitle}>
            OPORTUNIDADE ESPECIAL
          </Text>

          <Text style={styles.headerSubtitle}>
            Você pode ganhar dinheiro extra!
          </Text>

        </View>

      </View>

      {/* ======================================================
          TÍTULO
          ====================================================== */}

      <Text style={styles.title}>
        {currentOpportunity.title}
      </Text>

      {/* ======================================================
          DESCRIÇÃO
          ====================================================== */}

      <Text style={styles.description}>
        {currentOpportunity.description}
      </Text>

      {/* ======================================================
          RECOMPENSA
          ====================================================== */}

      <View style={styles.rewardBox}>

        <Text style={styles.rewardLabel}>
          VOCÊ VAI GANHAR
        </Text>

        <Text style={styles.rewardValue}>
          + R$ {currentOpportunity.earning}
        </Text>

        <Text style={styles.rewardSubtext}>
          💰 Dinheiro extra para sua aventura
        </Text>

      </View>

      {/* ======================================================
          ESFORÇO
          ====================================================== */}

      <View style={styles.infoBox}>

        <View style={styles.infoIcon}>
          <Text style={styles.infoEmoji}>
            💪
          </Text>
        </View>

        <View style={styles.infoContent}>

          <Text style={styles.infoLabel}>
            COMO VAI SER?
          </Text>

          <Text style={styles.infoText}>
            {currentOpportunity.effort}
          </Text>

        </View>

      </View>

      {/* ======================================================
          LIÇÃO
          ====================================================== */}

      <View style={styles.lessonBox}>

        <View style={styles.lessonIcon}>
          <Text style={styles.lessonEmoji}>
            💡
          </Text>
        </View>

        <View style={styles.lessonContent}>

          <Text style={styles.lessonLabel}>
            O QUE VOCÊ APRENDE?
          </Text>

          <Text style={styles.lessonText}>
            {currentOpportunity.lesson}
          </Text>

        </View>

      </View>

      {/* ======================================================
          BOTÕES
          ====================================================== */}

      <View style={styles.buttons}>

        <TouchableOpacity
          style={styles.rejectButton}
          onPress={handleReject}
          activeOpacity={0.8}
        >
          <Text style={styles.rejectText}>
            AGORA NÃO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAccept}
          activeOpacity={0.8}
        >
          <Text style={styles.acceptText}>
            ACEITAR!
          </Text>

          <Text style={styles.acceptEmoji}>
            💪
          </Text>
        </TouchableOpacity>

      </View>

      {/* ======================================================
          RODAPÉ
          ====================================================== */}

      <View style={styles.footerBox}>

        <Text style={styles.footerText}>
          ✨ Boas escolhas trazem boas recompensas! ✨
        </Text>

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
   * CARD PRINCIPAL
   * ==========================================================
   */

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 22,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    padding: 10,

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    width: "100%",

    backgroundColor: COLORS.navy,

    borderRadius: 16,

    paddingVertical: 10,

    paddingHorizontal: 10,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12,
  },

  headerIcon: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 9,
  },

  headerEmoji: {
    fontSize: 24,
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    color: COLORS.yellow,

    fontSize: 13,

    fontWeight: "900",

    includeFontPadding: false,
  },

  headerSubtitle: {
    color: COLORS.white,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 3,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * TÍTULO
   * ==========================================================
   */

  title: {
    color: COLORS.navy,

    fontSize: 20,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 6,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DESCRIÇÃO
   * ==========================================================
   */

  description: {
    color: COLORS.gray,

    fontSize: 11,

    fontWeight: "600",

    lineHeight: 16,

    textAlign: "center",

    paddingHorizontal: 8,

    marginBottom: 10,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * RECOMPENSA
   * ==========================================================
   */

  rewardBox: {
    backgroundColor: COLORS.green,

    borderRadius: 16,

    borderWidth: 2,

    borderColor: COLORS.navy,

    paddingVertical: 10,

    alignItems: "center",

    marginBottom: 8,
  },

  rewardLabel: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  rewardValue: {
    color: COLORS.white,

    fontSize: 27,

    fontWeight: "900",

    marginTop: 2,

    includeFontPadding: false,
  },

  rewardSubtext: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "700",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * INFORMAÇÃO
   * ==========================================================
   */

  infoBox: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.lightBlue,

    borderRadius: 14,

    borderWidth: 2,

    borderColor: COLORS.turquoise,

    padding: 9,

    marginBottom: 7,
  },

  infoIcon: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.turquoise,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 8,
  },

  infoEmoji: {
    fontSize: 17,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: COLORS.navy,

    fontSize: 7,

    fontWeight: "900",

    marginBottom: 2,

    includeFontPadding: false,
  },

  infoText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "600",

    lineHeight: 13,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * LIÇÃO
   * ==========================================================
   */

  lessonBox: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.lightYellow,

    borderRadius: 14,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    padding: 9,

    marginBottom: 9,
  },

  lessonIcon: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.yellow,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 8,
  },

  lessonEmoji: {
    fontSize: 17,
  },

  lessonContent: {
    flex: 1,
  },

  lessonLabel: {
    color: COLORS.navy,

    fontSize: 7,

    fontWeight: "900",

    marginBottom: 2,

    includeFontPadding: false,
  },

  lessonText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "600",

    lineHeight: 13,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÕES
   * ==========================================================
   */

  buttons: {
    flexDirection: "row",

    gap: 7,

    marginBottom: 8,
  },

  rejectButton: {
    flex: 1,

    minHeight: 39,

    backgroundColor: COLORS.lightGray,

    borderRadius: 11,

    borderWidth: 2,

    borderColor: "#B9C6C5",

    alignItems: "center",

    justifyContent: "center",
  },

  rejectText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  acceptButton: {
    flex: 1,

    minHeight: 39,

    backgroundColor: COLORS.yellow,

    borderRadius: 11,

    borderWidth: 2,

    borderColor: COLORS.navy,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 4,
  },

  acceptText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  acceptEmoji: {
    fontSize: 12,
  },

  /*
   * ==========================================================
   * RODAPÉ
   * ==========================================================
   */

  footerBox: {
    backgroundColor: COLORS.lightGreen,

    borderRadius: 11,

    borderWidth: 1,

    borderColor: COLORS.green,

    paddingVertical: 7,

    paddingHorizontal: 8,
  },

  footerText: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "700",

    textAlign: "center",

    includeFontPadding: false,
  },

});