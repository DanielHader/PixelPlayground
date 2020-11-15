
class Player:
    def __init__(self, x, y, color):
        self.x = x
        self.y = y
        self.direction = 0

    def to_message(self):
        return '{},{},{}'.format(self.x, self.y, self.direction)

    def from_message(self, msg):
        data = msg.split(',')
        self.x = int(data[0])
        self.y = int(data[1])
        self.direction = data[2]

class Game:
    def __init__(self):
        self.players = []
        self.player_count = 0

    def add_player(self, player):
        self.players.append(player)

