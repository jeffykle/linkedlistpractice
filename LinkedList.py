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
            return tail.next
        else:    
            self.head = Node(value)
            return self.head
            

    def print(self):
        visual = []
        string = ""
        current = self.head
        while(current):
            string+=str(current.value)+" -> "
            current = current.next
            print("Appending directly to the string")
        string += "None"
        if(self.head):
            return {"nodes": string, "attr": f"Head: {self.head.value}, Tail: {self.getTail().value}"}
        else:
            return {"nodes": "none", "attr": f"Head: {None}"}
    
    def __str__(self):
        visual = []
        string = ""
        current = self.head
        while(current):
            string += current.value+" -> "
            current = current.next
        string += "None"
        if(self.head):
            return f"\n{string}\nHead: {self.head.value}, Tail: {self.getTail().value}"
        else:
            return f"\nEmpty list\nHead: {None}"
    

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

    def pop(self):
        current = self.head
        tail = self.getTail()
        prev = None
        while (current and current.next != tail):
            prev = current
            current = current.next
        current.next = None
        return current

    def deleteList(self):
        if(self.head):
            while(self and self.head.next):
                self.pop()
            self.head = None
        return self

if (__name__ == "__main__"):
    myList = LinkedList()
    print(myList)

    listItems = ['A','B','C','D','E','F','G','H','I','J','K']

    for item in listItems:
        myList.insertNode(item)
    print(myList)
    myList.pop()
    print(myList)


    print('\nREVERSE THE LIST!')
    reverseMyList = myList.reverse()
    print(reverseMyList)

    myList.pop()
    print(myList)
    myList.deleteList()
    print(myList)