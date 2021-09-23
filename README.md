Ola, essa api foi criada por NestJS e com banco de dados PostgreSQL do Supabase.io.

Supabase: https://supabase.io/

Estou usando a heroku para hospedar essa API: https://firt-api.herokuapp.com/v1

*ainda nao precisa de token para acessar a API

Nessa API, temos algumas rotas: 
* /user
* /telefone
* /funcionario
* /endereco
* /cargo

post /user  

op1:
{
	"email": "FelipeAles6@gmail.com",
  "Password": "123456",
	"Cliente": "false",
	"funcionario": {
		"Name": "Felipe Ales",
		"endereco_id": "cc22a005-fc3d-47fb-b43a-0fba19d9547f",
		"cargo_id": "3f383c0c-c155-46a6-bf94-703508ac4703",
		"telefones":[{
				"Telefone": "15926491203"
			}
		]
		}	
}

op2: 

{
	"email": "FelipeAles5@gmail.com",
  "Password": "12345",
	"Cliente": "false",
	"funcionario": {
		"Name": "Felipe Ales",
		"endereco": {
			"Rua": "Avenida Paulista2",
			"Numero": 8,
			"Bairro":"Sao Paulo",
			"Cidade":"Sao Paulo",
			"UF":"SP",
			"CEP": 18000000
		},
		"cargo_id": "3f383c0c-c155-46a6-bf94-703508ac4703",
		"telefones":[{
				"Telefone": "15926491203"
			}
		]
		}	
}