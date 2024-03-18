import functions
import json


class ConnectionHandler:
    def __init__(self, connection, client_address) :
        self.connection = connection
        self.client_address = client_address
        self.funcHashMap = self.create_fumc_hashmap()
        self.paramsCheckTypeHashMap = self.create_prams_checktype_hashmap()
        self.responceParamsTypeHashMap = self.create_responce_params_type_hashmap()

    
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

    
    def create_fumc_hashmap(self):
        funcHashMap = {
            'floor': functions.floor,
            'nroot': functions.nroot,
            'reverse': functions.reverse,
            'anagram': functions.validAnagram,
            'sort': functions.sort
        }
        return funcHashMap

    def create_prams_checktype_hashmap(self):
        paramsCheckTypeHashMap = {
            'floor': 'float',
            'nroot': '[int, int]',
            'reverse': 'string',
            'anagram': '[string, string]',
            'sort': 'stirng[]'
        }
        return paramsCheckTypeHashMap
    
    def create_responce_params_type_hashmap(self):
        responceParamsTypeHashMap= {
            'floor': 'int',
            'nroot': 'float',
            'reverse': 'string',
            'anagram': '[string, string]',
            'sort': 'stirng[]'
        }
        return responceParamsTypeHashMap


    def handle_rpc_request(self, request):
        method = request.get("method")
        params = request.get("params") 
        params_type = request.get('params_type')
        id =  request.get('id')

        if(type(params) != params_type):
            if(params_type == 'int'):
                params = int(params)
            elif(params_type == 'float'):
                params = float(params)


        if method == 'nroot':
            n, x = params.split(' ')
            params = [n, x]

        elif method == 'anagram':
            str1, str2 = params.split(' ')
            params = [str1, str2]

        elif method == 'sort':
            responce = functions.sort(params)

        responceResult = self.funcHashMap[method](params)
        responceResultType = self.responceParamsTypeHashMap[method]


        """
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
        """

        data = {
            'results': responceResult,
            'result_type': responceResultType,
            'id':id 
        }
        return data

    def handle_rpc_responce(self, responce):
        responce_json =  json.dumps(responce)
        print('responce' + ' ' + responce_json)
        self.connection.sendall(responce_json.encode())