import random

class CardDeck:
    def __init__(self):
        self.suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        self.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        self.deck = [f"{rank} of {suit}" for suit in self.suits for rank in self.ranks]
        random.shuffle(self.deck)

    def deal_hand(self, num_cards=2):
        return [self.deck.pop() for _ in range(num_cards)]

    def deal_community_cards(self, num_cards=5):
        return [self.deck.pop() for _ in range(num_cards)]
