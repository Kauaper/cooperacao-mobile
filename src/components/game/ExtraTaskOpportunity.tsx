import { useMemo } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ExtraTask {
  id: string;
  title: string;
  description: string;
  earning: number;
  emoji: string;
  effort: string;
  timeRequired: string;
}

interface Props {
  currentMonth: number;
  deficit: number;
  onTaskAccept: (task: ExtraTask) => void;
  onTaskReject: () => void;
}

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  lightGray: "#F1F4F4",
  gray: "#68787B",
  red: "#E53935",
  lightRed: "#FFF1F1",
};

export default function ExtraTaskOpportunity({
  deficit,
  onTaskAccept,
  onTaskReject,
}: Props) {

  /*
   * ============================================================
   * TRABALHOS EXTRAS
   * ============================================================
   */

  const extraTasks: ExtraTask[] = [
    {
      id: "wash_car",

      title: "Lavar o Carro dos Pais",

      description:
        "Seus pais precisam lavar o carro e podem te pagar por isso!",

      earning: Math.ceil(deficit * 1.2),

      emoji: "🚗",

      effort:
        "Vai molhar um pouco, mas é divertido!",

      timeRequired: "1 hora",
    },

    {
      id: "organize_room",

      title: "Organizar o Quarto dos Irmãos",

      description:
        "Seus irmãos mais novos bagunçaram tudo e precisam de ajuda!",

      earning: Math.ceil(deficit * 1.1),

      emoji: "🏠",

      effort:
        "Precisa de paciência!",

      timeRequired: "45 minutos",
    },

    {
      id: "walk_dogs",

      title: "Passear com os Cachorros da Vizinha",

      description:
        "Dona Rosa precisa de alguém para passear com seus cachorrinhos!",

      earning: Math.ceil(deficit * 1.3),

      emoji: "🐕",

      effort:
        "Os cachorros são muito fofos!",

      timeRequired: "30 minutos",
    },
  ];

  /*
   * ============================================================
   * ESCOLHER TRABALHO
   * ============================================================
   */

  const selectedTask = useMemo(() => {
    return extraTasks[
      Math.floor(
        Math.random() * extraTasks.length,
      )
    ];
  }, []);

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <View style={styles.wrapper}>

      {/* ======================================================
          CARD PRINCIPAL
          ====================================================== */}

      <View style={styles.card}>

        {/* ====================================================
            CABEÇALHO
            ==================================================== */}

        <View style={styles.header}>

          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>
              💼
            </Text>
          </View>

          <Text style={styles.headerTitle}>
            OPORTUNIDADE!
          </Text>

          <Text style={styles.headerSubtitle}>
            Você pode ganhar dinheiro fazendo
            um trabalho extra.
          </Text>

        </View>

        {/* ====================================================
            NECESSIDADE DE DINHEIRO
            ==================================================== */}

        <View style={styles.deficitBox}>

          <Text style={styles.deficitLabel}>
            VOCÊ PRECISA DE
          </Text>

          <Text style={styles.deficitValue}>
            R$ {deficit.toFixed(0)}
          </Text>

        </View>

        {/* ====================================================
            TRABALHO
            ==================================================== */}

        <View style={styles.taskCard}>

          {/* ÍCONE */}

          <View style={styles.taskIcon}>
            <Text style={styles.taskEmoji}>
              {selectedTask.emoji}
            </Text>
          </View>

          {/* TÍTULO */}

          <Text style={styles.taskTitle}>
            {selectedTask.title}
          </Text>

          {/* DESCRIÇÃO */}

          <Text style={styles.description}>
            {selectedTask.description}
          </Text>

          {/* ==================================================
              PAGAMENTO
              ================================================== */}

          <View style={styles.moneyBox}>

            <Text style={styles.moneyLabel}>
              VOCÊ VAI RECEBER
            </Text>

            <Text style={styles.money}>
              +R$ {selectedTask.earning}
            </Text>

          </View>

          {/* ==================================================
              INFORMAÇÕES
              ================================================== */}

          <View style={styles.infoRow}>

            <View style={styles.infoBox}>

              <Text style={styles.infoEmoji}>
                ⏰
              </Text>

              <Text style={styles.infoLabel}>
                TEMPO
              </Text>

              <Text style={styles.infoValue}>
                {selectedTask.timeRequired}
              </Text>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.infoEmoji}>
                💪
              </Text>

              <Text style={styles.infoLabel}>
                ESFORÇO
              </Text>

              <Text style={styles.infoValue}>
                {selectedTask.effort}
              </Text>

            </View>

          </View>

        </View>

        {/* ====================================================
            DECISÃO
            ==================================================== */}

        <View style={styles.decisionHeader}>

          <Text style={styles.decisionTitle}>
            O QUE VOCÊ VAI FAZER?
          </Text>

          <Text style={styles.decisionSubtitle}>
            Escolha com cuidado!
          </Text>

        </View>

        {/* ====================================================
            ACEITAR
            ==================================================== */}

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() =>
            onTaskAccept(selectedTask)
          }
          activeOpacity={0.8}
        >

          <Text style={styles.acceptButtonText}>
            ACEITAR TRABALHO
          </Text>

          <Text style={styles.acceptButtonSmall}>
            Ganhar +R$ {selectedTask.earning}
          </Text>

        </TouchableOpacity>

        {/* ====================================================
            RECUSAR
            ==================================================== */}

        <TouchableOpacity
          style={styles.rejectButton}
          onPress={onTaskReject}
          activeOpacity={0.8}
        >

          <Text style={styles.rejectButtonText}>
            REDUZIR GASTOS
          </Text>

          <Text style={styles.rejectButtonSmall}>
            Tentar economizar neste mês
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
   * ==========================================================
   * WRAPPER
   * ==========================================================
   */

  wrapper: {
    width: "100%",

    alignItems: "center",
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 24,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    padding: 12,

    alignItems: "center",

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

    borderRadius: 18,

    paddingVertical: 13,

    paddingHorizontal: 12,

    alignItems: "center",

    marginBottom: 10,
  },

  headerIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 5,
  },

  headerEmoji: {
    fontSize: 22,
  },

  headerTitle: {
    color: COLORS.yellow,

    fontSize: 19,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  headerSubtitle: {
    color: COLORS.white,

    fontSize: 10,

    lineHeight: 14,

    fontWeight: "600",

    textAlign: "center",

    marginTop: 3,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DÉFICIT
   * ==========================================================
   */

  deficitBox: {
    width: "100%",

    backgroundColor: COLORS.lightRed,

    borderWidth: 2,

    borderColor: "#FFB4B4",

    borderRadius: 15,

    paddingVertical: 8,

    alignItems: "center",

    marginBottom: 10,
  },

  deficitLabel: {
    color: COLORS.red,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  deficitValue: {
    color: COLORS.red,

    fontSize: 21,

    fontWeight: "900",

    marginTop: 1,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * TRABALHO
   * ==========================================================
   */

  taskCard: {
    width: "100%",

    backgroundColor: "#F7FAFA",

    borderRadius: 18,

    borderWidth: 2,

    borderColor: "#E0E8E8",

    padding: 12,

    alignItems: "center",

    marginBottom: 10,
  },

  taskIcon: {
    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 6,
  },

  taskEmoji: {
    fontSize: 30,
  },

  taskTitle: {
    color: COLORS.navy,

    fontSize: 17,

    lineHeight: 21,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  description: {
    color: COLORS.gray,

    fontSize: 11,

    lineHeight: 15,

    fontWeight: "600",

    textAlign: "center",

    marginTop: 5,

    marginBottom: 10,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DINHEIRO
   * ==========================================================
   */

  moneyBox: {
    width: "100%",

    backgroundColor: COLORS.green,

    borderRadius: 14,

    paddingVertical: 9,

    alignItems: "center",

    marginBottom: 9,
  },

  moneyLabel: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  money: {
    color: COLORS.white,

    fontSize: 27,

    fontWeight: "900",

    marginTop: 1,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * INFORMAÇÕES
   * ==========================================================
   */

  infoRow: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    gap: 7,
  },

  infoBox: {
    flex: 1,

    minHeight: 68,

    backgroundColor: COLORS.white,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: "#DDE5E5",

    padding: 6,

    alignItems: "center",

    justifyContent: "center",
  },

  infoEmoji: {
    fontSize: 17,

    marginBottom: 1,
  },

  infoLabel: {
    color: COLORS.navy,

    fontSize: 7,

    fontWeight: "900",

    includeFontPadding: false,
  },

  infoValue: {
    color: COLORS.gray,

    fontSize: 8,

    lineHeight: 11,

    fontWeight: "700",

    textAlign: "center",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DECISÃO
   * ==========================================================
   */

  decisionHeader: {
    alignItems: "center",

    marginBottom: 7,
  },

  decisionTitle: {
    color: COLORS.navy,

    fontSize: 13,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  decisionSubtitle: {
    color: COLORS.gray,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO ACEITAR
   * ==========================================================
   */

  acceptButton: {
    width: "94%",

    backgroundColor: COLORS.yellow,

    borderRadius: 13,

    paddingVertical: 10,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 7,
  },

  acceptButtonText: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  acceptButtonSmall: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "700",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÃO RECUSAR
   * ==========================================================
   */

  rejectButton: {
    width: "94%",

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: "#B8C1C3",

    borderRadius: 13,

    paddingVertical: 9,

    alignItems: "center",
    justifyContent: "center",
  },

  rejectButtonText: {
    color: COLORS.navy,

    fontSize: 11,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  rejectButtonSmall: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "600",

    marginTop: 2,

    textAlign: "center",

    includeFontPadding: false,
  },

});