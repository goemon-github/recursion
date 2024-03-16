import socket
import os
from faker import Faker


sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)


server_address = 'temp/socket_file'

try:
    os.unlink(server_address)
except FileNotFoundError:
    pass

sock.bind(server_address)

print("watting.....")
sock.listen(1)


while True:
    connection, client_address = sock.accept()
    print('client' + client_address)

    try:
        print('connection from', client_address)

        while True:
            data = connection.recv(4096)

            data_str = data.decode('utf-8')
            print('receive: ' + data_str)
            if data:
                fake = Faker()
                name = fake.name()
                response = 'Processing-->' + name + ' ' + data_str 
                print('resopnce: ', response)
                connection.sendall(response.encode())
            else:
                print('no data from', client_address)
                break
    finally:
        print('Close current connection')
        connection.close()