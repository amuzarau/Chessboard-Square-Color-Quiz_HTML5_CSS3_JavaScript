import random

def question():
# Answer one question:
    files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    ranks = ['1', '2','3','4','5','6','7','8']

    letter = random.choice(files)
    number = random.choice(ranks)
    color = None
    square_name = f'{letter}{number}'

    player_color = input(f"Which color is {square_name} square? (w - white, b - black)\n> ").lower()
    f = files.index(letter)
    r = ranks.index(number)
    if f % 2 == 0:
        if r % 2 == 0:
            color = 'b'
            if player_color == color:
                print(f"Right, {square_name} is black")
            elif player_color != color:
                print(f"Wrong, {square_name} is black")

        elif r % 2 != 0:
            color = 'w'
            if player_color == color:
                print(f"Right, {square_name} is white")
            elif player_color != color:
                print(f"Wrong, {square_name} is white")
    elif f % 2 != 0:
        if r % 2 != 0 :
            color = 'b'
            if player_color == color:
                print(f"Right, {square_name} is black")
            elif player_color != color:
                print(f"Wrong, {square_name} is black")
        elif r % 2 == 0:
            color = 'w'
            if player_color == color:
                print(f"Right, {square_name} is white")
            elif player_color != color:
                print(f"Wrong, {square_name} is white")

    else:
        print('Please type valid letter and number! ')

def main():
#Answer questions repeatedly
    while True:
        question()
        answer = input("Do you want to play again? Any key - continue, N to quit\n> ").lower()
        if answer == 'n':
            print("Thanks for training!")
            break

if __name__ == '__main__':
    main()





