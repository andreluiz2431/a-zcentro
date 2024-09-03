# Plano de Banco de Dados para Loja

## Estrutura das Tabelas

### 1. Tabela: `Usuarios`
- **id_usuario** (PK): INT - Identificador único do usuário.
- **nome**: VARCHAR(255) - Nome completo do usuário.
- **tipo**: ENUM('cliente', 'vendedor', 'admin') - Tipo de usuário.
- **data_criacao**: DATETIME - Data de criação do usuário.
- **cpf_cnpj**: VARCHAR(255) - CPF ou CNPJ do usuário

### 2. Tabela: `Produtos`
- **id_produto** (PK): INT - Identificador único do produto.
- **nome**: VARCHAR(255) - Nome do produto.
- **descricao**: TEXT - Descrição detalhada do produto.
- **imagem_url**: VARCHAR(255) - URL da imagem do produto.
- **categoria**: VARCHAR(255) - Categoria do produto.
- **data_criacao**: DATETIME - Data de criação do produto.

### 3. Tabela: `Pedidos`
- **id_pedido** (PK): INT - Identificador único do pedido.
- **id_usuario** (FK): INT - Relacionamento com a tabela `Usuarios`.
- **data_pedido**: DATETIME - Data de criação do pedido.
- **status**: ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado') - Status do pedido.
- **total**: DECIMAL(10, 2) - Valor total do pedido.

### 4. Tabela: `Itens_Pedido`
- **id_item_pedido** (PK): INT - Identificador único do item no pedido.
- **id_pedido** (FK): INT - Relacionamento com a tabela `Pedidos`.
- **id_produto** (FK): INT - Relacionamento com a tabela `Produtos`.
- **quantidade**: INT - Quantidade do produto no pedido.
- **preco_unitario**: DECIMAL(10, 2) - Preço unitário do produto.
- **subtotal**: DECIMAL(10, 2) - Subtotal (quantidade * preço_unitario).

### 5. Tabela: `Noticias`
- **id_noticia** (PK): INT - Identificador único da notícia.
- **titulo**: VARCHAR(255) - Título da notícia.
- **conteudo**: TEXT - Conteúdo completo da notícia.
- **autor**: VARCHAR(255) - Nome do autor da notícia.
- **data_publicacao**: DATETIME - Data de publicação.
- **imagem_url**: VARCHAR(255) - URL da imagem relacionada à notícia.
- **status**: ENUM('publicada', 'rascunho') - Status da notícia.

### 6. Tabela: `Promocoes`
- **id_promocao** (PK): INT - Identificador único da promoção.
- **titulo**: VARCHAR(255) - Título da promoção.
- **descricao**: TEXT - Descrição detalhada da promoção.
- **data_inicio**: DATETIME - Data de início da promoção.
- **data_fim**: DATETIME - Data de término da promoção.
- **desconto**: DECIMAL(5, 2) - Percentual de desconto aplicado.
- **id_produto** (FK, opcional): INT - Relacionamento opcional com a tabela `Produtos`.

### 7. Tabela: `Listas_Preco`
- **id_lista_preco** (PK): INT - Identificador único da lista de preço.
- **nome**: VARCHAR(255) - Nome da lista de preço.
- **descricao**: TEXT - Descrição da lista de preço.
- **data_criacao**: DATETIME - Data de criação da lista de preço.
- **status**: ENUM('ativa', 'inativa') - Status da lista de preço.

### 8. Tabela: `Precificacoes`
- **id_precificacao** (PK): INT - Identificador único da precificação.
- **id_produto** (FK): INT - Relacionamento com a tabela `Produtos`.
- **id_lista_preco** (FK): INT - Relacionamento com a tabela `Listas_Preco`.
- **preco**: DECIMAL(10, 2) - Preço do produto nesta lista de preço.
- **data_inicio**: DATETIME - Data de início da precificação.
- **data_fim**: DATETIME - Data de término da precificação.

### 9. Tabela: `Carrinhos`
- **id_carrinho** (PK): INT - Identificador único do carrinho.
- **id_usuario** (FK): INT - Relacionamento com a tabela `Usuarios`.
- **data_criacao**: DATETIME - Data de criação do carrinho.
- **status**: ENUM('ativo', 'abandonado', 'concluido') - Status do carrinho.

### 10. Tabela: `Itens_Carrinho`
- **id_item_carrinho** (PK): INT - Identificador único do item no carrinho.
- **id_carrinho** (FK): INT - Relacionamento com a tabela `Carrinhos`.
- **id_produto** (FK): INT - Relacionamento com a tabela `Produtos`.
- **quantidade**: INT - Quantidade do produto no carrinho.
- **preco_unitario**: DECIMAL(10, 2) - Preço unitário do produto no momento da adição ao carrinho.
- **subtotal**: DECIMAL(10, 2) - Subtotal (quantidade * preço_unitario).

### 11. Tabela: `Comentarios`
- **id_comentario** (PK): INT - Identificador único do comentário.
- **id_usuario** (FK): INT - Relacionamento com a tabela `Usuarios`.
- **id_produto** (FK, opcional): INT - Relacionamento opcional com a tabela `Produtos`.
- **id_promocao** (FK, opcional): INT - Relacionamento opcional com a tabela `Promocoes`.
- **id_noticia** (FK, opcional): INT - Relacionamento opcional com a tabela `Noticias`.
- **id_comentario_pai** (FK, opcional): INT - Relacionamento com outro comentário.
- **conteudo**: TEXT - Conteúdo do comentário.
- **data_criacao**: DATETIME - Data de criação do comentário.
- **status**: ENUM('ativo', 'inativo') - Status do comentário.

### 12. Tabela: `Likes`
- **id_like** (PK): INT - Identificador único do like.
- **id_comentario** (FK): INT - Relacionamento com a tabela `Comentarios`.
- **id_usuario** (FK): INT - Relacionamento com a tabela `Usuarios`.
- **data_criacao**: DATETIME - Data em que o like foi dado.

### 13. Tabela: `Chats`
- **id_chat** (PK): INT - Identificador único do chat.
- **id_usuario_cliente** (FK): INT - Relacionamento com a tabela `Usuarios` (cliente).
- **id_usuario_vendedor** (FK): INT - Relacionamento com a tabela `Usuarios` (vendedor).
- **data_criacao**: DATETIME - Data de criação do chat.
- **status**: ENUM('ativo', 'encerrado') - Status do chat.

### 14. Tabela: `Mensagens_Chat`
- **id_mensagem** (PK): INT - Identificador único da mensagem.
- **id_chat** (FK): INT - Relacionamento com a tabela `Chats`.
- **id_usuario** (FK): INT - Relacionamento com a tabela `Usuarios`.
- **conteudo**: TEXT - Conteúdo da mensagem.
- **data_envio**: DATETIME - Data e hora do envio da mensagem.

## Relacionamentos Principais

- **Usuarios**: Relaciona-se com **Carrinhos**, **Comentarios**, **Likes**, **Chats** e **Mensagens_Chat**.
- **Produtos**: Relaciona-se com **Comentarios**, **Itens_Carrinho**, **Precificacoes** e **Itens_Pedido**.
- **Pedidos**: Relaciona-se com **Usuarios** e **Itens_Pedido**.
- **Noticias** e **Promocoes**: Podem receber **Comentarios**.
- **Carrinhos**: Relaciona-se com **Usuarios** e **Itens_Carrinho**.
- **Comentarios**: Podem se relacionar com outros **Comentarios** (respostas).
- **Chats**: Conectam **Usuarios** (cliente e vendedor), e **Mensagens_Chat** gerencia as mensagens trocadas.

---

Esse plano cobre a estrutura completa do banco de dados, incluindo todas as funcionalidades de interação com usuários, comentários, likes, respostas, e um sistema de chat para comunicação entre vendedores e clientes.


## Diagrama de Relacionamentos Atualizado

- Usuários mantém seu relacionamento com Pedidos.
- Pedidos mantém seu relacionamento com Itens_Pedido.
- Itens_Pedido mantém seu relacionamento com Produtos.
- Notícias é uma tabela independente para gerenciar as notícias da loja.
- Promoções podem ter relacionamento com Produtos para vincular promoções específicas.
- Listas_Preco define os diferentes tipos de listas de preço disponíveis no sistema.
- Precificacoes relaciona Produtos com Listas_Preco e define o preço específico em cada lista.
- Usuarios se relaciona com Carrinhos, Comentarios, Likes, Chats e Mensagens_Chat.
- Carrinhos e Itens_Carrinho mantêm seus relacionamentos existentes.
- Produtos podem receber Comentarios e se relacionar com Precificacoes.
- Noticias e Promocoes podem receber Comentarios.
- Comentarios podem se relacionar com outros Comentarios para permitir respostas.
- Likes se relacionam com Comentarios para rastrear curtidas.
- Chats conectam Usuarios do tipo cliente e vendedor, e Mensagens_Chat gerencia as trocas de mensagens dentro de um chat.


## Explicações Adicionais

- A tabela Notícias gerencia as informações relacionadas a artigos e atualizações que a loja deseja compartilhar com seus usuários.
- A tabela Promoções permite a criação e gerenciamento de ofertas, com a possibilidade de associá-las a produtos específicos ou aplicar de forma geral.
- A tabela Listas_Preco permite definir diferentes tipos de preços, como preços para clientes finais, empresas, ou preços de combinação (kits).
- A tabela Precificacoes faz o vínculo entre produtos e listas de preço, especificando o valor correspondente a cada contexto.
- A tabela Carrinhos gerencia os carrinhos de compras dos usuários, com um status para indicar se o carrinho está ativo, abandonado ou foi concluído (após a finalização do pedido).
- A tabela Itens_Carrinho armazena os produtos adicionados ao carrinho, juntamente com a quantidade e o preço unitário no momento da adição.
- Esse modelo permite flexibilidade para gerenciar o carrinho de compras de cada usuário e fazer a transição de itens de carrinho para itens de pedido na finalização da compra.
- Comentarios gerenciam todas as interações dos usuários com produtos, promoções e notícias, suportando também respostas.
- Likes permite aos usuários curtirem comentários.
- Chats e Mensagens_Chat gerenciam a comunicação direta entre clientes e vendedores, oferecendo um sistema de chat.