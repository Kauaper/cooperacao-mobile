import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface TemptingOffer {
  id: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  temptation: string;
  consequence: string;
}

interface TemptingOffersProps {
  balance: number;
  currentMonth: number;

  onOfferAccept: (offer: TemptingOffer) => void;

  onOfferReject: () => void;
}

export default function TemptingOffers({
  balance,
  currentMonth,
  onOfferAccept,
  onOfferReject,
}: TemptingOffersProps) {
  const offersByMonth: Record<number, TemptingOffer> = {
    2: {
      id: "super_toy",
      title: "Brinquedo Incrível",
      description:
        "O brinquedo mais legal da loja! Todos os seus amigos têm um!",
      cost: Math.floor(balance * 0.4),
      emoji: "🎮",
      temptation: "Você será o mais legal da turma!",
      consequence:
        "Mas vai sobrar menos dinheiro para outras coisas...",
    },

    5: {
      id: "candy_fest",
      title: "Festival de Doces",
      description: "Uma montanha de doces deliciosos!",
      cost: Math.floor(balance * 0.25),
      emoji: "🍭",
      temptation: "Será a festa mais doce do mundo!",
      consequence:
        "Mas depois você pode ficar sem dinheiro para o lanche...",
    },

    8: {
      id: "trendy_clothes",
      title: "Roupa da Moda",
      description: "A roupa mais estilosa que existe!",
      cost: Math.floor(balance * 0.5),
      emoji: "👕",
      temptation: "Você vai arrasar no visual!",
      consequence:
        "Mas talvez não sobre para outras necessidades...",
    },

    11: {
      id: "party_expense",
      title: "Festa de Fim de Ano",
      description: "Uma festa incrível com todos os amigos!",
      cost: Math.floor(balance * 0.35),
      emoji: "🎉",
      temptation: "Será a festa mais divertida do ano!",
      consequence:
        "Mas você pode acabar o ano sem dinheiro guardado...",
    },
  };

  let currentOffer = offersByMonth[currentMonth];

  if (!currentOffer) {
    const genericOffers: TemptingOffer[] = [
      {
        id: "electronics",
        title: "Gadget Tecnológico",
        description: "Um acessório tecnológico incrível!",
        cost: Math.floor(balance * 0.3),
        emoji: "📱",
        temptation: "Você ficará super moderno!",
        consequence:
          "Mas pode não sobrar para coisas importantes...",
      },

      {
        id: "collectible",
        title: "Item Colecionável",
        description: "Um item raro de coleção!",
        cost: Math.floor(balance * 0.4),
        emoji: "🎲",
        temptation: "Sua coleção ficará completa!",
        consequence:
          "Mas será que vale tanto dinheiro assim?",
      },

      {
        id: "entertainment",
        title: "Diversão Premium",
        description:
          "Uma experiência de diversão incrível!",
        cost: Math.floor(balance * 0.25),
        emoji: "🎪",
        temptation: "Você se divertirá como nunca!",
        consequence:
          "Mas a diversão passa rápido...",
      },
    ];

    const offerIndex = currentMonth % genericOffers.length;

    currentOffer = genericOffers[offerIndex];
  }

  const handleAccept = () => {
    onOfferAccept(currentOffer);
  };

  const handleReject = () => {
    onOfferReject();
  };

  const percentage =
    balance > 0
      ? ((currentOffer.cost / balance) * 100).toFixed(0)
      : "0";

  return (
    <View style={styles.card}>

      {/* ================================================== */}
      {/* CABEÇALHO */}
      {/* ================================================== */}

      <View style={styles.header}>

        <View style={styles.headerBadge}>
          <Text style={styles.headerEmoji}>
            {currentOffer.emoji}
          </Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>
            ATENÇÃO!
          </Text>

          <Text style={styles.headerTitle}>
            OFERTA ESPECIAL
          </Text>
        </View>

        <View style={styles.headerBadge}>
          <Text style={styles.headerEmoji}>
            {currentOffer.emoji}
          </Text>
        </View>

      </View>

      {/* ================================================== */}
      {/* PRODUTO */}
      {/* ================================================== */}

      <View style={styles.productBox}>

        <View style={styles.productEmojiBox}>
          <Text style={styles.productEmoji}>
            {currentOffer.emoji}
          </Text>
        </View>

        <Text style={styles.title}>
          {currentOffer.title}
        </Text>

        <Text style={styles.description}>
          {currentOffer.description}
        </Text>

      </View>

      {/* ================================================== */}
      {/* PREÇO */}
      {/* ================================================== */}

      <View style={styles.priceBox}>

        <View style={styles.priceHeader}>
          <Text style={styles.priceLabel}>
            OFERTA DO DIA
          </Text>

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              IMPERDÍVEL
            </Text>
          </View>
        </View>

        <Text style={styles.priceText}>
          R$ {currentOffer.cost}
        </Text>

        <Text style={styles.percentText}>
          Isso representa {percentage}% do seu dinheiro
        </Text>

        <View style={styles.balanceLine}>
          <Text style={styles.balanceLabel}>
            💰 Seu dinheiro
          </Text>

          <Text style={styles.balanceValue}>
            R$ {balance.toFixed(0)}
          </Text>
        </View>

      </View>

      {/* ================================================== */}
      {/* TENTAÇÃO */}
      {/* ================================================== */}

      <View style={styles.temptationBox}>

        <View style={styles.temptationIcon}>
          <Text style={styles.temptationEmoji}>
            ✨
          </Text>
        </View>

        <View style={styles.temptationContent}>
          <Text style={styles.temptationLabel}>
            POR QUE VOCÊ DEVERIA COMPRAR?
          </Text>

          <Text style={styles.temptationText}>
            {currentOffer.temptation}
          </Text>
        </View>

      </View>

      {/* ================================================== */}
      {/* ALERTA */}
      {/* ================================================== */}

      <View style={styles.warningBox}>

        <Text style={styles.warningIcon}>
          ⚠️
        </Text>

        <View style={styles.warningContent}>
          <Text style={styles.warningTitle}>
            PENSE BEM!
          </Text>

          <Text style={styles.warningText}>
            {currentOffer.consequence}
          </Text>
        </View>

      </View>

      {/* ================================================== */}
      {/* DECISÃO */}
      {/* ================================================== */}

      <Text style={styles.decisionTitle}>
        🤔 Qual será sua decisão?
      </Text>

      <View style={styles.buttons}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.rejectButton}
          onPress={handleReject}
        >
          <Text style={styles.rejectEmoji}>
            🛡️
          </Text>

          <Text style={styles.rejectText}>
            Pensar Melhor
          </Text>

          <Text style={styles.rejectSubtext}>
            Guardar meu dinheiro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.acceptButton}
          onPress={handleAccept}
        >
          <Text style={styles.acceptEmoji}>
            🛒
          </Text>

          <Text style={styles.acceptText}>
            QUERO AGORA!
          </Text>

          <Text style={styles.acceptSubtext}>
            Gastar R$ {currentOffer.cost}
          </Text>
        </TouchableOpacity>

      </View>

      {/* ================================================== */}
      {/* RODAPÉ */}
      {/* ================================================== */}

      <View style={styles.footer}>

        <Text style={styles.footerEmoji}>
          ⏰
        </Text>

        <Text style={styles.footerText}>
          Esta oferta aparece apenas uma vez por mês!
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  /*
   * ==========================================================
   * CARD PRINCIPAL
   * ==========================================================
   */

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,

    borderWidth: 3,
    borderColor: "#003B49",

    shadowColor: "#003B49",
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
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF0E5",

    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FB923C",

    paddingVertical: 12,
    paddingHorizontal: 10,

    marginBottom: 14,
  },

  headerBadge: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    borderWidth: 2,
    borderColor: "#FB923C",

    alignItems: "center",
    justifyContent: "center",
  },

  headerEmoji: {
    fontSize: 25,
  },

  headerContent: {
    alignItems: "center",
    marginHorizontal: 10,
  },

  headerLabel: {
    color: "#EA580C",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  headerTitle: {
    color: "#003B49",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 1,
  },

  /*
   * ==========================================================
   * PRODUTO
   * ==========================================================
   */

  productBox: {
    alignItems: "center",

    backgroundColor: "#F8FAF9",

    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#DCE5E1",

    padding: 16,

    marginBottom: 12,
  },

  productEmojiBox: {
    width: 76,
    height: 76,

    borderRadius: 38,

    backgroundColor: "#FFF7ED",

    borderWidth: 3,
    borderColor: "#FDBA74",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 9,
  },

  productEmoji: {
    fontSize: 44,
  },

  title: {
    color: "#003B49",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },

  description: {
    color: "#667672",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,

    textAlign: "center",

    marginTop: 6,
  },

  /*
   * ==========================================================
   * PREÇO
   * ==========================================================
   */

  priceBox: {
    backgroundColor: "#FFF7ED",

    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FB923C",

    padding: 14,

    marginBottom: 11,
  },

  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceLabel: {
    color: "#9A4D12",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  discountBadge: {
    backgroundColor: "#EA580C",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
  },

  priceText: {
    color: "#EA580C",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",

    marginTop: 3,
  },

  percentText: {
    color: "#765E4A",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",

    marginTop: 1,
    marginBottom: 11,
  },

  balanceLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 9,

    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  balanceLabel: {
    color: "#667672",
    fontSize: 11,
    fontWeight: "700",
  },

  balanceValue: {
    color: "#003B49",
    fontSize: 13,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * TENTAÇÃO
   * ==========================================================
   */

  temptationBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EAF7D7",

    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#7FC241",

    padding: 12,

    marginBottom: 10,
  },

  temptationIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#D5E72C",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  temptationEmoji: {
    fontSize: 22,
  },

  temptationContent: {
    flex: 1,
  },

  temptationLabel: {
    color: "#4D681D",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  temptationText: {
    color: "#003B49",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",

    marginTop: 2,
  },

  /*
   * ==========================================================
   * ALERTA
   * ==========================================================
   */

  warningBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF4C2",

    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#F2C94C",

    padding: 12,

    marginBottom: 14,
  },

  warningIcon: {
    fontSize: 25,
    marginRight: 10,
  },

  warningContent: {
    flex: 1,
  },

  warningTitle: {
    color: "#725D13",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  warningText: {
    color: "#4F4B36",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",

    marginTop: 2,
  },

  /*
   * ==========================================================
   * DECISÃO
   * ==========================================================
   */

  decisionTitle: {
    color: "#003B49",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",

    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  rejectButton: {
    flex: 1,

    backgroundColor: "#F3F6F5",

    borderWidth: 2,
    borderColor: "#8CA4A4",

    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 8,

    alignItems: "center",
    justifyContent: "center",
  },

  rejectEmoji: {
    fontSize: 24,
    marginBottom: 3,
  },

  rejectText: {
    color: "#31545A",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  rejectSubtext: {
    color: "#74827F",
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",

    marginTop: 3,
  },

  acceptButton: {
    flex: 1,

    backgroundColor: "#EA580C",

    borderWidth: 2,
    borderColor: "#9A3412",

    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 8,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#9A3412",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },

  acceptEmoji: {
    fontSize: 24,
    marginBottom: 3,
  },

  acceptText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  acceptSubtext: {
    color: "#FFE7D5",
    fontSize: 9,
    fontWeight: "700",
    textAlign: "center",

    marginTop: 3,
  },

  /*
   * ==========================================================
   * RODAPÉ
   * ==========================================================
   */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F5F7F6",

    borderRadius: 11,

    paddingVertical: 9,
    paddingHorizontal: 10,

    marginTop: 10,
  },

  footerEmoji: {
    fontSize: 15,
    marginRight: 5,
  },

  footerText: {
    color: "#687772",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
});