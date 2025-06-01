// ESSE ESTÁ ERRADO
export async function registrarUsuario({ nome, email, password, role }: {
  nome: string;
  email: string;
  password: string;
  role: string;
}) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro no registro:", errorData);
    throw new Error("Erro no registro");
  }

  return response.json();
}

export async function loginUsuario({ email, password }: {
  email: string;
  password: string;
}) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro no login:", errorData);
    throw new Error("Erro no login");
  }

  return response.json();
}
