import math

def floor(x):
    return math.floor(x)

def nroot(n, x):
    return math.pow(x, 1/n)

def reverse(s):
    x = s[::-1]
    return x

def validAnagram(str1, str2):
    sorted_str1 = sorted(str1)
    sorted_str2 = sorted(str2)
    print(sorted_str1)
    print(sorted_str2)

    return sorted_str1 == sorted_str2



def sort(strArr):
    newArr = []
    for str in strArr:
        newArr.append(str[::-1])

    return newArr

    