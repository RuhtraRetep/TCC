using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Cmp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace PapelariaProtipo
{
    public partial class FormTelaPrincipal : Form
    {
        string conexao = "server=localhost;user=root;password=209740;database=sistema;";

        public FormTelaPrincipal(decimal valorInicial, string status)
        {
            InitializeComponent();
            valorInicial = valorInicial;
            status = status;
            label5.Text = status;
        }

        private void Salvar()
        {
            MySqlConnection banco = new MySqlConnection(conexao);

            decimal valorInserido = decimal.Parse(txtValorInserido.Text);

            string sql = "INSERT INTO movimentacoes (valor, data, descricao, tipo) VALUES (@valor,@data, @descricao, @tipo)";

            MySqlCommand cmd = new MySqlCommand(sql, banco);

            cmd.Parameters.AddWithValue("@valor", valorInserido);
            cmd.Parameters.AddWithValue("@data", DateTime.Now);
            cmd.Parameters.AddWithValue("@descricao", txtDescricao.Text);
            cmd.Parameters.AddWithValue("@tipo", cmdTipo.Text);

            banco.Open();
            cmd.ExecuteNonQuery();
            banco.Close();

            string tipo = cmdTipo.Text;
            MessageBox.Show($"{tipo} Salvo(a)!");
        }

        private void txtValorInserido_KeyPress(object sender, KeyPressEventArgs e)
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
    }
}
