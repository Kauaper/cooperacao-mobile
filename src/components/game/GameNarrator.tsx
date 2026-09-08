import { useEffect, useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

const COLORS = {
  turquoise: "#08AEA4",
  navy: "#003F4A",
  yellow: "#D7E900",
  green: "#7FC241",
  white: "#FFFFFF",
  lightGray: "#F1F1F1",
  gray: "#D8D8D8",
  darkGray: "#68787B",
};

interface GameNarratorProps {
  onComplete: () => void;
}

export default function GameNarrator({
  onComplete,
}: GameNarratorProps) {
  const { gameState } = useGame();

  const [currentDialogIndex, setCurrentDialogIndex] =
    useState(0);

  /*
   * ============================================================
   * PETS
   * ============================================================
   */

  const pets = {
    dog: {
      name: "cachorrinho",
      emoji: "🐶",
      image: require("@/assets/images/pets/dog.png"),
    },

    cat: {
      name: "gatinho",
      emoji: "🐱",
      image: require("@/assets/images/pets/cat.png"),
    },

    hamster: {
      name: "hamster",
      emoji: "🐹",
      image: require("@/assets/images/pets/hamster.png"),
    },

    fish: {
      name: "peixinho",
      emoji: "🐠",
      image: require("@/assets/images/pets/fish.png"),
    },

    bird: {
      name: "passarinho",
      emoji: "🐦",
      image: require("@/assets/images/pets/bird.png"),
    },

    turtle: {
      name: "tartaruga",
      emoji: "🐢",
      image: require("@/assets/images/pets/turtle.png"),
    },
  };

  /*
   * ============================================================
   * PERSONAGENS
   * ============================================================
   */

  const characters = {
    girl1: {
      image: require("@/assets/images/characters/girl1.png"),
    },

    boy1: {
      image: require("@/assets/images/characters/boy1.png"),
    },

    girl2: {
      image: require("@/assets/images/characters/girl2.png"),
    },

    boy2: {
      image: require("@/assets/images/characters/boy2.png"),
    },

    girl3: {
      image: require("@/assets/images/characters/girl3.png"),
    },

    boy3: {
      image: require("@/assets/images/characters/boy3.png"),
    },
  };

  const pet =
    pets[
      gameState.selectedPet as keyof typeof pets
    ];

  const character =
    characters[
      gameState.selectedCharacter as keyof typeof characters
    ];

  /*
   * ============================================================
   * HISTÓRIA
   * ============================================================
   */

  const getChapterStory = () => {
    const stories = [
      {
        title: "CAPÍTULO 1",
        subtitle: "A GRANDE AVENTURA COMEÇA",

        dialogs: [
          `Olá ${gameState.playerName}! Eu sou o Capitão Cofrinho, seu guia nesta aventura incrível!`,

          `Você acabou de adotar seu ${pet?.name} e ele está super animado para conhecer você!`,

          `Você ganhou R$ ${gameState.monthlyIncome} este mês. Agora vamos aprender os segredos do dinheiro juntos!`,

          `Lembre-se: seu bichinho conta com você todos os meses. Ele precisa de comida, carinho e cuidados!`,
        ],

        lesson:
          "Todo dinheiro que ganhamos tem responsabilidades que vêm junto!",
      },

      {
        title: "CAPÍTULO 2",
        subtitle: "PRIMEIRAS TENTAÇÕES",

        dialogs: [
          `${gameState.playerName}, você está indo muito bem!`,

          `Mas olha só... apareceu algo muito tentador para comprar este mês!`,

          `Sempre pense duas vezes antes de gastar.`,

          `Às vezes é melhor esperar e guardar dinheiro.`,
        ],

        lesson:
          "Resistir às tentações nos torna mais fortes!",
      },

      {
        title: "CAPÍTULO 3",
        subtitle: "AMIZADES E DECISÕES",

        dialogs: [
          `Uau! Você chegou ao terceiro mês!`,

          `Agora você vai aprender sobre equilibrar diversão e responsabilidades.`,

          `Seu ${pet?.name} também precisa de atenção.`,

          `Bons amigos entendem quando precisamos economizar.`,
        ],

        lesson:
          "Equilíbrio é a chave da felicidade!",
      },

      {
        title: "CAPÍTULO 4",
        subtitle: "O PODER DE AJUDAR",

        dialogs: [
          `${gameState.playerName}, você está se tornando um expert em dinheiro!`,

          `Este mês você vai descobrir algo mágico: ajudar pessoas também pode gerar oportunidades.`,

          `Trabalhar e ajudar traz felicidade e aprendizado.`,

          `Seu ${pet?.name} fica orgulhoso quando você faz boas ações!`,
        ],

        lesson:
          "Ajudar os outros sempre vale a pena!",
      },

      {
        title: "CAPÍTULO 5",
        subtitle: "DOCES TENTAÇÕES",

        dialogs: [
          `Chegamos na metade da aventura!`,

          `Mas cuidado... existe uma tentação muito doce esperando por você.`,

          `Seu ${pet?.name} torce para que você tome a melhor decisão.`,

          `Nem tudo que queremos agora é o melhor para o futuro.`,
        ],

        lesson:
          "Prazer imediato nem sempre é a melhor escolha.",
      },

      {
        title: "CAPÍTULO 6",
        subtitle: "RESPONSABILIDADES CRESCEM",

        dialogs: [
          `${gameState.playerName}, você está crescendo!`,

          `E junto com o crescimento vêm responsabilidades.`,

          `Alguns gastos são necessários, mesmo quando não queremos.`,

          `Seu ${pet?.name} entende isso muito bem.`,
        ],

        lesson:
          "Precisamos diferenciar necessidade de desejo.",
      },

      {
        title: "CAPÍTULO 7",
        subtitle: "TALENTOS QUE RENDEM",

        dialogs: [
          `Você está dominando o mundo das finanças!`,

          `Agora vai descobrir como talentos podem gerar dinheiro.`,

          `Todo mundo possui habilidades especiais.`,

          `Seu ${pet?.name} adora ver você evoluindo!`,
        ],

        lesson:
          "Nossos talentos podem abrir oportunidades incríveis.",
      },

      {
        title: "CAPÍTULO 8",
        subtitle: "MODA VS NECESSIDADE",

        dialogs: [
          `${gameState.playerName}, você está quase virando um mestre financeiro!`,

          `Este mês o desafio é distinguir aparência de necessidade.`,

          `Será que precisamos de tudo que achamos bonito?`,

          `Seu ${pet?.name} gosta de você exatamente como é.`,
        ],

        lesson:
          "Autoestima vale mais que qualquer produto.",
      },

      {
        title: "CAPÍTULO 9",
        subtitle: "AVENTURAS E AMIZADES",

        dialogs: [
          `Uau! Você chegou ao nono mês!`,

          `Agora é hora de aprender sobre experiências e amizades.`,

          `Memórias felizes são tesouros que ninguém pode roubar.`,

          `Seu ${pet?.name} gosta quando você se diverte com responsabilidade.`,
        ],

        lesson:
          "Investir em experiências também é importante.",
      },

      {
        title: "CAPÍTULO 10",
        subtitle: "HONESTIDADE RECOMPENSA",

        dialogs: [
          `${gameState.playerName}, você está quase terminando sua jornada!`,

          `Este mês você aprenderá sobre honestidade.`,

          `Fazer a coisa certa nem sempre é fácil.`,

          `Mas honestidade sempre vale a pena.`,
        ],

        lesson:
          "Honestidade é um dos maiores tesouros que existe.",
      },

      {
        title: "CAPÍTULO 11",
        subtitle: "GENEROSIDADE",

        dialogs: [
          `Penúltimo capítulo da aventura!`,

          `Agora vamos falar sobre generosidade.`,

          `Dividir o que temos multiplica a felicidade.`,

          `Seu ${pet?.name} sente o amor que você espalha pelo mundo.`,
        ],

        lesson:
          "Generosidade é um superpoder.",
      },

      {
        title: "CAPÍTULO 12",
        subtitle: "O GRANDE FINAL",

        dialogs: [
          `${gameState.playerName}, chegou o último mês!`,

          `Você se tornou um verdadeiro mestre financeiro.`,

          `É hora de celebrar tudo que aprendeu.`,

          `Seu ${pet?.name} está muito orgulhoso de você!`,
        ],

        lesson:
          "O maior tesouro é tudo que você aprendeu durante a jornada.",
      },
    ];

    return (
      stories[
        gameState.currentMonth - 1
      ] || stories[0]
    );
  };

  const story = getChapterStory();

  const currentDialog =
    story.dialogs[currentDialogIndex];

  /*
   * ============================================================
   * GARANTIR QUE O ÍNDICE NÃO ESTOURE AO MUDAR DE CAPÍTULO
   * ============================================================
   */

  useEffect(() => {
    setCurrentDialogIndex(0);
  }, [gameState.currentMonth]);

  /*
   * ============================================================
   * AVANÇAR
   * ============================================================
   */

  const handleNextDialog = () => {
    if (
      currentDialogIndex <
      story.dialogs.length - 1
    ) {
      setCurrentDialogIndex(
        (prev) => prev + 1,
      );
    } else {
      onComplete();
    }
  };

  /*
   * ============================================================
   * PULAR
   * ============================================================
   */

  const handleSkip = () => {
    onComplete();
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <View style={styles.container}>

      {/* ======================================================
          CARD PRINCIPAL
          ====================================================== */}

      <View style={styles.card}>

        {/* ====================================================
            CABEÇALHO
            ==================================================== */}

        <View style={styles.header}>

          {/* PERSONAGEM */}

          <View style={styles.characterCircle}>

            {character?.image && (
              <Image
                source={character.image}
                style={styles.characterImage}
                resizeMode="contain"
              />
            )}

          </View>

          {/* CORAÇÃO */}

          <View style={styles.heartCircle}>

            <Text style={styles.heart}>
              ❤️
            </Text>

          </View>

          {/* PET */}

          <View style={styles.petCircle}>

            {pet?.image && (
              <Image
                source={pet.image}
                style={styles.petImage}
                resizeMode="contain"
              />
            )}

          </View>

        </View>

        {/* ====================================================
            TÍTULO
            ==================================================== */}

        <View style={styles.chapterBadge}>

          <Text
            style={styles.chapterBadgeText}
          >
            {story.title}
          </Text>

        </View>

        <Text style={styles.subtitle}>
          {story.subtitle}
        </Text>

        {/* ====================================================
            BALÃO
            ==================================================== */}

        <View style={styles.dialogBox}>

          <Text style={styles.dialogText}>
            {currentDialog}
          </Text>

        </View>

        {/* ====================================================
            BOLINHAS
            ==================================================== */}

        <View style={styles.dotsContainer}>

          {story.dialogs.map(
            (_, index) => {

              const active =
                index ===
                currentDialogIndex;

              const completed =
                index <
                currentDialogIndex;

              return (
                <View
                  key={index}
                  style={[
                    styles.dot,

                    active &&
                      styles.activeDot,

                    completed &&
                      styles.completedDot,
                  ]}
                />
              );
            },
          )}

        </View>

        {/* ====================================================
            LIÇÃO
            ==================================================== */}

        {currentDialogIndex ===
          story.dialogs.length - 1 && (
          <View
            style={styles.lessonBox}
          >

            <Text
              style={
                styles.lessonTitle
              }
            >
              🎯 LIÇÃO DO CAPÍTULO
            </Text>

            <Text
              style={styles.lessonText}
            >
              {story.lesson}
            </Text>

          </View>
        )}

        {/* ====================================================
            BOTÕES
            ==================================================== */}

        <View style={styles.buttons}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSkip}
            style={styles.skipButton}
          >

            <Text
              style={styles.skipText}
            >
              PULAR
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              handleNextDialog
            }
            style={styles.nextButton}
          >

            <Text
              style={styles.nextText}
            >
              {currentDialogIndex <
              story.dialogs.length - 1
                ? "CONTINUAR"
                : "COMEÇAR MÊS"}
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
   * TELA
   * ==========================================================
   */

  container: {
    flex: 1,

    backgroundColor: COLORS.turquoise,

    paddingHorizontal: 14,
    paddingVertical: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * ==========================================================
   * CARD
   * ==========================================================
   */

  card: {
    width: "100%",

    maxWidth: 360,

    backgroundColor: COLORS.navy,

    borderRadius: 26,

    padding: 10,

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

    minHeight: 125,

    backgroundColor: COLORS.white,

    borderRadius: 20,

    borderWidth: 2,

    borderColor: COLORS.yellow,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 18,

    marginBottom: 9,
  },

  characterCircle: {
    width: 86,

    height: 86,

    borderRadius: 43,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  characterImage: {
    width: 76,

    height: 76,
  },

  heartCircle: {
    width: 45,

    height: 45,

    borderRadius: 23,

    backgroundColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: -6,

    zIndex: 5,
  },

  heart: {
    fontSize: 21,
  },

  petCircle: {
    width: 86,

    height: 86,

    borderRadius: 43,

    backgroundColor: COLORS.white,

    borderWidth: 3,

    borderColor: COLORS.yellow,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  petImage: {
    width: 75,

    height: 75,
  },

  /*
   * ==========================================================
   * CAPÍTULO
   * ==========================================================
   */

  chapterBadge: {
    backgroundColor: COLORS.yellow,

    borderRadius: 20,

    paddingHorizontal: 20,

    paddingVertical: 7,

    marginTop: 1,
  },

  chapterBadgeText: {
    color: COLORS.navy,

    fontSize: 14,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  subtitle: {
    color: COLORS.white,

    fontSize: 11,

    fontWeight: "900",

    textAlign: "center",

    marginTop: 5,

    marginBottom: 8,

    textTransform: "uppercase",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * DIÁLOGO
   * ==========================================================
   */

  dialogBox: {
    width: "100%",

    minHeight: 125,

    backgroundColor: COLORS.white,

    borderRadius: 28,

    paddingHorizontal: 20,
    paddingVertical: 18,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 6,
  },

  dialogText: {
    color: COLORS.navy,

    fontSize: 15,

    lineHeight: 20,

    fontWeight: "700",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOLINHAS
   * ==========================================================
   */

  dotsContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    height: 28,

    marginTop: 2,
  },

  dot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    backgroundColor: COLORS.white,

    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: COLORS.yellow,

    transform: [
      {
        scale: 1.25,
      },
    ],
  },

  completedDot: {
    backgroundColor: COLORS.green,
  },

  /*
   * ==========================================================
   * LIÇÃO
   * ==========================================================
   */

  lessonBox: {
    width: "100%",

    backgroundColor: "#F1F8E6",

    borderWidth: 2,

    borderColor: COLORS.green,

    borderRadius: 18,

    padding: 12,

    marginTop: 5,

    marginBottom: 9,
  },

  lessonTitle: {
    color: COLORS.navy,

    fontSize: 12,

    fontWeight: "900",

    textAlign: "center",

    marginBottom: 5,

    includeFontPadding: false,
  },

  lessonText: {
    color: COLORS.navy,

    fontSize: 11,

    lineHeight: 16,

    fontWeight: "600",

    textAlign: "center",

    includeFontPadding: false,
  },

  /*
   * ==========================================================
   * BOTÕES
   * ==========================================================
   */

  buttons: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    gap: 8,

    marginTop: 3,
  },

  skipButton: {
    flex: 1,

    minHeight: 42,

    backgroundColor: COLORS.white,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,
  },

  skipText: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },

  nextButton: {
    flex: 1.4,

    minHeight: 42,

    backgroundColor: COLORS.yellow,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,
  },

  nextText: {
    color: COLORS.navy,

    fontSize: 10,

    fontWeight: "900",

    textAlign: "center",

    includeFontPadding: false,
  },
});