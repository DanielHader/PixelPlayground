import pygame
from input_handler import Input

class Player():
    def __init__(self, x, y, color, ih):
        self.x = int(x)
        self.y = int(y)
        self.px = 32 * self.x
        self.py = 32 * self.y
        
        self.color = color
        self.speed = 3
        self.ih = ih

        self.direction = 'up'
        self.state = 'stopped'
        self.running = False
        
        self.frame_timer = 0
        self.walk_frames = 20
        self.run_frames = 10
        self.move_frames = 10
        self.turn_frames = 7

    def to_message(self):
        return '{},{},{}'.format(self.x, self.y, self.direction)

    def from_message(self, msg):
        data = msg.split(',')
        self.x = int(data[0])
        self.y = int(data[1])
        self.px = self.x * 32
        self.py = self.y * 32
        self.direction = data[2]
        
    def render(self, win):
        pygame.draw.rect(win, self.color,  (self.px, self.py, 32, 32))
        if self.direction == 'up':
            pygame.draw.line(win, (0, 0, 0), (self.px+16, self.py+16), (self.px+16, self.py))
        if self.direction == 'left':
            pygame.draw.line(win, (0, 0, 0), (self.px+16, self.py+16), (self.px, self.py+16))
        if self.direction == 'down':
            pygame.draw.line(win, (0, 0, 0), (self.px+16, self.py+16), (self.px+16, self.py+32))
        if self.direction == 'right':
            pygame.draw.line(win, (0, 0, 0), (self.px+16, self.py+16), (self.px+32, self.py+16))

    def update(self, dt):
        if self.state == 'continue':
            if self.ih.last_dir is not None:
                self.direction = self.ih.last_dir
                self.state = 'moving'
                self.move_frames = self.run_frames if self.ih.keys['run'] else self.walk_frames
            else:
                self.state = 'stopped'
                
        if self.state == 'stopped':
            if self.ih.last_dir is not None:
                self.direction = self.ih.last_dir
                self.state = 'turn check'
                
        elif self.state == 'turn check':
            self.frame_timer += 1

            if self.frame_timer == self.turn_frames:
                self.frame_timer = 0
                self.state = 'moving'
                self.move_frames = self.run_frames if self.ih.keys['run'] else self.walk_frames
            
            elif self.ih.last_dir is None:
                self.frame_timer = 0
                self.state = 'stopped'
                
        elif self.state == 'moving':
            self.frame_timer += 1
            
            if self.frame_timer == self.move_frames:
                self.frame_timer = 0
                self.state = 'continue'
                
                if self.direction == 'left':
                    self.x -= 1
                elif self.direction == 'right':
                    self.x += 1
                elif self.direction == 'up':
                    self.y -= 1
                elif self.direction == 'down':
                    self.y += 1
                self.px = 32 * self.x
                self.py = 32 * self.y
            else:
                ratio = self.frame_timer / self.move_frames
                if self.direction == 'left':
                    self.px = 32 * self.x - 32 * ratio
                elif self.direction == 'right':
                    self.px = 32 * self.x + 32 * ratio
                elif self.direction == 'up':
                    self.py = 32 * self.y - 32 * ratio
                elif self.direction == 'down':
                    self.py = 32 * self.y + 32 * ratio
                    
        
