using MySql.Data.MySqlClient;


namespace PapelariaProtipo
{
    public partial class Form1 : Form
    {
        string conexao = "server=localhost;user=root;password=209740;database=sistema;";

        public Form1()
        {
            InitializeComponent();
        }

        private void Abrir()
        {
            lblStatus.Text = "Aberto";
            btnAbrirFechar.Text = "Fechar";
            btnAbrirFechar.BackColor = Color.Red;
            lblStatus.BackColor = Color.LimeGreen;
        }

        private void SalvarCaixa()
        {
            MySqlConnection banco = new MySqlConnection(conexao);

            decimal valorInicial = decimal.Parse(txtValorInicial.Text);
            string status = lblStatus.Text;

            string sql = "INSERT INTO caixa (valor_inicial, data, status) VALUES (@valor,@data, @status)";

            MySqlCommand cmd = new MySqlCommand(sql, banco);

            cmd.Parameters.AddWithValue("@valor", valorInicial);
            cmd.Parameters.AddWithValue("@data", DateTime.Now);
            cmd.Parameters.AddWithValue("@status", lblStatus.Text);

            banco.Open();
            cmd.ExecuteNonQuery();
            banco.Close();

            MessageBox.Show("Caixa aberto com sucesso!");

            FormTelaPrincipal principal = new FormTelaPrincipal(valorInicial, status);
            principal.Show();
            this.Hide();
        }

        private void btnAbrirFechar_Click(object sender, EventArgs e)
        {
            Abrir();
            SalvarCaixa();
        }

        private void txtValorInicial_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Permitir números
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != ',' && e.KeyChar != (char)8)
            {
                e.Handled = true;
            }

            // Permitir apenas uma vírgula
            if (e.KeyChar == ',' && (sender as TextBox).Text.Contains(","))
            {
                e.Handled = true;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {


        }
    }



}
