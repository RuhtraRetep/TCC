namespace PapelariaProtipo
{
    partial class FormTelaPrincipal
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            cmdTipo = new ComboBox();
            txtDescricao = new TextBox();
            txtValorInserido = new TextBox();
            btnSalvar = new Button();
            label4 = new Label();
            label5 = new Label();
            btnRelatorio = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold);
            label1.Location = new Point(79, 62);
            label1.Name = "label1";
            label1.Size = new Size(44, 20);
            label1.TabIndex = 0;
            label1.Text = "Tipo:";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold);
            label2.Location = new Point(43, 129);
            label2.Name = "label2";
            label2.Size = new Size(80, 20);
            label2.TabIndex = 1;
            label2.Text = "Descrição:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold);
            label3.Location = new Point(73, 197);
            label3.Name = "label3";
            label3.Size = new Size(50, 20);
            label3.TabIndex = 2;
            label3.Text = "Valor:";
            // 
            // cmdTipo
            // 
            cmdTipo.DropDownStyle = ComboBoxStyle.DropDownList;
            cmdTipo.FormattingEnabled = true;
            cmdTipo.Items.AddRange(new object[] { "Entrada", "Saída" });
            cmdTipo.Location = new Point(147, 63);
            cmdTipo.Name = "cmdTipo";
            cmdTipo.Size = new Size(153, 23);
            cmdTipo.TabIndex = 3;
            // 
            // txtDescricao
            // 
            txtDescricao.Location = new Point(147, 130);
            txtDescricao.Name = "txtDescricao";
            txtDescricao.Size = new Size(153, 23);
            txtDescricao.TabIndex = 4;
            // 
            // txtValorInserido
            // 
            txtValorInserido.Location = new Point(147, 198);
            txtValorInserido.Name = "txtValorInserido";
            txtValorInserido.Size = new Size(153, 23);
            txtValorInserido.TabIndex = 5;
            txtValorInserido.KeyPress += txtValorInserido_KeyPress;
            // 
            // btnSalvar
            // 
            btnSalvar.BackColor = Color.LimeGreen;
            btnSalvar.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnSalvar.Location = new Point(151, 250);
            btnSalvar.Name = "btnSalvar";
            btnSalvar.Size = new Size(108, 32);
            btnSalvar.TabIndex = 6;
            btnSalvar.Text = "SALVAR";
            btnSalvar.UseVisualStyleBackColor = false;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label4.Location = new Point(12, 9);
            label4.Name = "label4";
            label4.Size = new Size(61, 20);
            label4.TabIndex = 7;
            label4.Text = "Status: ";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label5.Location = new Point(79, 12);
            label5.Name = "label5";
            label5.Size = new Size(14, 17);
            label5.TabIndex = 8;
            label5.Text = "?";
            // 
            // btnRelatorio
            // 
            btnRelatorio.BackColor = Color.DodgerBlue;
            btnRelatorio.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnRelatorio.Location = new Point(360, 22);
            btnRelatorio.Name = "btnRelatorio";
            btnRelatorio.Size = new Size(125, 38);
            btnRelatorio.TabIndex = 9;
            btnRelatorio.Text = "Relatório";
            btnRelatorio.UseVisualStyleBackColor = false;
            // 
            // FormTelaPrincipal
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.ActiveCaption;
            ClientSize = new Size(497, 334);
            Controls.Add(btnRelatorio);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(btnSalvar);
            Controls.Add(txtValorInserido);
            Controls.Add(txtDescricao);
            Controls.Add(cmdTipo);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Name = "FormTelaPrincipal";
            Text = "Movimentações";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private Label label2;
        private Label label3;
        private ComboBox cmdTipo;
        private TextBox txtDescricao;
        private TextBox txtValorInserido;
        private Button btnSalvar;
        private Label label4;
        private Label label5;
        private Button btnRelatorio;
    }
}