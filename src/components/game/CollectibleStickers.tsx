import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

interface Sticker {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: "bronze" | "silver" | "gold" | "special";
  requirement: string;
}

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",

  lightGreen: "#EAF7D7",
  lightBlue: "#E8F7F5",
  lightYellow: "#FFF8D6",
  lightGray: "#F3F6F5",

  gray: "#68787B",
  border: "#DCE6E5",

  bronze: "#C98B55",
  silver: "#AEB9BD",
  gold: "#F2C94C",
  special: "#FF6BA6",
};

export default function CollectibleStickers() {
  const { gameState } = useGame();

  const [newSticker, setNewSticker] = useState("");

  /*
   * ============================================================
   * TODOS OS SELOS
   * ============================================================
   */

  const allStickers: Sticker[] = [
    {
      id: "first_investment",
      name: "Primeira Semente",
      emoji: "🌱",
      description:
        "Plantou sua primeira semente financeira!",
      category: "bronze",
      requirement: "Faça primeiro investimento",
    },

    {
      id: "pet_master",
      name: "Amigo dos Bichos",
      emoji: "🐾",
      description:
        "Cuidou super bem do seu pet!",
      category: "silver",
      requirement: "Pet com 100% saúde",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description:
        "Criou um sonho para alcançar!",
      category: "bronze",
      requirement: "Crie uma meta",
    },

    {
      id: "saver",
      name: "Cofre de Ouro",
      emoji: "💎",
      description:
        "Juntou uma fortuna incrível!",
      category: "gold",
      requirement: "Tenha R$ 100 total",
    },

    {
      id: "helper",
      name: "Anjo da Guarda",
      emoji: "😇",
      description:
        "Ajudou alguém em necessidade!",
      category: "special",
      requirement: "Aceite oportunidade de ajuda",
    },

    {
      id: "resist_temptation",
      name: "Super Forte",
      emoji: "🛡️",
      description:
        "Resistiu a uma tentação difícil!",
      category: "gold",
      requirement: "Recuse oferta tentadora",
    },

    {
      id: "goal_achiever",
      name: "Conquistador",
      emoji: "🏅",
      description:
        "Realizou seu sonho!",
      category: "gold",
      requirement: "Complete sua meta",
    },

    {
      id: "pet_lover",
      name: "Coração Animal",
      emoji: "💝",
      description:
        "Ama muito seu bichinho!",
      category: "silver",
      requirement: "Gaste R$ 50+ com pet",
    },

    {
      id: "smart_spender",
      name: "Cérebro Financeiro",
      emoji: "🧠",
      description:
        "Gastou com muita inteligência!",
      category: "gold",
      requirement: "Balance gastos bem",
    },

    {
      id: "social_butterfly",
      name: "Amizade Dourada",
      emoji: "🦋",
      description:
        "Investiu nas amizades com sabedoria!",
      category: "silver",
      requirement: "Gaste R$ 30-80 com amigos",
    },

    {
      id: "emergency_prepared",
      name: "Sempre Pronto",
      emoji: "🚨",
      description:
        "Enfrentou uma emergência!",
      category: "silver",
      requirement: "Lide com emergência",
    },

    {
      id: "growth_expert",
      name: "Mago do Crescimento",
      emoji: "📈",
      description:
        "Fez o dinheiro crescer magicamente!",
      category: "gold",
      requirement: "Investimento cresceu 20%",
    },

    {
      id: "balanced_life",
      name: "Mestre do Equilíbrio",
      emoji: "⚖️",
      description:
        "Equilibrou tudo perfeitamente!",
      category: "special",
      requirement: "Pet saudável + meta + amigos",
    },

    {
      id: "wise_chooser",
      name: "Sábio das Decisões",
      emoji: "🦉",
      description:
        "Tomou decisões super inteligentes!",
      category: "special",
      requirement: "4+ escolhas sábias",
    },

    {
      id: "generous_heart",
      name: "Coração Gigante",
      emoji: "❤️",
      description:
        "Ajudou muitas pessoas!",
      category: "special",
      requirement: "Ajude 2+ vezes",
    },

    {
      id: "future_planner",
      name: "Vidente Financeiro",
      emoji: "🔮",
      description:
        "Sempre pensou no futuro!",
      category: "special",
      requirement: "Invista consistentemente",
    },
  ];

  /*
   * ============================================================
   * SELOS DESBLOQUEADOS
   * ============================================================
   */

  const unlockedStickers = allStickers.filter(
    (sticker) =>
      gameState.achievements.includes(sticker.id),
  );

  /*
   * ============================================================
   * DETECTAR NOVO SELO
   * ============================================================
   */

  useEffect(() => {
    if (gameState.achievements.length === 0) {
      return;
    }

    const newestId =
      gameState.achievements[
        gameState.achievements.length - 1
      ];

    const newestSticker = allStickers.find(
      (sticker) => sticker.id === newestId,
    );

    if (!newestSticker) {
      return;
    }

    setNewSticker(newestSticker.id);

    const timer = setTimeout(() => {
      setNewSticker("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [gameState.achievements]);

  /*
   * ============================================================
   * CATEGORIAS
   * ============================================================
   */

  const categories = [
    {
      key: "bronze" as const,
      label: "PRIMEIROS PASSOS",
      color: COLORS.bronze,
      background: "#FFF2E6",
    },

    {
      key: "silver" as const,
      label: "CONQUISTAS",
      color: COLORS.silver,
      background: "#F1F5F6",
    },

    {
      key: "gold" as const,
      label: "GRANDES CONQUISTAS",
      color: COLORS.gold,
      background: "#FFF8D6",
    },

    {
      key: "special" as const,
      label: "SELOS ESPECIAIS",
      color: COLORS.special,
      background: "#FFF0F6",
    },
  ];

  const progress =
    (unlockedStickers.length / allStickers.length) * 100;

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

        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>
            🏷️
          </Text>
        </View>

        <View style={styles.headerTextArea}>

          <Text style={styles.title}>
            COLEÇÃO DE SELOS
          </Text>

          <Text style={styles.subtitle}>
            Complete sua coleção!
          </Text>

        </View>

        <View style={styles.counterBadge}>

          <Text style={styles.counterValue}>
            {unlockedStickers.length}
          </Text>

          <Text style={styles.counterTotal}>
            / {allStickers.length}
          </Text>

        </View>

      </View>

      {/* ======================================================
          PROGRESSO
          ====================================================== */}

      <View style={styles.progressSection}>

        <View style={styles.progressHeader}>

          <Text style={styles.progressLabel}>
            SUA COLEÇÃO
          </Text>

          <Text style={styles.progressPercent}>
            {Math.round(progress)}%
          </Text>

        </View>

        <View style={styles.progressBar}>

          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />

        </View>

      </View>

      {/* ======================================================
          NOVO SELO
          ====================================================== */}

      {newSticker !== "" && (
        <View style={styles.newStickerBox}>

          <View style={styles.newStickerIcon}>

            <Text style={styles.newStickerEmoji}>
              {
                allStickers.find(
                  (s) => s.id === newSticker,
                )?.emoji
              }
            </Text>

          </View>

          <View style={styles.newStickerContent}>

            <Text style={styles.newStickerTitle}>
              🎉 NOVO SELO!
            </Text>

            <Text style={styles.newStickerName}>
              {
                allStickers.find(
                  (s) => s.id === newSticker,
                )?.name
              }
            </Text>

          </View>

        </View>
      )}

      {/* ======================================================
          CATEGORIAS
          ====================================================== */}

      {categories.map((category) => {
        const stickers = unlockedStickers.filter(
          (sticker) =>
            sticker.category === category.key,
        );

        const totalInCategory = allStickers.filter(
          (sticker) =>
            sticker.category === category.key,
        ).length;

        return (
          <View
            key={category.key}
            style={[
              styles.categoryBox,
              {
                backgroundColor: category.background,
              },
            ]}
          >

            {/* CABEÇALHO DA CATEGORIA */}

            <View style={styles.categoryHeader}>

              <View
                style={[
                  styles.categoryDot,
                  {
                    backgroundColor: category.color,
                  },
                ]}
              />

              <Text style={styles.categoryTitle}>
                {category.label}
              </Text>

              <View style={styles.categoryCount}>

                <Text style={styles.categoryCountText}>
                  {stickers.length}/{totalInCategory}
                </Text>

              </View>

            </View>

            {/* SELOS */}

            {stickers.length > 0 ? (
              <View style={styles.stickerGrid}>

                {stickers.map((sticker) => (
                  <View
                    key={sticker.id}
                    style={styles.stickerItem}
                  >

                    <View
                      style={[
                        styles.stickerCircle,
                        {
                          borderColor:
                            category.color,
                        },
                      ]}
                    >

                      <Text
                        style={styles.stickerEmoji}
                      >
                        {sticker.emoji}
                      </Text>

                    </View>

                    <Text
                      style={styles.stickerName}
                      numberOfLines={2}
                    >
                      {sticker.name}
                    </Text>

                  </View>
                ))}

              </View>
            ) : (
              <View style={styles.emptyBox}>

                <View style={styles.lockCircle}>
                  <Text style={styles.lockEmoji}>
                    🔒
                  </Text>
                </View>

                <View>

                  <Text style={styles.emptyTitle}>
                    Ainda não tem nenhum selo
                  </Text>

                  <Text style={styles.emptyText}>
                    Continue sua aventura para desbloquear!
                  </Text>

                </View>

              </View>
            )}

          </View>
        );
      })}

      {/* ======================================================
          COLEÇÃO COMPLETA
          ====================================================== */}

      {unlockedStickers.length ===
        allStickers.length && (
        <View style={styles.masterBox}>

          <View style={styles.masterCircle}>

            <Text style={styles.masterEmoji}>
              👑
            </Text>

          </View>

          <Text style={styles.masterTitle}>
            COLECIONADOR SUPREMO!
          </Text>

          <Text style={styles.masterText}>
            Você desbloqueou todos os selos!
          </Text>

          <Text style={styles.masterSubtext}>
            Que aventura incrível! 🌟
          </Text>

        </View>
      )}

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

    padding: 10,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    overflow: "hidden",
  },

  /*
   * ==========================================================
   * CABEÇALHO
   * ==========================================================
   */

  header: {
    backgroundColor: COLORS.navy,

    borderRadius: 17,

    padding: 10,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 10,
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
    fontSize: 23,
  },

  headerTextArea: {
    flex: 1,
  },

  title: {
    color: COLORS.yellow,

    fontSize: 14,

    fontWeight: "900",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    fontSize: 9,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

  counterBadge: {
    backgroundColor: COLORS.white,

    minWidth: 46,

    height: 40,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",

    paddingHorizontal: 7,
  },

  counterValue: {
    color: COLORS.navy,

    fontSize: 17,

    fontWeight: "900",

    includeFontPadding: false,
  },

  counterTotal: {
    color: COLORS.gray,

    fontSize: 10,

    fontWeight: "800",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * PROGRESSO
   * ==========================================================
   */

  progressSection: {
    backgroundColor: COLORS.lightGray,

    borderRadius: 14,

    padding: 9,

    marginBottom: 9,
  },

  progressHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 5,
  },

  progressLabel: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  progressPercent: {
    color: COLORS.green,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  progressBar: {
    width: "100%",

    height: 10,

    backgroundColor: "#DDE5E3",

    borderRadius: 999,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    backgroundColor: COLORS.green,

    borderRadius: 999,
  },

  /*
   * ==========================================================
   * NOVO SELO
   * ==========================================================
   */

  newStickerBox: {
    backgroundColor: COLORS.yellow,

    borderRadius: 16,

    borderWidth: 2,

    borderColor: COLORS.navy,

    padding: 9,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 9,
  },

  newStickerIcon: {
    width: 46,

    height: 46,

    borderRadius: 23,

    backgroundColor: COLORS.white,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 9,
  },

  newStickerEmoji: {
    fontSize: 26,
  },

  newStickerContent: {
    flex: 1,
  },

  newStickerTitle: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  newStickerName: {
    color: COLORS.navy,

    fontSize: 13,

    fontWeight: "900",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * CATEGORIA
   * ==========================================================
   */

  categoryBox: {
    borderRadius: 16,

    padding: 9,

    marginBottom: 8,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  categoryHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  categoryDot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    marginRight: 6,
  },

  categoryTitle: {
    flex: 1,

    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "900",

    includeFontPadding: false,
  },

  categoryCount: {
    backgroundColor: COLORS.white,

    borderRadius: 10,

    paddingHorizontal: 7,

    paddingVertical: 3,
  },

  categoryCountText: {
    color: COLORS.gray,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * GRID DE SELOS
   * ==========================================================
   */

  stickerGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "center",

    gap: 8,
  },

  stickerItem: {
    width: 72,

    alignItems: "center",
  },

  stickerCircle: {
    width: 58,

    height: 58,

    borderRadius: 29,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 4,
  },

  stickerEmoji: {
    fontSize: 28,
  },

  stickerName: {
    width: "100%",

    color: COLORS.navy,

    fontSize: 7.5,

    lineHeight: 10,

    fontWeight: "800",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * VAZIO
   * ==========================================================
   */

  emptyBox: {
    backgroundColor: COLORS.white,

    borderRadius: 12,

    padding: 8,

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  lockCircle: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.lightGray,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 8,
  },

  lockEmoji: {
    fontSize: 15,
  },

  emptyTitle: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "900",

    includeFontPadding: false,
  },

  emptyText: {
    color: COLORS.gray,

    fontSize: 7.5,

    fontWeight: "600",

    marginTop: 2,

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * COLEÇÃO COMPLETA
   * ==========================================================
   */

  masterBox: {
    backgroundColor: COLORS.yellow,

    borderRadius: 18,

    borderWidth: 2,

    borderColor: COLORS.navy,

    padding: 14,

    alignItems: "center",

    marginTop: 2,
  },

  masterCircle: {
    width: 58,

    height: 58,

    borderRadius: 29,

    backgroundColor: COLORS.white,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 7,
  },

  masterEmoji: {
    fontSize: 31,
  },

  masterTitle: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  masterText: {
    color: COLORS.navy,

    fontSize: 9,

    fontWeight: "700",

    marginTop: 3,

    textAlign: "center",

    includeFontPadding: false,
  },

  masterSubtext: {
    color: COLORS.navy,

    fontSize: 8,

    fontWeight: "600",

    marginTop: 2,

    textAlign: "center",

    includeFontPadding: false,
  },

});