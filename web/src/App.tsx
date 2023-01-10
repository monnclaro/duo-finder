import axios from "axios";
import "./styles/main.css";

import * as Dialog from "@radix-ui/react-dialog";
import LogoImage from "./assets/logo-nlw-esports.svg";

import { useEffect, useState } from "react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { CreateAdBanner } from "./components/CreateAdBanner";

interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3000/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="mx-auto my-20 flex max-w-[1344px] select-none flex-col items-center">
      <img src={LogoImage} alt="" />

      <h1 className="mt-20 text-6xl font-black text-white">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="mt-16 grid grid-cols-6 gap-6">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerURL}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
