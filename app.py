from flask import Flask, jsonify, render_template, request, url_for
from LinkedList import *


app = Flask(__name__)


myList = LinkedList()

@app.route('/')
def index():
    array = {
        'array': myList.list()
    }
    return render_template("index.html", myList = myList, array = array)

@app.route('/insert-node')
def insertNode():
    myList.insertNode(myList.getTail().value + 1 if myList.head else 0)
    print(myList.json())
    return myList.json()

@app.route('/pop-node')
def popNode():
    myList.pop()
    print(myList.json())
    return myList.json()

@app.route('/get-head')
def getHead():
    myList.current = myList.head
    return myList.json()

@app.route('/get-next')
def getNext():
    myList.selectNext()
    return myList.json()

@app.route('/get-list')
def getList():
    return myList.json()

@app.route('/delete-list')
def deleteList():
    myList.deleteList()
    print(myList.json())
    return myList.json()

@app.route('/modify-list')
def modifyList():
    prevList = myList.dict()
    var = request.args.get('var').split('.')
    expr = request.args.get('expr').split('.')
    left = '.'.join(var)
    right = getattr(myList, expr[0]) if len(expr) == 1 else getattr(getattr(myList, expr[0]), expr[1])
    print(f'{left} = {right}')
    setattr(myList, left, right)
    print(myList.json())
    return myList.diff(prevList)

if __name__ == "__main__":
    app.run(debug=True)