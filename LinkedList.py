class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def getTail(self):
        current = self.head
        if(self.head):
            while (current and current.next):
                    current = current.next
        return current

    def insertNode(self, value):
        tail = self.getTail()
        if(self.head):
            tail.next = Node(value)
        else:    
            self.head = Node(value)

    def print(self):
        visual = []
        current = self.head
        while(current):
            visual.append(current.value)
            visual.append("->")
            current = current.next
        visual.append(None)
        print(*visual," ")
        if(self.head):
            print(f"Head: {self.head.value}, Tail: {self.getTail().value}")
        else:
            print(f"Head: {None}")

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

myList = LinkedList()
print('Empty list:')
myList.print()

listItems = ['A','B','C','D','E','F','G','H','I','J','K']

for item in listItems:
    myList.insertNode(item)
myList.print()


print('I reversed my list!')
reverseMyList = myList.reverse()
reverseMyList.print()
