import pygame
from input_handler import Input
from player import Player
from network import Network

width = 500
height = 500

pygame.init()
win = pygame.display.set_mode((width, height))
pygame.display.set_caption("client")

network = Network()

ih = Input()

players = []
player_count = 1
for i in range(10):
    players.append(Player(0, 0, (0, 0, 255), ih))
    
def update(dt):
    ih.update()
    if ih.quit:
        return False

    pc, data = network.send_recv(players[0])
    global player_count
    player_count = pc
    
    for i in range(1, 10):
        msg = data[i]
        players[i].from_message(msg)
    
    players[0].update(dt)
    return True

def render():
    win.fill((255, 255, 255))
    global player_count
    for i in range(player_count):
        players[i].render(win)
    pygame.display.update()
    
def gameloop():

    clock = pygame.time.Clock()
    clock.tick()
    
    tps = 60
    unprocessed_ticks = 0
    up_count = 0
    second = 0

    run = True

    players = network.connect()
    
    while run:
        dt = clock.get_time() / 1000
        clock.tick()

        second += dt
        unprocessed_ticks += dt * tps
        while unprocessed_ticks >= 1:
            unprocessed_ticks -= 1
            run = update(dt)
            up_count += 1

        render()

        if second >= 1:
            second -= 1
            print(up_count)
            up_count = 0
        
gameloop()
pygame.quit()
