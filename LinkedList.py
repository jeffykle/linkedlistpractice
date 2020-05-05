import json

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
    def json(self):
        next = self.next.value if self.next else None
        return dict(value = self.value, next = next)

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = self.getTail()
        self.current = None
        # User controlled attributes:
        self.previous = None
        self.next = None
    
    def getTail(self):
        current = self.head
        previous = None
        i = 0
        if(self.head):
            while (current and current.next):
                i += 1
                print('in tail while loop'+str(i))
                if(current.next is not None and current.next == previous):
                    current = None
                else:
                    previous = current
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
        if(self.current == self.getTail()):
            self.current = None
        if(previous):
            current = previous
            current.next = None
        else:
            self.head = self.current = current = None
        return current

    def selectNode(self, node):
        self.current = node
        return self.current

    def deleteList(self):
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
        previous = None
        while(current):
            string += str(current.value) + " -> "
            if(current.next and current.next == previous):
                # string += "*infinite loop*"
                previous = 'loop'
                current = None
                break
            previous = current
            current = current.next
        string += "null" if previous != 'loop' else"*infinite loop*"
        return string

    def list(self):
        arr = []
        current = self.head
        while(current):
            arr.append(current.value)
            current = current.next
        return arr

    def selectHead(self):
        return self.selectNode(self.head)

    def selectNext(self):
        next = self.selectNode(self.current.next) if self.current and self.current.next else None
        return next

    def dict(self):
        todict = dict()
        # for property, value in vars(self).items():
        #     print(f'setting {property} to {value}')
        #     todict[property] = value

        todict['head'] = self.head
        todict['current'] = self.current
        todict['previous'] = self.previous
        todict['next'] = self.next

        todict['string'] = self.__str__()
        todict['tail'] = self.getTail()
        print('-----> finished dict')
        # try getting rid of str in dict, json, just leave it for the back end, maybe same for tail
        return todict

    def json(self):
        result = json.dumps(self.dict(), cls=ComplexEncoder, sort_keys=True, indent=4)
        print('-----> finished json')
        return result


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
