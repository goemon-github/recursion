import sys
import random




def checkMinMaxNumber(min, max):
    if (min > max):
        return False 
    else:
        return True

def checkGuessTheNumber(correct_number, min, max):
    while True:
        user_guess = input(f'{min}-{max}の間で正解の数字を推測してください(数字のみです）\n')
        if not user_guess.isdigit():
            print('数字のみです')
            continue

        user_guess = int(user_guess)
        if correct_number == user_guess:
            print('正解です\n') 
            break
        elif correct_number > user_guess:
            print('小さいです\n')
        else:
            print('大きいです\n')


def startGame():
    while True:
        max_number = input('最大の数字を入力してください\n')
        min_number = input('最小の数字を入力してください\n')
        if not (min_number.isdigit() and max_number.isdigit()):
            print('数字のみです')
            continue



        max_number = int(max_number)
        min_number = int(min_number)
        checkMinMax = checkMinMaxNumber(min_number, max_number)
        if not checkMinMax:
            print('最小の数字より最大の数字が小さいです')
            continue



        correct_number = random.randint(min_number, max_number) 
        checkGuessTheNumber(correct_number, min_number, max_number)
        break

startGame()
