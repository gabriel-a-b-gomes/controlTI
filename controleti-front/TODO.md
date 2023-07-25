>>> TODO:

>>> TODO: (Main) Refatorar todas as relações para deixar nullable - Deixar com que a aplicação lide com isso. Se deixarmos required - dará problema na exclusão.

1. Verificar toggle de loadData de Settings (Verificação de bugs)



4. Criar o model e api dos servers;

5. Criar as DTOs de todos os forms e ainda customizar os campos com as necessidades para termos dupla checagem conforme

8. Criar os forms server; 

10. Verificar bug de não deixar enviar por conta de não seleção (forms)
10. 1. Bug acontecendo no campo data dos forms, ao limpá-lo

11. 1. Mudar estilos das tabelas para estilo do figma


12. 3. Fazer Filtragem dos outros equipamentos e indexes

12. 3. 4. Chip 
12. 3. 4. 1. Falta implementar para ver os detalhes do celular
12. 3. 5. Printer
12. 3. 6. Router
12. 3. 7. Switch
12. 3. 8. Node
12. 3. 9. Employee
12. 3. 10. Skype
12. 3. 11. VPN


13. Desenvolver as Infos DashBoards para computador, rede, dvr, servidores;
13. 1. Pensar em como dar o refresh quando houver o delete

15. Implementar settings - Index, criação (Modal), alteração (Modal) - Users, Senhas;
15. 1. Estilizar avisos

16. Criar a API de Home;
17. Implementar Home linkado com a API.

18. Criar o sistema de UserClaim;
19. Implementar o sistema de Login;
20. Testar Link desse sistema com o AD;
21. Proteger as rotas;

22. Responsivo (Forms e Index) - (Pendente Index);
23. Colocar Botão de fechar em erro e melhorar ele, deixar com que erros maiores não aparecam para o usuário (Algo inesperado aconteceu);
24. Melhorar select;

25. Imaginar toda a parte de Preventivas;
25. 1. Implementar o backend das preventivas;
25. 2. Implementar o frontend das preventivas;


27. Mudar o estilo de trabalhar com as cores em css;

28. Verificar se os services verificam se os codes são unicos

30. Refatorar partes do código que estejam 'sujas' e mal escritas.

>>> TOTHINK: 

1. Relatórios (Somente dos equipamentos / Rede / Servidores);
2. Pensar em criar Modal de Detalhes para cada equipamento;
3. Implementação de Delete em Massa;
4. Implementação de alteração em Massa;
5. Sobre pop up menu que oferece crud para celulares, processadores, armazenamento, etc

>>> FEITO:

1. Terminar o css de Loading e Empty Elements; (Feito)
2. Vericar como limpar o formulário com radio button (Feito - mais ou menos o reset do button não funciona, mas o default funciona)
3. Testar a edição e duplicação; - (Feito - conseguimos concluir a edição e duplicação / CRUD do Nobreak completo)
5. Criar a api de printers; (Feito)
6. Desenvolver a UI de server e printers (form); (Feito)
14. Criar o design de settings (Feito)
10. Criar os index - junto com os tabs se necessário; (Sistema de Tab criado)
7. Desenvolver a UI de employees e refatorar sua API com o padrão usado; (Feito)
15. 2. Criar os forms de alteração. (Feito)

15. Implementar settings - Index, criação (Modal), alteração (Modal) - Profiles, Departamentos; (Feito)

9. Implementar employees - Funcionalidade de VPN e Skype; (Index - Create - Delete Feitos) 
9. Implementar employees - Funcionalidade de VPN e Skype; (Index - Create - Delete Feitos) (Falta update) 
9. 1. Fazer o Delete de Skype e VPN (Feito)
9. 2. Corrigir Bugs - Lidar com o email duplicado e também lidar com usuário duplicados

8. 1. Finalizar forms de rede com pontos de rede.

8. 2. Criar ramais
8. 3. Criar chips
8. 4. Criar computadores

2. Bug de Limpar (Corrigido)
2. Corrigir o bug da data (Corrigido)
13. Desenvolver as Infos DashBoards para computador, rede, dvr
12. Centralizar a comunicação do servidor com o front pela filtragem;
12. 1. Feito o mecanismo de busca por busca varias vezes

11. Desenvolver as filtragens e testá-las (Incluindo Refresh); (Hoje)
12. 2. Terminar a filtragem extra. (Hoje)
12. 3. 1. Ramal
12. 3. 2. DVR
12. 3. 3. Nobreak

3. Ficar de olho no desempenho de computador, está apresentando lentidão com poucos registros (miticado com AsTracking)
11. 2. Verificar bugzinho de vídeo (Paginação) - Provavelmente culpa do re-render (Aparentemente corrigido)