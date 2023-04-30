
# Projeto de Estudo de Caso sobre a Criação de uma plataforma de venda de ingressos

  
### Proibido o uso comercial!

### License: CC BY-NC 4.0 

![CC BY-NC 4.0](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

##### Trabalho: ANTONIO ALTAY DA SILVA PEREIRA
##### UNITINS
##### Estudo de Caso - Prática em Desenvolvimento de Sistemas
<hr/>

### Instalação e uso do Projeto:

1. **Requisitos**

	1.1. Servidor HTTP Apache
	1.2. PHP v8.1 ou superior
	1.3. MariaDB v10.11.2

### Passo a Passo
## 1. Instale o Xampp pelo site oficial

## 2. inicie o ```apache``` e o ```mysql```

## 3. Abra o cmd  para alterar a Senha do MariaDB através do código abaixo:
```powershell
cd C:\xampp\mysql\bin
mysqladmin -u root password
New password: 123
Confirm new password: 123
```
Caso não consiga alterar, você poderá acessar esse artigo: https://rb.gy/dr1og.

#### >>> IMPORTANTE! <<<

### Garanta que as credenciais de acesso ao SGBD sejam:

**Usuário:** root
**Senha:** 123

## 4. Crie uma Base de dados de nome: **ingresso**

## 5. Clone esse repositório para a **pasta htdocs** do xampp 

## Renomei a pasta do projeto para ```ingresso```

## 6. No Windows o caminho deverá ser
```
C:\xampp\htdocs\ingresso
```
## 7. Acesse o arquivo:  ```C:\xampp\phpMyAdmin\config.inc.php``` e altere ```password``` e ```AllowNoPassword``` como demonstrado abaixo:
```php
/* Authentication type and info */
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = ''; # Altere a senha para 123 
$cfg['Servers'][$i]['extension'] = 'mysqli';
$cfg['Servers'][$i]['AllowNoPassword'] = true; # Altere para false
$cfg['Lang'] = '';
```

## 8. Ative a extensão ```GD``` no arquivo ```php.ini```.

## 9. Abra através do navegador o endereço
```
http://127.0.0.1/ingresso
```

### Isso fará com que o Banco de Dados ```ingresso``` **criado anteriormente** seja populado!

## 10. Acesse a pasta ```App``` do sistema pelo o Windows Explorer e abra o arquivo index.html com o navegador (de preferência um baseado em Chromium)
O endereço provavelmente será esse:
```
C:\xampp\htdocs\ingresso\App\index.html
```

  

### Credenciais de Acesso ao Sistema.:

### **Usuário padrão**:
E-mail: altay@gmail.com
Senha: 123

### **Usuário administrador**:
E-mail: admin@gmail.com
Senha: admin

  

#### Downloads

<a  align='center'  href='https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.4/xampp-windows-x64-8.2.4-0-VS16-installer.exe'  target="_blank">

<img  src="https://upload.wikimedia.org/wikipedia/en/thumb/7/78/XAMPP_logo.svg/1200px-XAMPP_logo.svg.png"  width='100px'>

<br>

Clique aqui para baixar o Xampp

</a>