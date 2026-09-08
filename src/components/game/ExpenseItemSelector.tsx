import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ExpenseItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ExpenseItemSelectorProps {
  category: string;
  maxAmount: number;

  onClose: () => void;

  onConfirm: (
    selectedItems: ExpenseItem[],
    totalValue: number,
  ) => void;
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

  light: "#F5F7F7",
  gray: "#68787B",
  border: "#DDE5E5",

  red: "#E53935",
};

export default function ExpenseItemSelector({
  category,
  maxAmount,
  onClose,
  onConfirm,
}: ExpenseItemSelectorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    [],
  );

  /*
   * ============================================================
   * ITENS
   * ============================================================
   */

  const itemsByCategory: Record<string, ExpenseItem[]> = {
    necessities: [
      {
        id: "school_supplies",
        name: "Material escolar",
        price: 15,
        description: "Cadernos, canetas e lápis",
      },
      {
        id: "clothes",
        name: "Roupas básicas",
        price: 25,
      },
      {
        id: "shoes",
        name: "Calçados",
        price: 30,
      },
      {
        id: "hygiene",
        name: "Produtos de higiene",
        price: 12,
      },
      {
        id: "transport",
        name: "Transporte",
        price: 20,
      },
      {
        id: "books",
        name: "Livros didáticos",
        price: 18,
      },
    ],

    wants: [
      {
        id: "videogame",
        name: "Jogo novo",
        price: 25,
      },
      {
        id: "candy",
        name: "Doces",
        price: 8,
      },
      {
        id: "toys",
        name: "Brinquedos",
        price: 20,
      },
      {
        id: "trendy_clothes",
        name: "Roupas da moda",
        price: 35,
      },
      {
        id: "gadgets",
        name: "Acessórios tech",
        price: 40,
      },
    ],

    friends: [
      {
        id: "birthday_gift",
        name: "Presente",
        price: 20,
      },
      {
        id: "cinema",
        name: "Cinema",
        price: 15,
      },
      {
        id: "snacks_out",
        name: "Lanche",
        price: 10,
      },
      {
        id: "outing",
        name: "Passeio",
        price: 18,
      },
    ],

    emergency: [
      {
        id: "broken_item",
        name: "Conserto",
        price: 15,
      },
      {
        id: "urgent_medicine",
        name: "Remédio",
        price: 12,
      },
      {
        id: "transport_extra",
        name: "Transporte",
        price: 8,
      },
    ],
  };

  const items =
    itemsByCategory[
      category as keyof typeof itemsByCategory
    ] || [];

  /*
   * ============================================================
   * CONFIGURAÇÃO VISUAL DA CATEGORIA
   * ============================================================
   */

  const categoryInfo: Record<
    string,
    {
      title: string;
      emoji: string;
      color: string;
    }
  > = {
    necessities: {
      title: "COISAS IMPORTANTES",
      emoji: "📚",
      color: COLORS.blue,
    },

    wants: {
      title: "COISAS DIVERTIDAS",
      emoji: "🎮",
      color: COLORS.pink,
    },

    friends: {
      title: "DIVERSÃO",
      emoji: "🎉",
      color: COLORS.orange,
    },

    emergency: {
      title: "EMERGÊNCIA",
      emoji: "🚨",
      color: COLORS.red,
    },
  };

  const info = categoryInfo[category] || {
    title: "ESCOLHA SEUS ITENS",
    emoji: "🛍️",
    color: COLORS.turquoise,
  };

  /*
   * ============================================================
   * TOTAL
   * ============================================================
   */

  const getTotalValue = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = items.find(
        (currentItem) => currentItem.id === itemId,
      );

      return total + (item?.price || 0);
    }, 0);
  };

  const totalValue = getTotalValue();

  const remainingValue = Math.max(
    0,
    maxAmount - totalValue,
  );

  /*
   * ============================================================
   * SELEÇÃO
   * ============================================================
   */

  const handleItemToggle = (itemId: string) => {
    const item = items.find(
      (currentItem) => currentItem.id === itemId,
    );

    if (!item) return;

    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      setSelectedItems((previous) =>
        previous.filter((id) => id !== itemId),
      );

      return;
    }

    if (totalValue + item.price <= maxAmount) {
      setSelectedItems((previous) => [
        ...previous,
        itemId,
      ]);
    }
  };

  /*
   * ============================================================
   * CONFIRMAR
   * ============================================================
   */

  const handleConfirm = () => {
    const selectedItemsData = items.filter((item) =>
      selectedItems.includes(item.id),
    );

    onConfirm(
      selectedItemsData,
      totalValue,
    );
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <View style={styles.container}>

      {/* ======================================================
          CABEÇALHO
          ====================================================== */}

      <View style={styles.header}>

        <View
          style={[
            styles.headerIcon,
            {
              backgroundColor: info.color,
            },
          ]}
        >
          <Text style={styles.headerEmoji}>
            {info.emoji}
          </Text>
        </View>

        <Text style={styles.title}>
          {info.title}
        </Text>

        <Text style={styles.subtitle}>
          Escolha o que deseja comprar
        </Text>

      </View>

      {/* ======================================================
          ORÇAMENTO
          ====================================================== */}

      <View style={styles.budgetRow}>

        <View style={styles.budgetBox}>

          <Text style={styles.budgetLabel}>
            ORÇAMENTO
          </Text>

          <Text style={styles.budgetValue}>
            R$ {maxAmount}
          </Text>

        </View>

        <View
          style={[
            styles.budgetBox,
            styles.selectedBudgetBox,
          ]}
        >

          <Text style={styles.budgetLabel}>
            GASTANDO
          </Text>

          <Text
            style={[
              styles.budgetValue,
              {
                color:
                  totalValue > maxAmount
                    ? COLORS.red
                    : COLORS.green,
              },
            ]}
          >
            R$ {totalValue}
          </Text>

        </View>

        <View
          style={[
            styles.budgetBox,
            styles.remainingBudgetBox,
          ]}
        >

          <Text style={styles.budgetLabel}>
            RESTA
          </Text>

          <Text style={styles.budgetValue}>
            R$ {remainingValue}
          </Text>

        </View>

      </View>

      {/* ======================================================
          LISTA
          ====================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {items.map((item) => {

          const isSelected =
            selectedItems.includes(item.id);

          const wouldExceedBudget =
            !isSelected &&
            totalValue + item.price > maxAmount;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() =>
                handleItemToggle(item.id)
              }
              disabled={wouldExceedBudget}
              style={[
                styles.itemCard,

                isSelected &&
                  styles.selectedCard,

                wouldExceedBudget &&
                  styles.disabledCard,
              ]}
            >

              {/* CHECK */}

              <View
                style={[
                  styles.checkCircle,

                  isSelected &&
                    styles.checkCircleSelected,
                ]}
              >

                <Text
                  style={[
                    styles.checkText,

                    isSelected &&
                      styles.checkTextSelected,
                  ]}
                >
                  {isSelected ? "✓" : ""}
                </Text>

              </View>

              {/* INFORMAÇÕES */}

              <View style={styles.itemInfo}>

                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                {item.description && (
                  <Text
                    style={styles.itemDescription}
                  >
                    {item.description}
                  </Text>
                )}

              </View>

              {/* PREÇO */}

              <Text
                style={[
                  styles.price,
                  isSelected &&
                    styles.selectedPrice,
                ]}
              >
                R$ {item.price}
              </Text>

            </TouchableOpacity>
          );
        })}

      </ScrollView>

      {/* ======================================================
          RODAPÉ
          ====================================================== */}

      <View style={styles.footer}>

        <View style={styles.totalRow}>

          <View>

            <Text style={styles.totalLabel}>
              TOTAL
            </Text>

            <Text style={styles.totalValue}>
              R$ {totalValue}
            </Text>

          </View>

          <View style={styles.remainingArea}>

            <Text style={styles.remainingLabel}>
              RESTANTE
            </Text>

            <Text style={styles.remainingValue}>
              R$ {remainingValue}
            </Text>

          </View>

        </View>

        {/* BOTÕES */}

        <View style={styles.buttons}>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>
              VOLTAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              totalValue === 0 &&
                styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={totalValue === 0}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmText}>
              CONFIRMAR
            </Text>
          </TouchableOpacity>

        </View>

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
   * CONTAINER
   * ==========================================================
   */

  container: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 22,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    overflow: "hidden",

    padding: 10,
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    backgroundColor: COLORS.navy,

    borderRadius: 16,

    paddingVertical: 13,

    paddingHorizontal: 10,

    alignItems: "center",

    marginBottom: 9,
  },

  headerIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 5,
  },

  headerEmoji: {
    fontSize: 21,
  },

  title: {
    color: COLORS.white,

    fontSize: 17,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    opacity: 0.9,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 3,

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * ORÇAMENTO
   * ==========================================================
   */

  budgetRow: {
    flexDirection: "row",

    gap: 6,

    marginBottom: 9,
  },

  budgetBox: {
    flex: 1,

    backgroundColor: COLORS.yellow,

    borderRadius: 12,

    paddingVertical: 7,

    alignItems: "center",
  },

  selectedBudgetBox: {
    backgroundColor: "#EAF7D7",
  },

  remainingBudgetBox: {
    backgroundColor: "#E9F7F5",
  },

  budgetLabel: {
    color: COLORS.navy,

    fontSize: 7,

    fontWeight: "900",

    includeFontPadding: false,
  },

  budgetValue: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * SCROLL
   * ==========================================================
   */

  scroll: {
    maxHeight: 330,
  },

  scrollContent: {
    paddingBottom: 2,
  },

  /*
   * ==========================================================
   * ITEM
   * ==========================================================
   */

  itemCard: {
    width: "100%",

    minHeight: 57,

    backgroundColor: "#F5F7F7",

    borderRadius: 13,

    borderWidth: 2,

    borderColor: COLORS.border,

    paddingVertical: 8,

    paddingHorizontal: 9,

    marginBottom: 7,

    flexDirection: "row",

    alignItems: "center",
  },

  selectedCard: {
    backgroundColor: "#EAF7D7",

    borderColor: COLORS.green,
  },

  disabledCard: {
    opacity: 0.35,
  },

  /*
   * ==========================================================
   * CHECK
   * ==========================================================
   */

  checkCircle: {
    width: 27,
    height: 27,

    borderRadius: 14,

    backgroundColor: COLORS.white,

    borderWidth: 2,

    borderColor: "#AAB7B7",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 8,
  },

  checkCircleSelected: {
    backgroundColor: COLORS.green,

    borderColor: COLORS.green,
  },

  checkText: {
    color: COLORS.white,

    fontSize: 16,

    fontWeight: "900",

    includeFontPadding: false,
  },

  checkTextSelected: {
    color: COLORS.white,
  },

  /*
   * ==========================================================
   * INFORMAÇÕES
   * ==========================================================
   */

  itemInfo: {
    flex: 1,

    minWidth: 0,
  },

  itemName: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    includeFontPadding: false,
  },

  itemDescription: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "600",

    marginTop: 2,

    lineHeight: 11,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * PREÇO
   * ==========================================================
   */

  price: {
    color: COLORS.turquoise,

    fontSize: 13,

    fontWeight: "900",

    marginLeft: 6,

    includeFontPadding: false,
  },

  selectedPrice: {
    color: COLORS.green,
  },

  /*
   * ==========================================================
   * RODAPÉ
   * ==========================================================
   */

  footer: {
    backgroundColor: COLORS.navy,

    borderRadius: 16,

    padding: 10,

    marginTop: 5,
  },

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 9,
  },

  totalLabel: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  totalValue: {
    color: COLORS.yellow,

    fontSize: 20,

    fontWeight: "900",

    marginTop: 1,

    includeFontPadding: false,
  },

  remainingArea: {
    alignItems: "flex-end",
  },

  remainingLabel: {
    color: COLORS.white,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  remainingValue: {
    color: COLORS.green,

    fontSize: 16,

    fontWeight: "900",

    marginTop: 1,

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
  },

  cancelButton: {
    flex: 1,

    backgroundColor: COLORS.white,

    borderRadius: 11,

    paddingVertical: 10,

    alignItems: "center",

    justifyContent: "center",
  },

  cancelText: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    includeFontPadding: false,
  },

  confirmButton: {
    flex: 1,

    backgroundColor: COLORS.yellow,

    borderRadius: 11,

    paddingVertical: 10,

    alignItems: "center",

    justifyContent: "center",
  },

  confirmButtonDisabled: {
    opacity: 0.45,
  },

  confirmText: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    includeFontPadding: false,
  },

});