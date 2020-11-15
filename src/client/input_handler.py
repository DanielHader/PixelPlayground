import pygame

class Input:
    def __init__(self):
        self.directions = ['up', 'down', 'left', 'right']
        
        self.keys = {
            'up'   : False,
            'down' : False,
            'left' : False,
            'right': False,
            'run': False,
        }

        self.held_dirs = set()
        self.dir_frames = 0
        self.last_dir = None
        self.quit = False

    def update(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.quit = True
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_w:
                    self.keys['up'] = True
                    self.held_dirs.add('up')
                    self.last_dir = 'up'
                elif event.key == pygame.K_a:
                    self.keys['left'] = True
                    self.held_dirs.add('left')
                    self.last_dir = 'left'
                elif event.key == pygame.K_s:
                    self.keys['down'] = True
                    self.held_dirs.add('down')
                    self.last_dir = 'down'
                elif event.key == pygame.K_d:
                    self.keys['right'] = True
                    self.held_dirs.add('right')
                    self.last_dir = 'right'
                elif event.key == pygame.K_SPACE:
                    self.keys['run'] = True
                elif event.key == pygame.K_ESCAPE:
                    self.quit = True
            elif event.type == pygame.KEYUP:
                if event.key == pygame.K_w:
                    self.keys['up'] = False
                    self.held_dirs.remove('up')
                    if self.last_dir == 'up':
                        self.last_dir = None
                elif event.key == pygame.K_a:
                    self.keys['left'] = False
                    self.held_dirs.remove('left')
                    if self.last_dir == 'left':
                        self.last_dir = None
                elif event.key == pygame.K_s:
                    self.keys['down'] = False
                    self.held_dirs.remove('down')
                    if self.last_dir == 'down':
                        self.last_dir = None
                elif event.key == pygame.K_d:
                    self.keys['right'] = False
                    self.held_dirs.remove('right')
                    if self.last_dir == 'right':
                        self.last_dir = None
                elif event.key == pygame.K_SPACE:
                    self.keys['run'] = False
        
        if len(self.held_dirs) > 0:
            if self.last_dir == None:
                self.last_dir = list(self.held_dirs)[0]
            self.dir_frames += 1
        else:
            self.dir_frames = 0
            
