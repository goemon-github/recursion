import markdown
import sys

def converter(input_file, output_file):
    with open(input_file, 'r') as f:
        text = f.read()
        html = markdown.markdown(text, extensions=['extra','toc', 'sane_lists'])

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)


def main():
   commad = sys.argv[1] 

   if commad == 'markdown':
       input_file = sys.argv[2]
       output_file = sys.argv[3]
       converter(input_file, output_file)


if __name__ == '__main__':
    main()