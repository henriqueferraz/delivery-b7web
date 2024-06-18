import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        ... Página Inicial ...<br />
        Clique para para acessar o<Link href='/b7burger/login'><strong> B7 - BURGER </strong></Link><br />
        Clique aqui para acessar o<Link href='/b7pizza/login'><strong> B7 - Pizza </strong></Link><br />
        para logar <br />
        usuário: teste@teste.com.br<br />
        senha: teste<br />
      </div>
    </>
  );
}
