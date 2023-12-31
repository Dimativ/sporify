"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

import PlayerContent from "./player-content";

const Player = () => {

    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);

    // load a mp3 file from storage

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
            <PlayerContent song={song} songUrl={songUrl} key={songUrl}/>
        </div>
    );
}

export default Player;