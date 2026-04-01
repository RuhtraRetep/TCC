namespace SISTEMA_DE_GESTÃO_DE_ESTOQUE
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            dtgProdutos = new DataGridView();
            gbCadastrarProduto = new GroupBox();
            btnBuscarNome = new Button();
            textBox1 = new TextBox();
            btnBuscar = new Button();
            txtCodigo = new TextBox();
            btnListar = new Button();
            label6 = new Label();
            label4 = new Label();
            label5 = new Label();
            label3 = new Label();
            label2 = new Label();
            label1 = new Label();
            txtQuantidade = new TextBox();
            txtPreco = new TextBox();
            txtCategoria = new TextBox();
            txtName = new TextBox();
            btnCadastrar = new Button();
            ((System.ComponentModel.ISupportInitialize)dtgProdutos).BeginInit();
            gbCadastrarProduto.SuspendLayout();
            SuspendLayout();
            // 
            // dtgProdutos
            // 
            dtgProdutos.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dtgProdutos.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dtgProdutos.Dock = DockStyle.Right;
            dtgProdutos.Location = new Point(327, 0);
            dtgProdutos.Name = "dtgProdutos";
            dtgProdutos.Size = new Size(473, 450);
            dtgProdutos.TabIndex = 0;
            // 
            // gbCadastrarProduto
            // 
            gbCadastrarProduto.Controls.Add(btnBuscarNome);
            gbCadastrarProduto.Controls.Add(textBox1);
            gbCadastrarProduto.Controls.Add(btnBuscar);
            gbCadastrarProduto.Controls.Add(txtCodigo);
            gbCadastrarProduto.Controls.Add(btnListar);
            gbCadastrarProduto.Controls.Add(label6);
            gbCadastrarProduto.Controls.Add(label4);
            gbCadastrarProduto.Controls.Add(label5);
            gbCadastrarProduto.Controls.Add(label3);
            gbCadastrarProduto.Controls.Add(label2);
            gbCadastrarProduto.Controls.Add(label1);
            gbCadastrarProduto.Controls.Add(txtQuantidade);
            gbCadastrarProduto.Controls.Add(txtPreco);
            gbCadastrarProduto.Controls.Add(txtCategoria);
            gbCadastrarProduto.Controls.Add(txtName);
            gbCadastrarProduto.Controls.Add(btnCadastrar);
            gbCadastrarProduto.Dock = DockStyle.Left;
            gbCadastrarProduto.Location = new Point(0, 0);
            gbCadastrarProduto.Name = "gbCadastrarProduto";
            gbCadastrarProduto.Size = new Size(321, 450);
            gbCadastrarProduto.TabIndex = 1;
            gbCadastrarProduto.TabStop = false;
            gbCadastrarProduto.Text = "Cadastro de produto";
            // 
            // btnBuscarNome
            // 
            btnBuscarNome.BackColor = Color.MidnightBlue;
            btnBuscarNome.FlatAppearance.BorderSize = 0;
            btnBuscarNome.FlatStyle = FlatStyle.Flat;
            btnBuscarNome.ForeColor = Color.White;
            btnBuscarNome.Location = new Point(240, 389);
            btnBuscarNome.Name = "btnBuscarNome";
            btnBuscarNome.Size = new Size(75, 23);
            btnBuscarNome.TabIndex = 13;
            btnBuscarNome.Text = "Buscar";
            btnBuscarNome.UseVisualStyleBackColor = false;
            btnBuscarNome.Click += btnBuscarNome_Click;
            // 
            // textBox1
            // 
            textBox1.Location = new Point(58, 389);
            textBox1.Name = "textBox1";
            textBox1.PlaceholderText = "Busca por Nome do Produto";
            textBox1.Size = new Size(168, 23);
            textBox1.TabIndex = 12;
            // 
            // btnBuscar
            // 
            btnBuscar.BackColor = Color.MidnightBlue;
            btnBuscar.FlatAppearance.BorderSize = 0;
            btnBuscar.FlatStyle = FlatStyle.Flat;
            btnBuscar.ForeColor = Color.White;
            btnBuscar.Location = new Point(240, 328);
            btnBuscar.Name = "btnBuscar";
            btnBuscar.Size = new Size(75, 23);
            btnBuscar.TabIndex = 11;
            btnBuscar.Text = "Buscar";
            btnBuscar.UseVisualStyleBackColor = false;
            btnBuscar.Click += btnBuscar_Click;
            // 
            // txtCodigo
            // 
            txtCodigo.Location = new Point(58, 328);
            txtCodigo.Name = "txtCodigo";
            txtCodigo.PlaceholderText = "Busca por Codigo do Produto";
            txtCodigo.Size = new Size(168, 23);
            txtCodigo.TabIndex = 10;
            // 
            // btnListar
            // 
            btnListar.BackColor = Color.MidnightBlue;
            btnListar.FlatAppearance.BorderSize = 0;
            btnListar.FlatStyle = FlatStyle.Flat;
            btnListar.ForeColor = Color.White;
            btnListar.Location = new Point(12, 271);
            btnListar.Name = "btnListar";
            btnListar.Size = new Size(107, 23);
            btnListar.TabIndex = 9;
            btnListar.Text = "Listar Produto";
            btnListar.UseVisualStyleBackColor = false;
            btnListar.Click += btnListar_Click;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(6, 392);
            label6.Name = "label6";
            label6.Size = new Size(43, 15);
            label6.TabIndex = 7;
            label6.Text = "Nome:";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(0, 214);
            label4.Name = "label4";
            label4.Size = new Size(72, 15);
            label4.TabIndex = 8;
            label4.Text = "Quantidade:";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(6, 332);
            label5.Name = "label5";
            label5.Size = new Size(49, 15);
            label5.TabIndex = 7;
            label5.Text = "Codigo:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(12, 154);
            label3.Name = "label3";
            label3.Size = new Size(40, 15);
            label3.TabIndex = 7;
            label3.Text = "Preço:";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(6, 93);
            label2.Name = "label2";
            label2.Size = new Size(61, 15);
            label2.TabIndex = 6;
            label2.Text = "Categoria:";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 30);
            label1.Name = "label1";
            label1.Size = new Size(53, 15);
            label1.TabIndex = 5;
            label1.Text = "Produto:";
            // 
            // txtQuantidade
            // 
            txtQuantidade.Location = new Point(75, 211);
            txtQuantidade.Name = "txtQuantidade";
            txtQuantidade.PlaceholderText = "Digite a quantidade";
            txtQuantidade.Size = new Size(115, 23);
            txtQuantidade.TabIndex = 4;
            // 
            // txtPreco
            // 
            txtPreco.Location = new Point(75, 151);
            txtPreco.Name = "txtPreco";
            txtPreco.PlaceholderText = "Digite o Preço";
            txtPreco.Size = new Size(115, 23);
            txtPreco.TabIndex = 3;
            // 
            // txtCategoria
            // 
            txtCategoria.Location = new Point(75, 90);
            txtCategoria.Name = "txtCategoria";
            txtCategoria.PlaceholderText = "Digite a Categoria";
            txtCategoria.Size = new Size(115, 23);
            txtCategoria.TabIndex = 2;
            // 
            // txtName
            // 
            txtName.Location = new Point(75, 27);
            txtName.Name = "txtName";
            txtName.PlaceholderText = "Digite o Nome do Produto";
            txtName.Size = new Size(154, 23);
            txtName.TabIndex = 1;
            // 
            // btnCadastrar
            // 
            btnCadastrar.BackColor = Color.MidnightBlue;
            btnCadastrar.FlatAppearance.BorderSize = 0;
            btnCadastrar.FlatStyle = FlatStyle.Flat;
            btnCadastrar.ForeColor = Color.White;
            btnCadastrar.Location = new Point(227, 214);
            btnCadastrar.Name = "btnCadastrar";
            btnCadastrar.Size = new Size(75, 23);
            btnCadastrar.TabIndex = 0;
            btnCadastrar.Text = "Cadastrar";
            btnCadastrar.UseVisualStyleBackColor = false;
            btnCadastrar.Click += btnCadastrar_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(gbCadastrarProduto);
            Controls.Add(dtgProdutos);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)dtgProdutos).EndInit();
            gbCadastrarProduto.ResumeLayout(false);
            gbCadastrarProduto.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView dtgProdutos;
        private GroupBox gbCadastrarProduto;
        private TextBox txtPreco;
        private TextBox txtCategoria;
        private TextBox txtName;
        private Button btnCadastrar;
        private TextBox txtQuantidade;
        private Label label4;
        private Label label3;
        private Label label2;
        private Label label1;
        private Button btnListar;
        private TextBox txtCodigo;
        private Button btnBuscar;
        private Label label5;
        private Button btnBuscarNome;
        private TextBox textBox1;
        private Label label6;
    }
}
