from flask import Flask, render_template, url_for
from LinkedList import *


app = Flask(__name__)


myList = LinkedList()

@app.route('/')
def index():
    return render_template("index.html", myList=myList)

@app.route('/insert-node')
def insertNode():
	if (myList.head):
		myList.insertNode(myList.getTail().value+1)
	else:
		myList.insertNode(0)
	return {"print": myList.print(), "val": myList.getTail().value}

if __name__ == "__main__":
    app.run(debug=True)