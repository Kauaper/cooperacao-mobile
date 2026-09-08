import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

interface SpecialAction {
  id: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  consequence: string;
  isRequired?: boolean;
  deadline?: string;
}

interface SpecialActionsProps {
  balance: number;
  currentMonth: number;

  onActionAccept: (action: SpecialAction) => void;

  onActionReject: () => void;
}

export default function SpecialActions({
  balance,
  currentMonth,
  onActionAccept,
  onActionReject,
}: SpecialActionsProps) {
  const actionsByMonth: Record<number, SpecialAction> = {
    3: {
      id: "friend_birthday",
      title: "Aniversário do Melhor Amigo",
      description:
        "É aniversário do seu melhor amigo e você quer dar um presente especial!",
      cost: 25,
      emoji: "🎁",
      consequence:
        "Se não der presente, seu amigo pode ficar chateado...",
      deadline: "Só hoje",
    },

    6: {
      id: "school_uniform",
      title: "Uniforme Escolar Obrigatório",
      description:
        "A escola exige um novo uniforme e você PRECISA comprar!",
      cost: 40,
      emoji: "👔",
      consequence:
        "Se não comprar, você não pode ir à escola!",
      isRequired: true,
      deadline: "URGENTE",
    },

    9: {
      id: "school_trip",
      title: "Excursão da Escola",
      description:
        "A escola organizou uma viagem incrível e todos os seus amigos vão!",
      cost: 35,
      emoji: "🚌",
      consequence:
        "Se não for, vai ficar sozinho na escola...",
      deadline: "Próxima semana",
    },

    12: {
      id: "charity_donation",
      title: "Doação para Caridade",
      description:
        "A escola está arrecadando dinheiro para famílias necessitadas!",
      cost: 15,
      emoji: "❤️",
      consequence:
        "Você pode ajudar muitas pessoas com sua doação!",
      deadline: "Esta semana",
    },
  };

  let currentAction = actionsByMonth[currentMonth];

  if (!currentAction) {
    const genericActions: SpecialAction[] = [
      {
        id: "help_elderly",
        title: "Ajudar Pessoa Idosa",
        description:
          "Uma pessoa idosa precisa de ajuda para fazer compras!",
        cost: 0,
        emoji: "👵",
        consequence:
          "Fazer uma boa ação sempre traz alegria!",
        deadline: "Agora",
      },

      {
        id: "buy_medicine",
        title: "Remédio para Familiar",
        description:
          "Um familiar precisa de um remédio e você pode ajudar!",
        cost: 20,
        emoji: "💊",
        consequence:
          "Ajudar a família é sempre importante!",
        deadline: "Hoje",
      },

      {
        id: "environmental_action",
        title: "Ação Ambiental",
        description:
          "Há uma campanha de limpeza no bairro e você pode participar!",
        cost: 5,
        emoji: "🌱",
        consequence:
          "Cuidar do planeta é responsabilidade de todos!",
        deadline: "Este fim de semana",
      },
    ];

    const actionIndex = currentMonth % genericActions.length;

    currentAction = genericActions[actionIndex];
  }

  const canAfford = balance >= currentAction.cost;

  const handleAccept = () => {
    onActionAccept(currentAction);
  };

  const handleReject = () => {
    onActionReject();
  };

  return (
    <View style={styles.container}>

      {/* CARD PRINCIPAL */}

      <View
        style={[
          styles.card,
          currentAction.isRequired &&
            styles.requiredCard,
        ]}
      >

        {/* CABEÇALHO */}

        <View
          style={[
            styles.header,
            currentAction.isRequired
              ? styles.headerRequired
              : styles.headerNormal,
          ]}
        >
          <View
            style={[
              styles.headerIcon,
              currentAction.isRequired
                ? styles.headerIconRequired
                : styles.headerIconNormal,
            ]}
          >
            <Text style={styles.headerEmoji}>
              {currentAction.emoji}
            </Text>
          </View>

          <Text style={styles.headerLabel}>
            {currentAction.isRequired
              ? "ATENÇÃO"
              : "EVENTO ESPECIAL"}
          </Text>

          <Text style={styles.headerTitle}>
            {currentAction.isRequired
              ? "SITUAÇÃO URGENTE"
              : "AÇÃO ESPECIAL"}
          </Text>
        </View>

        {/* TÍTULO */}

        <Text style={styles.title}>
          {currentAction.title}
        </Text>

        <Text style={styles.description}>
          {currentAction.description}
        </Text>

        {/* PRAZO */}

        <View
          style={[
            styles.deadlineBox,
            currentAction.isRequired
              ? styles.deadlineRequired
              : styles.deadlineNormal,
          ]}
        >
          <Text style={styles.deadlineEmoji}>
            ⏰
          </Text>

          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineLabel}>
              PRAZO
            </Text>

            <Text
              style={[
                styles.deadlineText,
                currentAction.isRequired &&
                  styles.deadlineTextRequired,
              ]}
            >
              {currentAction.deadline}
            </Text>
          </View>
        </View>

        {/* CUSTO */}

        <View style={styles.financialBox}>

          <View style={styles.financialItem}>
            <Text style={styles.financialLabel}>
              CUSTO
            </Text>

            <Text
              style={[
                styles.costText,
                currentAction.cost === 0 &&
                  styles.freeCostText,
              ]}
            >
              {currentAction.cost === 0
                ? "GRÁTIS"
                : `R$ ${currentAction.cost}`}
            </Text>
          </View>

          <View style={styles.financialDivider} />

          <View style={styles.financialItem}>
            <Text style={styles.financialLabel}>
              SEU SALDO
            </Text>

            <Text style={styles.balanceText}>
              R$ {balance.toFixed(0)}
            </Text>
          </View>

        </View>

        {/* CONSEQUÊNCIA */}

        <View
          style={[
            styles.consequenceBox,
            currentAction.isRequired
              ? styles.consequenceRequired
              : styles.consequenceNormal,
          ]}
        >
          <Text style={styles.consequenceIcon}>
            {currentAction.isRequired
              ? "⚠️"
              : "💭"}
          </Text>

          <View style={styles.consequenceContent}>
            <Text style={styles.consequenceLabel}>
              O QUE PODE ACONTECER?
            </Text>

            <Text style={styles.consequenceText}>
              {currentAction.consequence}
            </Text>
          </View>
        </View>

        {/* SEM DINHEIRO */}

        {!canAfford && currentAction.cost > 0 && (
          <View style={styles.errorBox}>
            <View style={styles.errorIcon}>
              <Text>😰</Text>
            </View>

            <View style={styles.errorContent}>
              <Text style={styles.errorTitle}>
                Dinheiro insuficiente
              </Text>

              <Text style={styles.errorText}>
                Você precisa de mais R${" "}
                {(currentAction.cost - balance).toFixed(0)}
              </Text>
            </View>
          </View>
        )}

        {/* AÇÕES */}

        <View style={styles.buttons}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.rejectButton,
              currentAction.isRequired &&
                currentAction.cost > 0 &&
                styles.disabledButton,
            ]}
            onPress={handleReject}
            disabled={
              currentAction.isRequired &&
              currentAction.cost > 0
            }
          >
            <Text style={styles.rejectEmoji}>
              {currentAction.isRequired
                ? "😔"
                : "🤔"}
            </Text>

            <Text style={styles.rejectText}>
              {currentAction.isRequired
                ? "Não Posso"
                : "Não Agora"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.acceptButton,
              !canAfford &&
                currentAction.cost > 0 &&
                styles.disabledAcceptButton,
            ]}
            onPress={handleAccept}
            disabled={
              !canAfford &&
              currentAction.cost > 0
            }
          >
            <Text style={styles.acceptText}>
              {!canAfford &&
              currentAction.cost > 0
                ? "Sem Dinheiro 😅"
                : "FAZER! ✨"}
            </Text>
          </TouchableOpacity>

        </View>

        {/* RODAPÉ */}

        <View
          style={[
            styles.footer,
            currentAction.isRequired
              ? styles.footerRequired
              : styles.footerNormal,
          ]}
        >
          <Text style={styles.footerText}>
            {currentAction.isRequired
              ? "⚠️ Esta situação é obrigatória e pode afetar sua jornada."
              : "💫 Suas escolhas podem afetar sua jornada, amizades e felicidade."}
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /*
   * ==========================================================
   * CONTAINER
   * ==========================================================
   */

  container: {
    marginTop: 4,
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#003F4A",
    padding: 16,

    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
  },

  requiredCard: {
    borderColor: "#C2413B",
  },

  /*
   * ==========================================================
   * HEADER
   * ==========================================================
   */

  header: {
    borderRadius: 17,
    paddingVertical: 17,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 2,
    marginBottom: 17,
  },

  headerNormal: {
    backgroundColor: "#D5E72C",
    borderColor: "#003F4A",
  },

  headerRequired: {
    backgroundColor: "#FFE4E1",
    borderColor: "#C2413B",
  },

  headerIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
  },

  headerIconNormal: {
    backgroundColor: "#FFFFFF",
    borderColor: "#003F4A",
  },

  headerIconRequired: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C2413B",
  },

  headerEmoji: {
    fontSize: 36,
  },

  headerLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: "#50645F",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#003F4A",
    textAlign: "center",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * TÍTULO
   * ==========================================================
   */

  title: {
    color: "#003F4A",
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 7,
  },

  description: {
    color: "#637571",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 6,
    marginBottom: 15,
  },

  /*
   * ==========================================================
   * PRAZO
   * ==========================================================
   */

  deadlineBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    padding: 11,
    marginBottom: 10,
    borderWidth: 2,
  },

  deadlineNormal: {
    backgroundColor: "#F5F8F6",
    borderColor: "#D8E2DE",
  },

  deadlineRequired: {
    backgroundColor: "#FFF0EE",
    borderColor: "#E59A93",
  },

  deadlineEmoji: {
    fontSize: 24,
    marginRight: 10,
  },

  deadlineContent: {
    flex: 1,
  },

  deadlineLabel: {
    color: "#7B8985",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  deadlineText: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
  },

  deadlineTextRequired: {
    color: "#B42318",
  },

  /*
   * ==========================================================
   * FINANCEIRO
   * ==========================================================
   */

  financialBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F6F2",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#2FBFA0",
    paddingVertical: 13,
    marginBottom: 10,
  },

  financialItem: {
    flex: 1,
    alignItems: "center",
  },

  financialDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#A9CEC5",
  },

  financialLabel: {
    color: "#65817A",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  costText: {
    color: "#D14336",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },

  freeCostText: {
    color: "#2B9D87",
  },

  balanceText: {
    color: "#003F4A",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * CONSEQUÊNCIA
   * ==========================================================
   */

  consequenceBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    borderWidth: 2,
  },

  consequenceNormal: {
    backgroundColor: "#FFF8D6",
    borderColor: "#E5C84B",
  },

  consequenceRequired: {
    backgroundColor: "#FFE8E5",
    borderColor: "#E59A93",
  },

  consequenceIcon: {
    fontSize: 25,
    marginRight: 10,
  },

  consequenceContent: {
    flex: 1,
  },

  consequenceLabel: {
    color: "#746B2D",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  consequenceText: {
    color: "#4E554F",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  /*
   * ==========================================================
   * ERRO
   * ==========================================================
   */

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE8E8",
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#E58A8A",
    padding: 11,
    marginBottom: 12,
  },

  errorIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  errorContent: {
    flex: 1,
  },

  errorTitle: {
    color: "#B42318",
    fontSize: 12,
    fontWeight: "900",
  },

  errorText: {
    color: "#C2413B",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * BOTÕES
   * ==========================================================
   */

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 3,
    marginBottom: 13,
  },

  rejectButton: {
    flex: 1,
    minHeight: 53,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#B8C5C1",
    backgroundColor: "#F5F7F6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  rejectEmoji: {
    fontSize: 15,
    marginBottom: 1,
  },

  rejectText: {
    color: "#53645F",
    fontSize: 12,
    fontWeight: "900",
  },

  acceptButton: {
    flex: 1,
    minHeight: 53,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#003F4A",
    backgroundColor: "#2FBFA0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,

    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  disabledButton: {
    opacity: 0.45,
  },

  disabledAcceptButton: {
    backgroundColor: "#AAB7B3",
    borderColor: "#7D8C88",
    shadowOpacity: 0,
    elevation: 0,
  },

  acceptText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  /*
   * ==========================================================
   * FOOTER
   * ==========================================================
   */

  footer: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
  },

  footerNormal: {
    backgroundColor: "#F0F7EA",
    borderColor: "#B8D69A",
  },

  footerRequired: {
    backgroundColor: "#FFF0EE",
    borderColor: "#E59A93",
  },

  footerText: {
    color: "#52645F",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "center",
  },
});