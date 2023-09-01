# Preco-Teto-Calc-Desafio-CNI
Este é um desafio técnico proposto pela CNI no processo seletivo para analista II - Frontend Angular.

## Tecnologias Backend

> O backend foi feito em Nest JS.<br/>
> Implementei 2 cruds que estão funcionando linkados a um banco de dados Postgres usando o Prisma ORM.<br/>
> Implementei um sistema de autenticação completo que retorna um jwt token.<br/>
> Implementei Guards com uma estratégia local e outra jwt e criei um decorator espeficamente para receber o token e retornar os dados do usuário.<br/>
> Coloquei o Guard de JWT como global na api e é preciso usar um decorator @IsPublic em cima das rotas que se deseja serem públicas. Caso contrário se o usuário não estiver autenticado retornará 401 Unautorized.<br/>
> Os cruds são de usuário e de ações que se deseja calcular o preço teto.<br/>
> Também fiz um serviço específico que faz este cálculo e injetei como dependência no stocks/create , que retorna uma lista das ações cadastradas por aquele usuário específico em ordem ascendente.<br/>
> Somente usuários autenticados podem criar ações, visto que fiz um relacionamento de um pra muitos entre usuário e ações.Então a lista de ações é vinculada ao id do usuário no banco de dados através de uma chave estrangeira que é o id do usuário.<br/>

## Tecnologias Frontend

> O frontend foi feito em Angular 16.2.3<br/>
> Implementei um sistema de cadastro de usuário e login que direcionam o usuário autenticado para o dashboard(calculadora de preço teto).<br/>
> Implementei um guard que verifica se há um token salvo no local storage.<br/>
> Também implementei um HTTP_INTERCEPTOR que coloca o Authorization com o bearer token no header em toda chamada http.<br/>
> Dentro do componente dashboard no arquivo dashboard.component.ts no ngOnInit ele faz uma chamada http a uma rota restrita no backend e redireciona para a página de login se o usuário não estiver autenticado.Assim na inicialização do componente<br/>
> ja se garante que somente usuários autenticados podem acessar a área privada.(Componente dashboard onde será a calculadora.)<br/>
> Fiz um authService que implementa diversos métodos de chamadas http utilizando o HttpClient do Angular.<br/>
> Usei o pipe(take(1)) pra garantir o unsubscribe e não ter problemas de memory leaks.<br/>
> User o FormBuilder do Reactive Forms pra fazer os formulários de cadastro e login. Implementei algumas validações mais pra mostrar que eu sei que existem, mas não mostrei elas na view.<br/>

## Como fazer rodar a aplicação?

## Backend

#### Instalando as dependências e criando a pasta NodeModules 

```
>
> npm install 
>
```

#### Configure um banco de dados Postgres no arquivo .env

```
>
> DATABASE_URL="postgresql://(SEUNOMEDEUSUARIO):(SUASENHA)@localhost:5432/braziliangemstones?schema=public"
>
```

#### Depois de configurar seu banco, crie o banco através do Prisma Client
```
>
> npx prima migrate dev
>
```

####  Inicialize o servidor do Nest JS no modo watch

```
>
> npm run start:dev
>
```
#### Acesse o Postman e faças suas requisições para as rotas .

As rotas no Nest JS são relativamente simples. Os decorators dos controllers definem a primeira / e os decorators dos verbos http definem a continuação.
Exemplo:
@Controller('users')

@Post('create')

A rota deste endpoint será http://localhost:3000/users/create

![Rotas]() 

Basta agora cadastrar , atualizar, ler e excluir os usuários quantas vezes quiser.


