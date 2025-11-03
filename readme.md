# Sistema de Gerenciamento de Chamados - HelpDesk

## ADMINISTRADOR

- [] Deve conseguir listar todos os chamados de qualquer Cliente.
- [] Deve conseguir editar o status dos chamados

### TÉCNICOS

- CRIAR, EDITAR, LISTAR OS TÉCNICOS
- [] Ao criar um técnico, o administrador da uma senha provisória

### SERVIÇOS

- CRIAR, EDITAR, DESATIVAR, LISTAR SERVIÇOS
- [] Ao desativar um serviço ele não pode aparecer na criação de um novo Chamado, mas deve permanecer nos Chamados ja criados.

### Clientes

- LISTAR, EDITAR, EXCLUIR CLIENTES
- [] Ao excluir um cliente, todos os chamados são apagados tambem.

## TÉCNICOS

- [] Editar seu perfil
- [] Listar todos os chamados que são dele
- [] Adicionar novos serviços ao chamados se for necessário
- [] Editar o status do chamado
- [] Quando iniciar o atendimento, tem que mudar o status do chamado para 'Em atendimento'
- [] Quanto encerrar o atendimento, tem que mudar o status do chamado para 'Encerrado'

## CLIENTES

- CRIAR, EDITAR, EXCLUIR sua conta ( ao excluir, exclui todos os seus chamados juntos)
- [] Visualizar todos os seus chamados
- [] Após o chamado criado, não pode alterar mais nenhuma informação, apenas visualizar

## CHAMADOS

- O cliente pode criar vários chamados por ele
- Deve selecionar a categoria do serviço
- Todo chamado deve ter pelo menos 1 serviço, podendo ser adicionado novos serviços pelo Técnico.
- O chamado deve exibir o valor do Serviço solicitado e o valor de cada Serviço adicional incluido pelo Técnico e o somatório de tudo.
- status: Aberto, Em Atendimento, Encerrado

## SERVIÇO

- Somente o admin pode criar um Serviço
- Cada serviço terá um valor a ser cobrado do Cliente.
