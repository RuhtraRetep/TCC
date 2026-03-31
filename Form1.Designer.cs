namespace PapelariaProtipo
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
            txtValorInicial = new TextBox();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            lblStatus = new Label();
            btnAbrirFechar = new Button();
            dtpData = new DateTimePicker();
            SuspendLayout();
            // 
            // txtValorInicial
            // 
            txtValorInicial.Location = new Point(208, 146);
            txtValorInicial.Name = "txtValorInicial";
            txtValorInicial.Size = new Size(151, 23);
            txtValorInicial.TabIndex = 0;
            txtValorInicial.KeyPress += txtValorInicial_KeyPress;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label1.Location = new Point(15, 144);
            label1.Name = "label1";
            label1.Size = new Size(175, 21);
            label1.TabIndex = 3;
            label1.Text = "Valor Inicial do Caixa:";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label2.Location = new Point(46, 18);
            label2.Name = "label2";
            label2.Size = new Size(46, 20);
            label2.TabIndex = 4;
            label2.Text = "Data:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label3.Location = new Point(37, 71);
            label3.Name = "label3";
            label3.Size = new Size(57, 20);
            label3.TabIndex = 6;
            label3.Text = "Status:";
            // 
            // lblStatus
            // 
            lblStatus.AutoSize = true;
            lblStatus.BackColor = Color.Red;
            lblStatus.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblStatus.Location = new Point(108, 73);
            lblStatus.Name = "lblStatus";
            lblStatus.Size = new Size(59, 17);
            lblStatus.TabIndex = 7;
            lblStatus.Text = "Fechado";
            // 
            // btnAbrirFechar
            // 
            btnAbrirFechar.BackColor = Color.LimeGreen;
            btnAbrirFechar.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnAbrirFechar.Location = new Point(117, 221);
            btnAbrirFechar.Name = "btnAbrirFechar";
            btnAbrirFechar.Size = new Size(125, 36);
            btnAbrirFechar.TabIndex = 8;
            btnAbrirFechar.Text = "ABRIR";
            btnAbrirFechar.UseVisualStyleBackColor = false;
            btnAbrirFechar.Click += btnAbrirFechar_Click;
            // 
            // dtpData
            // 
            dtpData.CalendarFont = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dtpData.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dtpData.Location = new Point(108, 18);
            dtpData.Name = "dtpData";
            dtpData.Size = new Size(260, 23);
            dtpData.TabIndex = 9;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.ActiveCaption;
            ClientSize = new Size(416, 288);
            Controls.Add(dtpData);
            Controls.Add(btnAbrirFechar);
            Controls.Add(lblStatus);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(txtValorInicial);
            Name = "Form1";
            Text = "CAIXA";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtValorInicial;
        private Label label1;
        private Label label2;
        private Label label3;
        private Label lblStatus;
        private Button btnAbrirFechar;
        private DateTimePicker dtpData;
    }
}
