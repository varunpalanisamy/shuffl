import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Mapping of card names to their corresponding image paths
const cardImages = {
  "2_of_clubs": require("./assets/Playing_Cards/2_of_clubs.png"),
  "2_of_diamonds": require("./assets/Playing_Cards/2_of_diamonds.png"),
  "2_of_hearts": require("./assets/Playing_Cards/2_of_hearts.png"),
  "2_of_spades": require("./assets/Playing_Cards/2_of_spades.png"),
  "3_of_clubs": require("./assets/Playing_Cards/3_of_clubs.png"),
  "3_of_diamonds": require("./assets/Playing_Cards/3_of_diamonds.png"),
  "3_of_hearts": require("./assets/Playing_Cards/3_of_hearts.png"),
  "3_of_spades": require("./assets/Playing_Cards/3_of_spades.png"),
  "4_of_clubs": require("./assets/Playing_Cards/4_of_clubs.png"),
  "4_of_diamonds": require("./assets/Playing_Cards/4_of_diamonds.png"),
  "4_of_hearts": require("./assets/Playing_Cards/4_of_hearts.png"),
  "4_of_spades": require("./assets/Playing_Cards/4_of_spades.png"),
  "5_of_clubs": require("./assets/Playing_Cards/5_of_clubs.png"),
  "5_of_diamonds": require("./assets/Playing_Cards/5_of_diamonds.png"),
  "5_of_hearts": require("./assets/Playing_Cards/5_of_hearts.png"),
  "5_of_spades": require("./assets/Playing_Cards/5_of_spades.png"),
  "6_of_clubs": require("./assets/Playing_Cards/6_of_clubs.png"),
  "6_of_diamonds": require("./assets/Playing_Cards/6_of_diamonds.png"),
  "6_of_hearts": require("./assets/Playing_Cards/6_of_hearts.png"),
  "6_of_spades": require("./assets/Playing_Cards/6_of_spades.png"),
  "7_of_clubs": require("./assets/Playing_Cards/7_of_clubs.png"),
  "7_of_diamonds": require("./assets/Playing_Cards/7_of_diamonds.png"),
  "7_of_hearts": require("./assets/Playing_Cards/7_of_hearts.png"),
  "7_of_spades": require("./assets/Playing_Cards/7_of_spades.png"),
  "8_of_clubs": require("./assets/Playing_Cards/8_of_clubs.png"),
  "8_of_diamonds": require("./assets/Playing_Cards/8_of_diamonds.png"),
  "8_of_hearts": require("./assets/Playing_Cards/8_of_hearts.png"),
  "8_of_spades": require("./assets/Playing_Cards/8_of_spades.png"),
  "9_of_clubs": require("./assets/Playing_Cards/9_of_clubs.png"),
  "9_of_diamonds": require("./assets/Playing_Cards/9_of_diamonds.png"),
  "9_of_hearts": require("./assets/Playing_Cards/9_of_hearts.png"),
  "9_of_spades": require("./assets/Playing_Cards/9_of_spades.png"),
  "10_of_clubs": require("./assets/Playing_Cards/10_of_clubs.png"),
  "10_of_diamonds": require("./assets/Playing_Cards/10_of_diamonds.png"),
  "10_of_hearts": require("./assets/Playing_Cards/10_of_hearts.png"),
  "10_of_spades": require("./assets/Playing_Cards/10_of_spades.png"),
  "ace_of_clubs": require("./assets/Playing_Cards/ace_of_clubs.png"),
  "ace_of_diamonds": require("./assets/Playing_Cards/ace_of_diamonds.png"),
  "ace_of_hearts": require("./assets/Playing_Cards/ace_of_hearts.png"),
  "ace_of_spades": require("./assets/Playing_Cards/ace_of_spades.png"),
  "jack_of_clubs": require("./assets/Playing_Cards/jack_of_clubs.png"),
  "jack_of_diamonds": require("./assets/Playing_Cards/jack_of_diamonds.png"),
  "jack_of_hearts": require("./assets/Playing_Cards/jack_of_hearts.png"),
  "jack_of_spades": require("./assets/Playing_Cards/jack_of_spades.png"),
  "queen_of_clubs": require("./assets/Playing_Cards/queen_of_clubs.png"),
  "queen_of_diamonds": require("./assets/Playing_Cards/queen_of_diamonds.png"),
  "queen_of_hearts": require("./assets/Playing_Cards/queen_of_hearts.png"),
  "queen_of_spades": require("./assets/Playing_Cards/queen_of_spades.png"),
  "king_of_clubs": require("./assets/Playing_Cards/king_of_clubs.png"),
  "king_of_diamonds": require("./assets/Playing_Cards/king_of_diamonds.png"),
  "king_of_hearts": require("./assets/Playing_Cards/king_of_hearts.png"),
  "king_of_spades": require("./assets/Playing_Cards/king_of_spades.png")
};

export default function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);

  useEffect(() => {
    fetch('http://172.16.0.7:8000/deal') //CHANGE THIS TO THE IP ADDRESS YOU ARE WORKING ON(just temporary)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging output
        setPlayerHand(data.player_hand);
        setCommunityCards(data.community_cards);
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);
  

  const renderCard = (card, index) => {
    const formattedCard = card
      .toLowerCase()
      .replace(/ of /g, "_of_")  // Ensure exact match with filenames
      .replace(/ /g, "_");       // Replace spaces with underscores
  
    console.log('Formatted card key:', formattedCard); // Debugging output
  
    return (
      <Image
        key={index}
        source={cardImages[formattedCard] || cardImages["2_of_clubs"]}  // Default image fallback
        style={styles.card}
      />
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Cards</Text>
      <View style={styles.community}>
        {communityCards.map((card, index) => renderCard(card, index))}
      </View>
      
      <Text style={styles.title}>Your Hand</Text>
      <View style={styles.playerHand}>
        {playerHand.map((card, index) => renderCard(card, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8D5BA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  community: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  playerHand: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  card: {
    width: 60,  // Smaller card size
    height: 90,  // Smaller card height
    marginHorizontal: 5,  // Space between cards
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  }
});

