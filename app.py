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
    return myList.json()

@app.route('/pop-node')
def popNode():
    myList.pop()
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
    return myList.json()

@app.route('/modify-list')
def modifyList():
    var = request.args.get('var').split('.') # [previous, next]
    expr = request.args.get('expr').split('.') # [current, next]
    print("var: "+".".join(var))
    print("expr: "+".".join(expr))
    right = getattr(myList, expr[0]) if len(expr) == 1 else getattr(getattr(myList, expr[0]), expr[1]) # previous OR previous.next
    oldvalue = getattr(myList, var[0]) if len(var) == 1 else getattr(getattr(myList, var[0]), var[1])
    if(len(var)==1):
        setattr(myList, var[0], right)
    else:
        setattr(getattr(myList,var[0]),"next",right)
    print('about to jsonize list')
    result = json.loads(myList.json())
    print('new list was jsonized')
    result['diff'] = {".".join(var): oldvalue}
    result = json.dumps(result)
    # newDict = myList.dict()
    # newDict['diff'] = {".".join(var): oldvalue}
    # returnVal = json.dumps(newDict, cls=ComplexEncoder, sort_keys=True, indent=4)
    return result
    

if __name__ == "__main__":
    app.run(debug=True)