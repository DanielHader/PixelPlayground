import tkinter as tk
import tkinter.filedialog

from PIL import ImageTk, Image

class ResizableCanvas(tk.Frame):
    def __init__(self, master=None, width=200, height=200):
        super().__init__(master)
        self.master = master

        self.canvas = tk.Canvas(self, width=width, height=height, bg='white')
        self.canvas.grid(row=0, column = 0, sticky='nsew')
        self.canvas.config(scrollregion=self.canvas.bbox('all'))

        self.hsb = tk.Scrollbar(self, orient='horizontal')
        self.hsb.grid(row=1, column=0, sticky='ew')

        self.vsb = tk.Scrollbar(self, orient='vertical')
        self.vsb.grid(row=0, column=1, sticky='ns')
        
        self.rowconfigure(0, weight=1)
        self.columnconfigure(0, weight=1)

    def onResize(self, event):
        self.config(width=self.width, height=self.height)
        self.canvas.config(scrollregion=self.canvas.bbox('all'))

class AnimationPane(tk.PanedWindow):
    def __init__(self, master=None):
        super().__init__(master, orient='vertical', sashrelief='groove')
        self.master = master

        self.canvas = ResizableCanvas(master=self, width=200, height=200)
        self.framesFrame = tk.Frame(self)
        self.animationsFrame = tk.Frame(self)

        self.add(self.canvas, stretch='last')
        self.add(self.framesFrame, stretch='always')
        self.add(self.animationsFrame, stretch='always')
        
        
class App(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack(expand=True, fill='both')

        self.menubar = tk.Menu(master)
        self.filemenu = tk.Menu(self.menubar, tearoff=0)
        self.filemenu.add_command(label='New', command=self.onNew)
        self.filemenu.add_command(label='Open', command=self.onOpen)
        self.filemenu.add_command(label='Save')
        self.filemenu.add_command(label='Save As')
        self.filemenu.add_separator()
        self.filemenu.add_command(label='Exit')
        self.menubar.add_cascade(label='File', menu=self.filemenu)

        self.helpmenu = tk.Menu(self.menubar, tearoff=0)
        self.helpmenu.add_command(label='About')
        self.menubar.add_cascade(label='Help', menu=self.helpmenu)
        master.config(menu=self.menubar)
        
        self.content = tk.PanedWindow(self, orient='horizontal')
        self.content.grid(row=0, column=0, sticky='nsew')
        
        self.messageLabel = tk.Label(self, text='messages here')
        self.messageLabel.grid(row=1, column=0, sticky='ew')

        self.rowconfigure(0, weight=1)
        self.columnconfigure(0, weight=1)
        
        self.sheetCanvas = ResizableCanvas(master=self.content, width=600, height=600)
        self.animationPane = AnimationPane(self)

        self.content.add(self.sheetCanvas, stretch='always')
        self.content.add(self.animationPane, stretch='always')

    def onNew(self):
        title = 'Select image or metadata file'
        filetypes = (('image files', '*.jpg *.jpeg *.png'))
        filename = tkinter.filedialog.askopenfilename(title=title, filetypes=filetypes)

        img = ImageTk.PhotoImage(Image.open(filename))
        self.sheetCanvas.canvas.create_image(0, 0, anchor='nw', image=img)
        self.master.mainloop()
        
    def onOpen(self):
        pass

        
root = tk.Tk()
app = App(master=root)
app.mainloop()
