import socket
from _thread import *
import sys
from game import Game, Player
from random import randint
from uuid import uuid1

server = 'localhost'
port = 5559

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
game = Game()

try:
    s.bind((server, port))
except socket.error as e:
    print(e)

s.listen(2)
print('waiting for a connection, server started')

def threaded_client(conn, p_id):
    while True:
        try:
            conn.send('{}'.format(game.player_count).encode())
            conn.recv(2048)
            conn.send(game.players[p_id].to_message().encode())

            for i in range(10):
                if i == p_id:
                    continue
                conn.recv(2048)
                player = game.players[i]
                msg = player.to_message().encode()
                conn.send(msg)
                
            data = conn.recv(2048)
            
            if not data:
                print('disconnected')
                break
            else:
                msg = data.decode()
                game.players[p_id].from_message(msg)
        except:
            break
        
    print('lost connection')
    conn.close()

for i in range(10):
    player = Player(randint(0, 10), randint(0, 10), (255, 0, 0))
    game.add_player(player)

p_id = 0
while True:
    conn, addr = s.accept()
    print('connected to: ', addr)

    game.player_count += 1
    start_new_thread(threaded_client, (conn, p_id))
    p_id += 1
