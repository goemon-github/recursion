import functions
import json


class ConnectionHandler:
    def __init__(self, connection, client_address) :
        self.connection = connection
        self.client_address = client_address

    
    def handle(self):
        try:
            print('connection from', self.client_address)
            while True:
                data = self.connection.recv(4096)
                if data:
                    #data_str = data.decode('utf-8')
                    parse_request = json.loads(data) 
                    print(f'request: {parse_request}')
                    responce = self.handle_rpc_request(parse_request)
                    self.handle_rpc_responce(responce)
                else:
                    print('no data from', self.client_address)
                    break
        finally:
            print('Close cureent connection')
            self.connection.close()


    def handle_rpc_request(self, request):
        method = request.get("method")
        params = request.get("params") 

        responce = ''
        if method == 'floor':
            responce = functions.floor(int(params))

        elif method == 'nroot':

            n, x = params.split(' ')
            responce = functions.nroot(int(n), int(x))

        elif method == 'reverse':
            responce = functions.reverse(params)

        elif method == 'anagram':
            str1, str2 = params.split(' ')
            responce = functions.validAnagram(str1, str2)

        elif method == 'sort':
            responce = functions.sort(params)

        data = {
            'results': str(responce),
            'result_type': type(responce).__name__,
            'id': request.get('id')
        }
        return data

    def handle_rpc_responce(self, responce):
        responce_json =  json.dumps(responce)
        print('responce' + ' ' + responce_json)
        self.connection.sendall(responce_json.encode())