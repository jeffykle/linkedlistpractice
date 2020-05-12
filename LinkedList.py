import json

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def json(self):
        next = self.next.value if self.next else None
        return dict(value = self.value, next = next)

    def __eq__(self, other):
            a = self.value if self else self
            b = other.value if other else other
            return a == b

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.current = None
        self.previous = None
        self.next = None
    

    def getTail(self):
        history = []
        current = self.head
        while (current and current.next):
            history.append(current)
            for h in history:
                if(current.next == h):
                    return current
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
        if(previous):
            if(self.current == current):
                self.current = previous
            current = previous
            current.next = None
        else:
            self.head = self.current = current = None
        return current

    def selectNode(self, node):
        self.current = node
        return self.current

    def deleteList(self):
        self.head = self.current = self.previous = self.next = None
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
        tail = self.getTail()

        while(current != tail):
            string += str(current.value) + " -> "
            previous = current
            current = current.next
        string += str(current.value)+" -> null"  if current else "null"
        return string

    def list(self):
        history = []
        result = []
        current = self.head
        while(current and current.next):
            result.append(current.value)
            history.append(current)
            for h in history:
                if(current.next == h):
                    result.append(current.next.value)
                    return result
            current = current.next
        result.append(current.value if current else current)
        return result

    def selectHead(self):
        return self.selectNode(self.head)

    def selectNext(self):
        next = self.selectNode(self.current.next) if self.current and self.current.next else None
        return next

    def dict(self):
        result = dict()
        result['head'] = self.head
        result['current'] = self.current
        result['previous'] = self.previous
        result['next'] = self.next
        result['tail'] = self.getTail()
        return result

    def json(self):
        result = json.dumps(self.dict(), cls=ComplexEncoder, sort_keys=True, indent=4)
        return result


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj,'json'):
            return obj.json()
        else:
            return json.JSONEncoder.default(self, obj)


if __name__ == '__main__':
    
    ll = LinkedList()
    print(ll)
    nums = [0,1,2,3,4,5]
    for n in nums:
        ll.insertNode(n)
    print(ll)

    t = ll.getTail()
    print(ll)
    print(ll.getTail().value)