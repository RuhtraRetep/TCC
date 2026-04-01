using MySql.Data.MySqlClient;
using System.Data;


namespace SISTEMA_DE_GESTÃO_DE_ESTOQUE
{
    public partial class Form1 : Form
    {
        string stringConexao = "server=localhost;database=estoque;uid=root;pwd=;";

        public Form1()
        {
            InitializeComponent();
        }

        private void cadastrarCliente()
        {
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("O campo Nome é obrigatório!", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }
            else if (string.IsNullOrWhiteSpace(txtCategoria.Text))
            {
                MessageBox.Show("O campo Categoria é obrigatório!", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }
            else if (string.IsNullOrWhiteSpace(txtPreco.Text))
            {
                MessageBox.Show("O campo Preço é obrigatório!", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }
            else if (string.IsNullOrWhiteSpace(txtQuantidade.Text))
            {
                MessageBox.Show("O campo Quantidade é obrigatório!", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }


            try
            {
                using (MySqlConnection conn = new MySqlConnection(stringConexao))
                {
                    string sql = "INSERT INTO produtos (nome, categoria, preco, quantidade) VALUES (@nome, @categoria, @preco, @quantidade)";

                    MySqlCommand comando = new MySqlCommand(sql, conn);

                    comando.Parameters.AddWithValue("@nome", txtName.Text.Trim());
                    comando.Parameters.AddWithValue("@categoria", txtCategoria.Text);
                    comando.Parameters.AddWithValue("@preco", txtPreco.Text);
                    comando.Parameters.AddWithValue("@quantidade", txtQuantidade.Text);

                    conn.Open();
                    comando.ExecuteNonQuery();

                    MessageBox.Show("Cadastro efetuado");
                    conn.Close();

                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro aí", ex.Message);

            }

        }


        private void ListarProdutos()
        {
            string sql = "SELECT * FROM produtos";

            try
            {
                using (MySqlDataAdapter da = new MySqlDataAdapter(sql, stringConexao))
                {


                    DataTable dt = new DataTable();

                    da.Fill(dt);

                    dtgProdutos.DataSource = dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao buscar os dados", ex.Message);
            }

        }

        private void BuscarCodigo()
        {
            string sql = "SELECT * FROM produtos WHERE codigo = @codigo";

            try
            {
                using (MySqlDataAdapter da = new MySqlDataAdapter(sql, stringConexao))
                {
                    da.SelectCommand.Parameters.AddWithValue("@codigo", txtCodigo.Text);

                    DataTable dt = new DataTable();

                    da.Fill(dt);

                    dtgProdutos.DataSource = dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao buscar os dados", ex.Message);
            }
        }

        private void BuscarNome()
        {
            string sql = "SELECT * FROM produtos WHERE codigo = @nome";

            try
            {
                using (MySqlDataAdapter da = new MySqlDataAdapter(sql, stringConexao))
                {
                    da.SelectCommand.Parameters.AddWithValue("@nome", txtName.Text);

                    DataTable dt = new DataTable();

                    da.Fill(dt);

                    dtgProdutos.DataSource = dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao buscar os dados", ex.Message);
            }
        }

        private void btnCadastrar_Click(object sender, EventArgs e)
        {
            cadastrarCliente();
        }

        private void btnListar_Click(object sender, EventArgs e)
        {
            ListarProdutos();
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            BuscarCodigo();
        }

        private void btnBuscarNome_Click(object sender, EventArgs e)
        {
            BuscarNome();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
