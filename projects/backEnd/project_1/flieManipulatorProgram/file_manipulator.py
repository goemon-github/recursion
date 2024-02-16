import sys


def reverse(input_path, output_path):
    with open(input_path, 'r') as f:
        contents = f.read()
        contents = contents[::-1].strip('\n')
    
    with open(output_path, 'w') as outf:
        outf.write(contents)
        

def copy(input_path, output_path):
    with open(input_path, 'r') as f:
        contents = f.read()
    
    with open(output_path, 'w') as outf:
        outf.write(contents)


def duplicate_contents(input_path, value):
    with open(input_path, 'r') as f:
        contents = f.read()

    with open(input_path, 'a') as f:
        for _ in range(value):
            f.write(contents)


def replace_string(input_path, needle='needle', new_string='newstring'):
    with open(input_path, 'r') as f:
        contents = f.read()
        print(contents)
        contents = contents.replace(needle, new_string)
        print(contents)

    with open(input_path, 'w') as f:
        f.write(contents)

def help():
    helpPath = 'help.txt'
    with open(helpPath, 'r') as f:
        contents = f.read()
        print(contents)


def main():
    commad = sys.argv[1] 
    if len(sys.argv) > 2:
        input_path = sys.argv[2] 


    if commad == 'reverse':
        output_path = sys.argv[3] 
        reverse(input_path, output_path)
    elif commad == 'copy':
        output_path = sys.argv[3] 
        copy(input_path, output_path)
    elif commad == 'deplicate':
        value = sys.argv[3] 
        duplicate_contents(input_path, int(value))
    elif commad == 'replace':
        replace_string(input_path)
    elif commad == '--help' :
        help()

if __name__ == "__main__":
    main()