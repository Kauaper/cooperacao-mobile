import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

interface Product {
  id: string;
  name: string;
  emoji: string;

  stores: {
    name: string;
    price: number;
    quality: "baixa" | "média" | "alta";
    distance: string;
  }[];
}

interface ShoppingMiniGameProps {
  onComplete: (savings: number, lesson: string) => void;
}

export default function ShoppingMiniGame({
  onComplete,
}: ShoppingMiniGameProps) {
  const { gameState } = useGame();

  const [selectedStore, setSelectedStore] = useState("");
  const [showResult, setShowResult] = useState(false);

  const products: Product[] = [
    {
      id: "school_supplies",
      name: "Kit Escolar",
      emoji: "📚",

      stores: [
        {
          name: "Loja Cara",
          price: 45,
          quality: "alta",
          distance: "Perto",
        },
        {
          name: "Loja Média",
          price: 30,
          quality: "média",
          distance: "Médio",
        },
        {
          name: "Loja Barata",
          price: 18,
          quality: "baixa",
          distance: "Longe",
        },
        {
          name: "Promoção",
          price: 25,
          quality: "alta",
          distance: "Perto",
        },
      ],
    },

    {
      id: "pet_food",
      name: "Ração do Pet",
      emoji: "🍖",

      stores: [
        {
          name: "Pet Shop Premium",
          price: 35,
          quality: "alta",
          distance: "Médio",
        },
        {
          name: "Supermercado",
          price: 22,
          quality: "média",
          distance: "Perto",
        },
        {
          name: "Atacado",
          price: 15,
          quality: "baixa",
          distance: "Longe",
        },
        {
          name: "Oferta Online",
          price: 20,
          quality: "alta",
          distance: "Entrega",
        },
      ],
    },

    {
      id: "birthday_gift",
      name: "Presente de Aniversário",
      emoji: "🎁",

      stores: [
        {
          name: "Loja de Brinquedos",
          price: 50,
          quality: "alta",
          distance: "Perto",
        },
        {
          name: "Loja Popular",
          price: 30,
          quality: "média",
          distance: "Médio",
        },
        {
          name: "Bazar",
          price: 15,
          quality: "baixa",
          distance: "Longe",
        },
        {
          name: "Feira de Usados",
          price: 12,
          quality: "média",
          distance: "Longe",
        },
      ],
    },
  ];

  const currentProduct =
    products[gameState.currentMonth % products.length];

  const bestValue =
    currentProduct.stores.find(
      (store) =>
        store.quality === "alta" &&
        store.price <=
          Math.min(
            ...currentProduct.stores.map((s) => s.price),
          ) + 10,
    ) ||
    currentProduct.stores.reduce((best, current) =>
      current.price /
        (current.quality === "alta"
          ? 3
          : current.quality === "média"
            ? 2
            : 1) <
      best.price /
        (best.quality === "alta"
          ? 3
          : best.quality === "média"
            ? 2
            : 1)
        ? current
        : best,
    );

  const selectedStoreData = currentProduct.stores.find(
    (s) => s.name === selectedStore,
  );

  const handleStoreSelect = (storeName: string) => {
    setSelectedStore(storeName);
  };

  const handleConfirm = () => {
    if (!selectedStoreData) {
      return;
    }

    setShowResult(true);

    // A economia nunca pode ser negativa.
    const savings = Math.max(
      0,
      bestValue.price - selectedStoreData.price,
    );

    const isGoodChoice =
      selectedStoreData === bestValue ||
      (selectedStoreData.quality === "alta" &&
        selectedStoreData.price <= bestValue.price + 5);

    const lesson = isGoodChoice
      ? "Excelente escolha! Você encontrou uma ótima relação entre preço e qualidade."
      : savings > 0
        ? "Boa economia! Comparar preços antes de comprar ajuda a cuidar melhor do seu dinheiro."
        : "Aprendizado importante: sempre compare preço, qualidade e distância antes de comprar.";

    setTimeout(() => {
      onComplete(savings, lesson);
    }, 3000);
  };

  /*
   * ==========================================================
   * RESULTADO
   * ==========================================================
   */

  if (showResult) {
    const savedMoney =
      selectedStoreData && selectedStoreData.price < bestValue.price
        ? bestValue.price - selectedStoreData.price
        : 0;

    const choseBest =
      selectedStoreData === bestValue;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultEmoji}>🛒</Text>

          <Text style={styles.resultTitle}>
            Compra Realizada!
          </Text>

          <Text style={styles.resultSubtitle}>
            Veja como foi sua escolha
          </Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>
            VOCÊ ESCOLHEU
          </Text>

          <Text style={styles.resultStore}>
            {selectedStoreData?.name}
          </Text>

          <Text style={styles.resultPrice}>
            R$ {selectedStoreData?.price}
          </Text>

          <View style={styles.resultInfoRow}>
            <View style={styles.resultInfo}>
              <Text style={styles.resultInfoLabel}>
                Qualidade
              </Text>

              <Text style={styles.resultInfoValue}>
                {selectedStoreData?.quality}
              </Text>
            </View>

            <View style={styles.resultInfo}>
              <Text style={styles.resultInfoLabel}>
                Distância
              </Text>

              <Text style={styles.resultInfoValue}>
                {selectedStoreData?.distance}
              </Text>
            </View>
          </View>
        </View>

        {choseBest && (
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>🏆</Text>

            <View style={styles.successContent}>
              <Text style={styles.successTitle}>
                MELHOR ESCOLHA!
              </Text>

              <Text style={styles.successText}>
                Você encontrou a melhor relação entre
                preço e qualidade.
              </Text>
            </View>
          </View>
        )}

        {savedMoney > 0 && !choseBest && (
          <View style={styles.savingsCard}>
            <Text style={styles.savingsEmoji}>💰</Text>

            <View style={styles.savingsContent}>
              <Text style={styles.savingsTitle}>
                VOCÊ ECONOMIZOU
              </Text>

              <Text style={styles.savingsValue}>
                R$ {savedMoney}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.lessonCard}>
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonEmoji}>
              📚
            </Text>

            <Text style={styles.lessonTitle}>
              O que aprendemos?
            </Text>
          </View>

          <Text style={styles.lessonText}>
            {choseBest
              ? "Excelente! Você encontrou a melhor opção disponível."
              : "Comparar preços, qualidade e condições ajuda a tomar decisões financeiras melhores."}
          </Text>
        </View>

        <Text style={styles.waitText}>
          Continuando sua aventura...
        </Text>
      </View>
    );
  }

  /*
   * ==========================================================
   * MINI-GAME
   * ==========================================================
   */

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* CABEÇALHO */}

      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>🛒</Text>
        </View>

        <Text style={styles.headerLabel}>
          MINI-GAME
        </Text>

        <Text style={styles.headerTitle}>
          COMPRA INTELIGENTE
        </Text>

        <Text style={styles.headerDescription}>
          Compare as opções e escolha onde comprar.
        </Text>
      </View>

      {/* PRODUTO */}

      <View style={styles.productCard}>
        <View style={styles.productIcon}>
          <Text style={styles.productEmoji}>
            {currentProduct.emoji}
          </Text>
        </View>

        <Text style={styles.productLabel}>
          VOCÊ PRECISA COMPRAR
        </Text>

        <Text style={styles.productName}>
          {currentProduct.name}
        </Text>

        <Text style={styles.productQuestion}>
          Qual opção oferece o melhor negócio?
        </Text>
      </View>

      {/* LOJAS */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          🏪 Compare as lojas
        </Text>

        <Text style={styles.sectionSubtitle}>
          Preço não é o único fator!
        </Text>
      </View>

      {currentProduct.stores.map((store) => {
        const isSelected =
          selectedStore === store.name;

        const isRecommended =
          store === bestValue;

        return (
          <TouchableOpacity
            key={store.name}
            activeOpacity={0.8}
            style={[
              styles.storeCard,
              isSelected && styles.storeSelected,
            ]}
            onPress={() =>
              handleStoreSelect(store.name)
            }
          >
            {isRecommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>
                  ⭐ BOA OPÇÃO
                </Text>
              </View>
            )}

            <View style={styles.storeTop}>
              <View style={styles.storeNameContainer}>

                <View
                  style={[
                    styles.radio,
                    isSelected &&
                      styles.radioSelected,
                  ]}
                >
                  {isSelected && (
                    <View style={styles.radioDot} />
                  )}
                </View>

                <Text style={styles.storeName}>
                  {store.name}
                </Text>

              </View>

              <Text style={styles.storePrice}>
                R$ {store.price}
              </Text>
            </View>

            <View style={styles.storeInfoRow}>

              <View style={styles.storeInfoBadge}>
                <Text style={styles.storeInfoEmoji}>
                  ⭐
                </Text>

                <Text style={styles.storeInfoText}>
                  {store.quality}
                </Text>
              </View>

              <View style={styles.storeInfoBadge}>
                <Text style={styles.storeInfoEmoji}>
                  📍
                </Text>

                <Text style={styles.storeInfoText}>
                  {store.distance}
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        );
      })}

      {/* DICAS */}

      <View style={styles.tipBox}>

        <View style={styles.tipHeader}>
          <Text style={styles.tipEmoji}>💡</Text>

          <Text style={styles.tipTitle}>
            DICAS DO CAPITÃO COFRINHO
          </Text>
        </View>

        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>

          <Text style={styles.tipText}>
            O menor preço nem sempre é a melhor escolha.
          </Text>
        </View>

        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>

          <Text style={styles.tipText}>
            Produtos de qualidade podem durar mais.
          </Text>
        </View>

        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>

          <Text style={styles.tipText}>
            Sempre compare antes de comprar.
          </Text>
        </View>

      </View>

      {/* CONFIRMAR */}

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.confirmButton,
          !selectedStore &&
            styles.disabledButton,
        ]}
        disabled={!selectedStore}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>
          {selectedStore
            ? "Escolher esta opção ✓"
            : "Escolha uma opção"}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  /*
   * ==========================================================
   * CONTAINER
   * ==========================================================
   */

  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },

  /*
   * ==========================================================
   * HEADER
   * ==========================================================
   */

  header: {
    backgroundColor: "#003F4A",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#003F4A",
  },

  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D7E900",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  headerEmoji: {
    fontSize: 36,
  },

  headerLabel: {
    color: "#B8CAC7",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 3,
    textAlign: "center",
  },

  headerDescription: {
    color: "#D5E4E1",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
  },

  /*
   * ==========================================================
   * PRODUTO
   * ==========================================================
   */

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D8E2DE",
    padding: 18,
    alignItems: "center",
  },

  productIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#E7F6F2",
    borderWidth: 2,
    borderColor: "#2FBFA0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  productEmoji: {
    fontSize: 42,
  },

  productLabel: {
    color: "#71807B",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  productName: {
    color: "#003F4A",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3,
    textAlign: "center",
  },

  productQuestion: {
    color: "#68787B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },

  /*
   * ==========================================================
   * SEÇÃO
   * ==========================================================
   */

  sectionHeader: {
    paddingHorizontal: 2,
    marginTop: 2,
    marginBottom: 1,
  },

  sectionTitle: {
    color: "#003F4A",
    fontSize: 17,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#71807B",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },

  /*
   * ==========================================================
   * LOJAS
   * ==========================================================
   */

  storeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D8E2DE",
    padding: 14,
    position: "relative",
  },

  storeSelected: {
    backgroundColor: "#F3FBE7",
    borderColor: "#7FC241",
    borderWidth: 3,
  },

  recommendedBadge: {
    position: "absolute",
    top: -8,
    right: 10,
    backgroundColor: "#D7E900",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: "#003F4A",
    zIndex: 2,
  },

  recommendedText: {
    color: "#003F4A",
    fontSize: 8,
    fontWeight: "900",
  },

  storeTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  storeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#AAB9B5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  radioSelected: {
    borderColor: "#7FC241",
  },

  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#7FC241",
  },

  storeName: {
    color: "#003F4A",
    fontSize: 14,
    fontWeight: "900",
    flex: 1,
  },

  storePrice: {
    color: "#2B9D87",
    fontSize: 20,
    fontWeight: "900",
  },

  storeInfoRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 11,
    marginLeft: 31,
  },

  storeInfoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8F6",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  storeInfoEmoji: {
    fontSize: 11,
    marginRight: 4,
  },

  storeInfoText: {
    color: "#68787B",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  /*
   * ==========================================================
   * DICAS
   * ==========================================================
   */

  tipBox: {
    backgroundColor: "#FFF8D6",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5C84B",
    padding: 14,
  },

  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  tipEmoji: {
    fontSize: 20,
    marginRight: 7,
  },

  tipTitle: {
    color: "#5C5A2A",
    fontSize: 11,
    fontWeight: "900",
  },

  tipItem: {
    flexDirection: "row",
    marginBottom: 5,
  },

  tipBullet: {
    color: "#8C8026",
    fontSize: 14,
    fontWeight: "900",
    marginRight: 6,
  },

  tipText: {
    flex: 1,
    color: "#625F3B",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
  },

  /*
   * ==========================================================
   * BOTÃO
   * ==========================================================
   */

  confirmButton: {
    backgroundColor: "#2FBFA0",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#003F4A",
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#003F4A",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  disabledButton: {
    backgroundColor: "#B9C5C2",
    borderColor: "#9BAAA6",
    shadowOpacity: 0,
    elevation: 0,
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  /*
   * ==========================================================
   * RESULTADO
   * ==========================================================
   */

  resultContainer: {
    padding: 16,
    alignItems: "center",
    gap: 12,
  },

  resultHeader: {
    width: "100%",
    backgroundColor: "#003F4A",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  resultEmoji: {
    fontSize: 55,
  },

  resultTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 6,
    textAlign: "center",
  },

  resultSubtitle: {
    color: "#B8CAC7",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  resultCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#D8E2DE",
    padding: 18,
    alignItems: "center",
  },

  resultLabel: {
    color: "#71807B",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  resultStore: {
    color: "#003F4A",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
    textAlign: "center",
  },

  resultPrice: {
    color: "#2FBFA0",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },

  resultInfoRow: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    marginTop: 12,
  },

  resultInfo: {
    flex: 1,
    backgroundColor: "#F5F8F6",
    borderRadius: 10,
    padding: 9,
    alignItems: "center",
  },

  resultInfoLabel: {
    color: "#7A8884",
    fontSize: 9,
    fontWeight: "700",
  },

  resultInfoValue: {
    color: "#003F4A",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
    textTransform: "capitalize",
  },

  successCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7D7",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#8FC55C",
    padding: 13,
  },

  successEmoji: {
    fontSize: 30,
    marginRight: 10,
  },

  successContent: {
    flex: 1,
  },

  successTitle: {
    color: "#426F32",
    fontSize: 13,
    fontWeight: "900",
  },

  successText: {
    color: "#5D7653",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 2,
    fontWeight: "600",
  },

  savingsCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F6F2",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#2FBFA0",
    padding: 13,
  },

  savingsEmoji: {
    fontSize: 30,
    marginRight: 10,
  },

  savingsContent: {
    flex: 1,
  },

  savingsTitle: {
    color: "#267D6D",
    fontSize: 11,
    fontWeight: "900",
  },

  savingsValue: {
    color: "#2B9D87",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 1,
  },

  lessonCard: {
    width: "100%",
    backgroundColor: "#FFF8D6",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E5C84B",
    padding: 14,
  },

  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  lessonEmoji: {
    fontSize: 19,
    marginRight: 6,
  },

  lessonTitle: {
    color: "#5C5A2A",
    fontSize: 13,
    fontWeight: "900",
  },

  lessonText: {
    color: "#625F3B",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
  },

  waitText: {
    color: "#8A9995",
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 2,
  },
});