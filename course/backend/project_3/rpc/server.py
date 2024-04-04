import socket
import os
from faker import Faker
import connectionHandler 


class Server:
    def __init__(self, host, port) -> None:
        self.host = host
        self.port = port
        self.socket = self.create_socket()


    def create_socket(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind((self.host, self.port))
        print('waitting....')
        sock.listen(1)
        return  sock


    def run(self):
        try:
            while True:
                print("Listening to connection on {}:{}", self.host, self.port)
                connection, client_address = self.socket.accept()
                handler = connectionHandler.ConnectionHandler(connection, client_address)
                handler.handle()
        except KeyboardInterrupt:
            print('\nSutting down the server')
        finally:
            self.close()

    def close(self):
        print('Close the server socket.')
        self.socket.close()
        


if __name__ == "__main__":
    server = Server('127.0.0.1',12345)    
    server.run()
