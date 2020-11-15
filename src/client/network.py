from player import Player
import socket

class Network:
    def __init__(self):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server = 'localhost'
        self.port = 5559
        self.addr = (self.server, self.port)
        self.pos = self.connect()

    def connect(self):
        try:
            self.client.connect(self.addr)
        except:
            pass

    def send_recv(self, player):
        try:
            ret = []
            player_count = int(self.client.recv(2048).decode())
            print('received player count of ' + str(player_count))
            for i in range(10):
                self.client.send('gottit'.encode())
                data = self.client.recv(2048).decode()
                ret.append(data)
            if player is None:
                self.client.send('hi')
            else:
                self.client.send(player.to_message().encode())
            return player_count, ret
        except socket.error as e:
            print(e)
