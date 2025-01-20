class Player:
    def __init__(self, player_id, name):
        self.player_id = player_id
        self.name = name
        self.hand = []

    def set_hand(self, hand):
        self.hand = hand
