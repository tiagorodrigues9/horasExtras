// =========================
// Login e Cadastro de Usuário
// =========================
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const mensagemEl = document.getElementById("mensagem");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      } else {
        mensagemEl.textContent = data.error || "Erro ao fazer login";
        mensagemEl.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      mensagemEl.textContent = "Erro de conexão com o servidor";
      mensagemEl.style.color = "red";
    }
  });
}

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });
      const data = await res.json();

      if (res.ok) {
        mensagemEl.textContent = "Usuário cadastrado com sucesso!";
        mensagemEl.style.color = "green";
        cadastroForm.reset();
        setTimeout(() => window.location.href = "/login", 1500);
      } else {
        mensagemEl.textContent = data.error || "Erro ao cadastrar usuário";
        mensagemEl.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      mensagemEl.textContent = "Erro de conexão com o servidor";
      mensagemEl.style.color = "red";
    }
  });
}

// =========================
// Logout
// =========================
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  });
}

// =========================
// Cadastro de Cliente
// =========================
const clienteForm = document.getElementById("clienteForm");
const cnpjInput = document.getElementById("cnpj");

if (cnpjInput) {
  // Formatação automática do CNPJ
  cnpjInput.addEventListener("input", () => {
    let value = cnpjInput.value.replace(/\D/g, "");
    if (value.length > 14) value = value.slice(0, 14);

    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");

    cnpjInput.value = value;
  });
}

if (clienteForm) {
  clienteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        mensagemEl.textContent = "Faça login para cadastrar clientes";
        mensagemEl.style.color = "red";
        return;
      }

      const res = await fetch("/clientes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nome, endereco, cnpj })
      });

      const data = await res.json();

      if (res.ok) {
        mensagemEl.textContent = "Cliente cadastrado com sucesso!";
        mensagemEl.style.color = "green";
        clienteForm.reset();

        // Redirecionar automaticamente para a home
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      } else {
        mensagemEl.textContent = data.error || "Erro ao cadastrar cliente";
        mensagemEl.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      mensagemEl.textContent = "Erro de conexão com o servidor";
      mensagemEl.style.color = "red";
    }
  });
}

// =========================
// Home - Timer e Atendimento
// =========================
const clienteSelect = document.getElementById("clienteSelect");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timerDisplay = document.getElementById("timer");
const observacao = document.getElementById("observacao");

let timerInterval;
let startTime;

if (clienteSelect) {
  const token = localStorage.getItem("token");
  fetch("/clientes", { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => {
      clienteSelect.innerHTML = '<option value="">Selecione</option>';
      data.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c._id;
        opt.textContent = c.nome;
        clienteSelect.appendChild(opt);
      });
    })
    .catch(err => console.error(err));
}

const formatTime = ms => {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

if (startBtn && stopBtn) {
  startBtn.addEventListener("click", () => {
    if (!clienteSelect.value) {
      alert("Selecione um cliente antes de iniciar o atendimento.");
      return;
    }
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startTime = Date.now();

    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsed);
    }, 1000);
  });

  stopBtn.addEventListener("click", async () => {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(timerInterval);

    const elapsed = Date.now() - startTime;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/atendimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          clienteId: clienteSelect.value,
          duracao: elapsed,
          observacao: observacao.value
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Atendimento salvo com sucesso!");
        timerDisplay.textContent = "00:00:00";
        observacao.value = "";
      } else {
        alert(data.error || "Erro ao salvar atendimento");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor");
    }
  });
}

// =========================
// Perfil
// =========================
const perfilForm = document.getElementById("perfilForm");

if (perfilForm) {
  const token = localStorage.getItem("token");

  // Carregar dados do usuário
  const carregarPerfil = async () => {
    try {
      const res = await fetch("/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        document.getElementById("nome").value = data.nome || "";
        document.getElementById("email").value = data.email || "";
      } else {
        mensagemEl.textContent = data.error || "Erro ao carregar perfil";
        mensagemEl.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      mensagemEl.textContent = "Erro de conexão com o servidor";
      mensagemEl.style.color = "red";
    }
  };

  carregarPerfil();

  // Atualizar perfil
  perfilForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", document.getElementById("nome").value.trim());
    const fotoFile = document.getElementById("foto").files[0];
    if (fotoFile) formData.append("foto", fotoFile);

    try {
      const res = await fetch("/auth/perfil", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        mensagemEl.textContent = "Perfil atualizado com sucesso!";
        mensagemEl.style.color = "green";
      } else {
        mensagemEl.textContent = data.error || "Erro ao atualizar perfil";
        mensagemEl.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      mensagemEl.textContent = "Erro de conexão com o servidor";
      mensagemEl.style.color = "red";
    }
  });
}
