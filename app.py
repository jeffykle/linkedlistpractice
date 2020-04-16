from flask import Flask, render_template, url_for
from LinkedList import *


app = Flask(__name__)


myList = LinkedList()

@app.route('/')
def index():
    print(myList)
    return render_template("index.html", nodes=myList.attr()['nodes'], attr=myList.attr()['attr'], current=None, previous=None)

@app.route('/insert-node')
def insertNode():
    if (myList.head):
        previous = myList.getTail()
        myList.insertNode(myList.getTail().value+1)
    else:
        previous = Node(None)
        myList.insertNode(0)
    return {"attr": myList.attr(), "current": myList.getTail().dict(), "previous": previous.dict()}

@app.route('/reset-list')
def resetList():
    myList.deleteList()
    return {"attr": myList.attr(), "current": None}

if __name__ == "__main__":
    app.run(debug=True)