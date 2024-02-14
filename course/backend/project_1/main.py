import sys

food = input('What is your favorite food?\n')
sys.stdout.flush()
food = sys.stdin.buffer.readline()
print('Thanks for letting me know your favorite food is ' + food.decode())
