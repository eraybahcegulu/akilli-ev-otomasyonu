import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import GithubCorner from "react-github-corner";
import { useAuth } from "../components/useAuth";

export default function Home() {
  const router = useRouter();
  const { pending, isSignedIn, user, auth } = useAuth();

  if (isSignedIn) {
    router.push("/panel");
  }

  return pending || isSignedIn ? (
    <span>Yükleniyor...</span>
  ) : (
    <div className="h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <GithubCorner
        direction="left"
        href="https://github.com/EmirhanKarahan/akilli-ev"
        target={"_blank"}
      />
      <div className="flex flex-col justify-between site-4xl-container h-screen">
        <Head>
          <meta
            name="description"
            content="2022-2023 Bitirme Projesi Akıllı Ev Otomasyon Projesi"
          />
        </Head>

        <header className="h-10 mt-5 pr-5 flex flex-row-reverse">
          <Link
            className="pt-1.5 pl-1 pr-1 border-2 rounded-xl border-black hover:bg-black transition duration-500 hover:text-white underline-offset-2"
            href="/login"
          >
            Giriş Yap
          </Link>
        </header>

        <main>
          <h1 className="mb-auto text-4xl text-center">
            Akıllı Ev Yönetim Sistemine Hoşgeldiniz
          </h1>
        </main>

        <footer className="border-t-2 mb-0 p-4 text-center border-black">
          2022-2023 DPU Bilgisayar Müh. Bölümü
        </footer>
      </div>
    </div>
  );
}
