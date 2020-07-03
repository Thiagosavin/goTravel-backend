


# Projeto em construção.



*Aplicação que me permitirá controlar de forma prática uma viajem planejada.*



# Iniciando o projeto.

*Para iniciar o projeto é necessário que tenha instalado em sua maquina*



1. Node atualizado

2. Gerenciador de pacotes de sua preferencia *(Yarn, NPM...)*

3. Docker (Ou se preferir, instalar os bancos que quiserem)

4. Um controlador de banco de dados a sua escolha.

5. Editor de código-fonte *(VScode, Sublime...)*



# Primeiros passos

Para instalar as dependências do projeto rode o comando abaixo:



    yarn

Após rodar a inicialização, e com o docker já instalado insira no terminal o seguinte comando para criar a instancia do postgres



    $ docker run --name nome-postrgres -e POSTGRES_PASSWORD=seupassword -p 5432:5432 -d postgres



E para criar a instância do mongo insira no terminal:

    $ docker run --name mongodb -p 27017:27017 -d -t mongo

E para criar a instância do redis insira no terminal:

    $ docker run --name redis -p 6739:6739 -d -t redis:alpine



## Logar na aplicação



- [ ] Login

**Regras**

- Usuário deve poder logar na aplicação inserindo o email e a senha

- Usuário deve poder criar um novo cadastro na aplicação

- Usuário deve poder recuperar a senha pelo link de recuperar senha

**Jobs**

- Email deve ser único

- Verificar e-mail e senha ao logar

- Gerar JWT ao logar

- Direcionar para a página de perfil ao logar.

- Alertar em caso de erros de login, sem informar os campos.

***

- [ ] Esqueci minha senha

**Regras**

- Usuário deve confirmar o e-mail ao clicar em recuperação de senha

- Em caso de erro, alertar usuário

- Usuário deve ser alertado que um email foi enviado para recuperação de senha

- Usuário deve ser redirecionado para pagina de login

**Jobs**

- Verificar e-mail digitado é valido

- Enviar por email link para alterar senha

- Link para alterar senha envia para tela especifica com nova senha, confirmaçao de senha e "not robot" (estudar viabilidade)

- Testar envios em ambiente dev

- Estudar Amazon SES para envio de emails em PROD

- Envio de emails deve acontecer em segundo plano

- E-mail de recuperação deve ser valido por 2h

- Usuario precisa confirmar a nova senha ao apagar a antiga

- [ ] Criar conta

***Estudo***

- [ ] Perfil do usuário

***Estudo***

