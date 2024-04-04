import socket
import sys

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

server_address = 'temp/socket_file'
print('coneection to {}', format(server_address))


try:
    sock.connect(server_address)
except socket.error as err:
    print(err)
    sys.exit(1)

try:
    
    message = input('input message: ').encode()
    sock.sendall(message)
    sock.settimeout(4)

    try:
        while True:
            data = str(sock.recv(4096))

            if data:
                print('Server Responce' + data)
            else:
                break
    except(TimeoutError):
        print('Socket TimeOut')
finally:
    print('Closing socket')
    sock.close()

