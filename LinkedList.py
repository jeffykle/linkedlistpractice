import json

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
    def json(self):
        next = self.next.value if self.next else None
        return dict(value = self.value, next = next)
    # def json(self):
    #     return json.dumps(self.dict(), cls=ComplexEncoder, sort_keys=True, indent=4)


class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = self.getTail()
        #User controlled attributes:
        self.current = None
        self.previous = None
    
    def getTail(self):
        current = self.head
        if(self.head):
            while (current and current.next):
                    current = current.next
        return current

    def insertNode(self, value):
        if(self.head):
            self.getTail().next = Node(value)
        else:    
            self.head = Node(value)
        return self.selectNode(self.getTail())

    def pop(self):
        current = self.head
        previous = None
        while (current and current.next):
            previous = current
            current = current.next
            print(current.value)
        self.previous = current
        if(previous):
            current = self.current = previous
            print(current.json())
            current.next = None
        else:
            self.head = self.current = current = None
        return current

    def selectNode(self, node):
        self.previous = self.current
        self.current = node
        return self.current

    def deleteList(self):
        # if(self.head):
        while(self.head and self.head.next):
            self.pop()
        self.head = None
        self.current = self.previous = None
        return self

    def reverse(self):
        prev = None
        current = self.head
        while(current):
            next = current.next
            current.next = prev 
            prev = current 
            current = next
        self.head = prev
        return self
    
    def __str__(self):
        string = ""
        current = self.head
        while(current):
            string += str(current.value) + " -> "
            current = current.next
        string += "null"
        return string

    # def attr(self):    ##TODELETE convert to json return
    #     string = ""
    #     current = self.head
    #     while(current):
    #         string += str(current.value)+" -> "
    #         current = current.next
    #     string += "None"
    #     if(self.head):
    #         return {"nodes": string, "attr": f"Head: {self.head.value}, Tail: {self.getTail().value}"}
    #     else:
    #         return {"nodes": "None", "attr": "Head: None, Tail: None"}


    def selectHead(self):
        return self.selectNode(self.head)

    def selectNext(self):
        next = self.selectNode(self.current.next) if self.current.next else None
        return next


    def dict(self):
        return dict(head = self.head, tail = self.getTail(), current = self.current, previous = self.previous, string=self.__str__())

    def json(self):
        return json.dumps(self.dict(), cls=ComplexEncoder, sort_keys=True, indent=4)


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj,'json'):
            return obj.json()
        else:
            return json.JSONEncoder.default(self, obj)


if (__name__ == "__main__"):
    myList = LinkedList()
    print(myList.json())

    listItems = ['A','B','C','D','E','F','G','H','I','J','K']

    for item in listItems:
        myList.insertNode(item)
    print(myList.json())

    print('**Popping a node!**')
    myList.pop()
    print(myList.json())
