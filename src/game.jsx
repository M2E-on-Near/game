import React, {useEffect, useRef, useState} from "react";

const Game = ({isGameStarted, setIsGameStarted, setScore, jumpTrigger}) => {
    const [imageUrl, setImageUrl] = useState('https://raw.githubusercontent.com/mdbootstrap/knowledge-base/main/JS/games/dino-game/img/trex.png');
    const dino = useRef();
    const cactus = useRef();


    const [dinoClass, setDinoClass] = useState('');
    const [cactusClass, setCactusClass] = useState('');

    function jump() {
        if (dinoClass !== "jump") {
            setDinoClass('jump');

            setTimeout(function () {
                setDinoClass('');
            }, 300);
        }
    }

    useEffect(()=> {
        jump();
    }, [jumpTrigger]);

    const cactusInterval = useRef(0);
    const scoreInterval = useRef(0);

    useEffect(()=>{
        if(isGameStarted) start();
        else end();
    }, [isGameStarted]);
    function start() {
        setIsGameStarted(true);
        setScore(0);
        setCactusClass('moving-obstacle');
        cactusInterval.current = setInterval(() => {
            // get current dino Y position
            const dinoTop = parseInt(window.getComputedStyle(dino.current).getPropertyValue("top"));

            // get current cactus X position
            const cactusLeft = parseInt(
                window.getComputedStyle(cactus.current).getPropertyValue("left")
            );

            // detect collision
            if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
                // collision
                end();
            }

        }, 25);

        scoreInterval.current = setInterval(() => {
            setScore(s => s+1);
        }, 200);
    }


    function end() {
        setCactusClass('');
        clearInterval(cactusInterval.current);
        clearInterval(scoreInterval.current);
        setIsGameStarted(false);
        // alert("Game Over!");
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const img = url.searchParams.get('img');
        if (img) setImageUrl(img);
    }, []);

    return (
        <div className="game">
            <div ref={dino} className={'dino ' + dinoClass} style={{backgroundImage: `url(${imageUrl})`}}/>
            <div ref={cactus} className={'cactus ' + cactusClass} />
        </div>
    )
}

export default Game;