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
        string = ""
        for e in visual:
            string += f"{e} "
        if(self.head):
            return {"nodes": string, "attr": f"Head: {self.head.value}, Tail: {self.getTail().value}"}
        else:
            return {"nodes": "none", "attr": f"Head: {None}"}

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


if (__name__ == "__main__"):
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
