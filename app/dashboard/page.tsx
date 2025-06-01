"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import ProprietarioDashboard from "../dashboards/ProprietarioDashboard";
// import EmpresaDashboard from "../dashboards/EmpresaDashboard";
// import InvestidorDashboard from "../dashboards/InvestidorDashboard";

export default function Dashboard({ userType }: { userType?: string }) {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("loggedUser");
      if (!storedUser) {
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setLoggedUser(parsedUser);

      if (parsedUser.role === "proprietario") {
        router.push("/proprietario");
      } else if (parsedUser.role === "empresa") {
        router.push("/empresa");
      } else if (parsedUser.role === "investidor") {
        router.push("/investidor");
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  if (!userType) return <div>Carregando...</div>;

//   if (userType === "proprietario") return <ProprietarioDashboard />;
//   if (userType === "empresa") return <EmpresaDashboard />;
//   if (userType === "investidor") return <InvestidorDashboard />;

  return <div>Tipo de usuário inválido.</div>;
}
