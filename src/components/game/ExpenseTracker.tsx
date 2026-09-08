import { StyleSheet, Text, View } from "react-native";

interface ExpenseTrackerProps {
  currentMonth: number;

  monthlyExpenses: {
    pet: number;
    personal: number;
    friends: number;
    investments: number;
    emergencies: number;
  }[];
}

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  blue: "#55B6FF",
  pink: "#FF6BA6",
  orange: "#FFA233",

  gray: "#68787B",
  lightGray: "#EEF2F2",
  border: "#DDE6E6",

  red: "#E53935",
};

export default function ExpenseTracker({
  currentMonth,
  monthlyExpenses,
}: ExpenseTrackerProps) {
  /*
   * ============================================================
   * NÃO MOSTRAR NO PRIMEIRO MÊS
   * ============================================================
   */

  if (currentMonth <= 1) {
    return null;
  }

  /*
   * ============================================================
   * GASTOS DO MÊS ATUAL E ANTERIOR
   * ============================================================
   */

  const currentExpenses =
    monthlyExpenses[currentMonth - 2];

  const previousExpenses =
    monthlyExpenses[currentMonth - 3];

  if (!currentExpenses && !previousExpenses) {
    return null;
  }

  /*
   * ============================================================
   * CATEGORIAS
   * ============================================================
   */

  const categories = [
    {
      key: "pet",
      label: "PET",
      emoji: "🐾",
      color: COLORS.pink,
    },

    {
      key: "personal",
      label: "PESSOAIS",
      emoji: "🛍️",
      color: COLORS.blue,
    },

    {
      key: "friends",
      label: "SOCIAL",
      emoji: "👫",
      color: COLORS.orange,
    },

    {
      key: "investments",
      label: "GUARDADO",
      emoji: "🌱",
      color: COLORS.green,
    },

    {
      key: "emergencies",
      label: "EMERGÊNCIAS",
      emoji: "🚨",
      color: COLORS.red,
    },
  ];

  /*
   * ============================================================
   * MAIOR VALOR
   * ============================================================
   */

  const getMaxValue = () => {
    const allValues = monthlyExpenses.flatMap((month) =>
      Object.values(month),
    );

    return Math.max(...allValues, 50);
  };

  const maxValue = getMaxValue();

  /*
   * ============================================================
   * TOTAL DO MÊS
   * ============================================================
   */

  const totalCurrent =
    currentExpenses
      ? Object.values(currentExpenses).reduce(
          (sum, value) => sum + value,
          0,
        )
      : 0;

  /*
   * ============================================================
   * RENDER
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
            📊
          </Text>
        </View>

        <View style={styles.headerTextArea}>

          <Text style={styles.title}>
            HISTÓRICO DE GASTOS
          </Text>

          <Text style={styles.subtitle}>
            Veja para onde seu dinheiro foi
          </Text>

        </View>

      </View>

      {/* ======================================================
          MÊS
          ====================================================== */}

      <View style={styles.monthBadge}>

        <Text style={styles.monthText}>
          MÊS {currentMonth - 1}
        </Text>

      </View>

      {/* ======================================================
          CATEGORIAS
          ====================================================== */}

      <View style={styles.categories}>

        {categories.map((category) => {

          const currentValue =
            currentExpenses?.[
              category.key as keyof typeof currentExpenses
            ] || 0;

          const previousValue =
            previousExpenses?.[
              category.key as keyof typeof previousExpenses
            ] || 0;

          const currentPercent =
            (currentValue / maxValue) * 100;

          const previousPercent =
            (previousValue / maxValue) * 100;

          const change =
            currentValue - previousValue;

          return (
            <View
              key={category.key}
              style={styles.categoryCard}
            >

              {/* ==================================================
                  CABEÇALHO DA CATEGORIA
                  ================================================== */}

              <View style={styles.categoryHeader}>

                <View style={styles.categoryNameArea}>

                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor:
                          category.color,
                      },
                    ]}
                  >
                    <Text style={styles.categoryEmoji}>
                      {category.emoji}
                    </Text>
                  </View>

                  <Text style={styles.categoryName}>
                    {category.label}
                  </Text>

                </View>

                <View style={styles.valueArea}>

                  <Text style={styles.currentValue}>
                    R$ {currentValue.toFixed(0)}
                  </Text>

                  {change !== 0 &&
                    previousExpenses && (
                      <Text
                        style={[
                          styles.changeText,
                          {
                            color:
                              change > 0
                                ? COLORS.red
                                : COLORS.green,
                          },
                        ]}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(0)}
                      </Text>
                    )}

                </View>

              </View>

              {/* ==================================================
                  BARRA
                  ================================================== */}

              <View style={styles.barContainer}>

                {/* MÊS ANTERIOR */}

                {previousValue > 0 && (
                  <View
                    style={[
                      styles.previousBar,
                      {
                        width: `${Math.min(
                          previousPercent,
                          100,
                        )}%`,
                      },
                    ]}
                  />
                )}

                {/* MÊS ATUAL */}

                {currentValue > 0 && (
                  <View
                    style={[
                      styles.currentBar,
                      {
                        width: `${Math.min(
                          currentPercent,
                          100,
                        )}%`,
                        backgroundColor:
                          category.color,
                      },
                    ]}
                  />
                )}

              </View>

            </View>
          );
        })}

      </View>

      {/* ======================================================
          LEGENDA
          ====================================================== */}

      {previousExpenses && (
        <View style={styles.legend}>

          <View style={styles.legendItem}>

            <View style={styles.legendCurrent} />

            <Text style={styles.legendText}>
              Este mês
            </Text>

          </View>

          <View style={styles.legendItem}>

            <View style={styles.legendPrevious} />

            <Text style={styles.legendText}>
              Mês anterior
            </Text>

          </View>

        </View>
      )}

      {/* ======================================================
          TOTAL
          ====================================================== */}

      <View style={styles.totalBox}>

        <View style={styles.totalLeft}>

          <Text style={styles.totalEmoji}>
            💰
          </Text>

          <Text style={styles.totalLabel}>
            TOTAL DO MÊS
          </Text>

        </View>

        <Text style={styles.totalValue}>
          R$ {totalCurrent.toFixed(0)}
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

    padding: 12,

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  headerIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: COLORS.navy,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 9,
  },

  headerEmoji: {
    fontSize: 21,
  },

  headerTextArea: {
    flex: 1,
  },

  title: {
    color: COLORS.navy,

    fontSize: 17,

    fontWeight: "900",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.gray,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * MÊS
   * ==========================================================
   */

  monthBadge: {
    alignSelf: "flex-start",

    backgroundColor: COLORS.yellow,

    borderRadius: 12,

    paddingHorizontal: 10,

    paddingVertical: 4,

    marginBottom: 9,
  },

  monthText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CATEGORIAS
   * ==========================================================
   */

  categories: {
    width: "100%",
  },

  categoryCard: {
    backgroundColor: "#F8FAFA",

    borderRadius: 13,

    borderWidth: 1,

    borderColor: COLORS.border,

    padding: 8,

    marginBottom: 7,
  },

  categoryHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 6,
  },

  categoryNameArea: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  categoryIcon: {
    width: 29,
    height: 29,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 7,
  },

  categoryEmoji: {
    fontSize: 14,
  },

  categoryName: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    includeFontPadding: false,
  },

  valueArea: {
    alignItems: "flex-end",
  },

  currentValue: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  changeText: {
    fontSize: 8,

    fontWeight: "800",

    marginTop: 1,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BARRAS
   * ==========================================================
   */

  barContainer: {
    width: "100%",

    height: 10,

    backgroundColor: "#E4EAEA",

    borderRadius: 5,

    overflow: "hidden",

    position: "relative",
  },

  previousBar: {
    position: "absolute",

    left: 0,
    top: 0,

    height: 10,

    backgroundColor: "#9EADAD",

    borderRadius: 5,

    opacity: 0.35,
  },

  currentBar: {
    position: "absolute",

    left: 0,
    top: 0,

    height: 10,

    borderRadius: 5,

    minWidth: 3,
  },

  /*
   * ==========================================================
   * LEGENDA
   * ==========================================================
   */

  legend: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 14,

    marginTop: 2,

    marginBottom: 8,
  },

  legendItem: {
    flexDirection: "row",

    alignItems: "center",
  },

  legendCurrent: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: COLORS.turquoise,

    marginRight: 4,
  },

  legendPrevious: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#9EADAD",

    opacity: 0.5,

    marginRight: 4,
  },

  legendText: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "600",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * TOTAL
   * ==========================================================
   */

  totalBox: {
    width: "100%",

    backgroundColor: COLORS.yellow,

    borderRadius: 15,

    paddingVertical: 9,

    paddingHorizontal: 11,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  totalLeft: {
    flexDirection: "row",

    alignItems: "center",
  },

  totalEmoji: {
    fontSize: 18,

    marginRight: 6,
  },

  totalLabel: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    includeFontPadding: false,
  },

  totalValue: {
    color: COLORS.navy,

    fontSize: 19,

    fontWeight: "900",

    includeFontPadding: false,
  },

});