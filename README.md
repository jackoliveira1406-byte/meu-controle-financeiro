# Meu Controle Financeiro — versão inicial

Aplicativo web responsivo para registrar receitas e despesas, consultar lançamentos por mês, editar registros, ver totais e exportar CSV.

## Arquivos
- `index.html`: interface e funcionalidades do aplicativo.
- `config.js`: URL do projeto Supabase e chave pública publishable.
- `manifest.json`: metadados para instalação como PWA.
- `sw.js`: service worker simples para recursos estáticos.

## Configuração do Supabase
A aplicação espera a tabela `public.lancamentos` com as colunas:
`id, data, parcela, descricao, valor, metodo, categoria, saida, entrada, status, criado_por, criado_em, atualizado_em`.

A tabela precisa ter RLS habilitado e políticas SELECT, INSERT e UPDATE para o papel `authenticated`. Não foi criada política DELETE.

### Controle de acesso obrigatório antes de publicar
1. No Supabase, abra Authentication > Sign In / Providers (ou configuração geral de Auth).
2. Desative **Allow new users to sign up**. O formulário público de cadastro não existe no aplicativo; esta configuração impede cadastros diretos pela API.
3. Em Authentication > Users, use **Add user > Send invitation** para convidar seu próprio e-mail e os e-mails das pessoas autorizadas.
4. Como as políticas atuais permitem que qualquer usuário autenticado visualize, insira e edite todos os lançamentos, convide somente pessoas que devem ter esse acesso compartilhado.
5. Nunca coloque a chave secreta `service_role` no navegador ou neste repositório.

A chave `sb_publishable_...` de `config.js` é uma chave pública destinada ao cliente. A segurança dos dados depende das políticas RLS e da restrição de cadastro descritas acima.

## Publicar no GitHub Pages
1. Abra Settings > Pages neste repositório.
2. Em Build and deployment, selecione **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/(root)`; clique em Save.
4. Aguarde o deploy e use o endereço mostrado na própria página Pages.

O repositório é público e o site publicado será acessível publicamente. A tela de login protege os dados somente se o Supabase estiver configurado corretamente.

## Funcionalidades disponíveis
- Login pelo Supabase Auth.
- Cadastro de receitas e despesas (para usuários autenticados).
- Consulta mensal, indicadores e gráfico comparativo.
- Edição de lançamentos.
- Exportação CSV dos registros exibidos.

## Limitações da versão inicial
- O banco Supabase é a fonte principal dos dados.
- A integração automática com o arquivo no MEGA ainda não está implementada.
- A importação de Outubro, Novembro e Dezembro de 2026 ainda precisa ser validada e executada.
- Antes de inserir dados financeiros reais, faça testes com dados fictícios.
- Configure recuperação de senha e os redirecionamentos de autenticação no Supabase para o endereço final do aplicativo.
