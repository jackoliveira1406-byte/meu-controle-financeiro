# Meu Controle Financeiro — primeira versão

## O que esta versão já faz
- Login e criação de conta pelo Supabase Auth.
- Cadastro de receitas e despesas.
- Consulta dos lançamentos por mês.
- Edição de lançamentos.
- Indicadores de receitas, despesas e saldo.
- Gráfico comparativo mensal.
- Exportação dos registros exibidos em CSV.
- Estrutura PWA para instalação pelo navegador.

## Configuração
1. Abra `config.js`.
2. Substitua `COLE_AQUI_A_PROJECT_URL` pela Project URL do Supabase.
3. Substitua `COLE_AQUI_A_CHAVE_PUBLICA_ANON` pela chave publishable (ou anon legacy).
4. Nunca use `service_role` no navegador.
5. Publique os arquivos em uma hospedagem HTTPS estática, por exemplo GitHub Pages.

## Supabase
A tabela esperada é `public.lancamentos`, com as colunas:
`id, data, parcela, descricao, valor, metodo, categoria, saida, entrada, status, criado_por, criado_em, atualizado_em`.

A tabela deve ter RLS habilitado e políticas SELECT, INSERT e UPDATE para `authenticated`.
A política de exclusão não foi criada, conforme a regra atual do projeto.

## Atenção
- O formulário permite criar usuários; se a confirmação de e-mail estiver ativa no Supabase, cada pessoa deverá confirmar o e-mail.
- O app usa o banco como fonte principal. A integração automática com o arquivo no MEGA ainda não está implementada.
- Antes de usar com dados reais, teste com registros fictícios.
- Configure recuperação de senha e regras de autenticação no painel do Supabase.
