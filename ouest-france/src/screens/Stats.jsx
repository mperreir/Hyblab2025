import React from "react";

const BentoGrid = ({ stats, player }) => {
  return (
    <div className="flex justify-center items-center bg-white snap-start p-8 h-screen w-screen">
      <div className="h-full w-full grid grid-cols-[repeat(16,minmax(4vw,1fr))] grid-rows-[repeat(5,minmax(10vh,1fr))] gap-6">
        <div className="col-start-1 row-start-1 col-span-4 row-span-3 p-10 rounded-2xl border-2 border-black">
          <div className="flex flex-col justify-between w-full h-full">
            <h1 className="text-black text-[96px]">{stats[0].value}</h1>
            <div className="flex flex-col gap-4">
              <div className="h-[2px] bg-black w-full"></div>
              <p className="text-black italic">{stats[0].label}</p>
            </div>
          </div>
        </div>
        <div className="relative col-start-5 row-start-1 col-span-4 row-span-3 bg-[#CC2229] rounded-2xl p-10 border-2 border-[#CC2229]">
          <div className="flex flex-col justify-between w-full h-full">
            <div className="flex flex-col gap-4">
              <p className="italic">{stats[2].label}</p>
              <div className="h-[2px] bg-white w-full"></div>
            </div>

            <h1 className="text-[64px] leading-none w-1/2">
              {stats[2].value}
              <span className="font-variant-position-super">EME</span> MONDIAL
            </h1>
            <div className="absolute bottom-32 right-5 w-26 md:w-32 lg:w-48 xl:w-56">
              <img
                className="w-full h-auto object-contain"
                src="./icon/icon_bento_1.svg"
                alt="Icon"
              />
            </div>
          </div>
        </div>
        <div className="relative col-start-9 row-start-1 col-span-8 row-span-3 bg-gray-300 rounded-2xl">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src={stats[5].path}
          ></img>
          <div className="absolut">
            {console.log(player)}
            {player === "player1" && (
              <h1 className="absolute left-5 top-5 text-white text-[64px] leading-none w-1/2">
                MATTHIEU PAVON
              </h1>
            )}

            {player === "player2" && (
              <h1 className="absolute left-5 top-5 text-white text-[64px] leading-none w-1/2">
                CELINE BOUTIER
              </h1>
            )}
          </div>
        </div>

        <div className="col-start-1 row-start-4 col-span-10 row-span-2 bg-[#CC2229] rounded-2xl p-10 border-2 border-[#CC2229]">
          <div className="flex flex-col justify-end w-full h-full">
            <div className="h-2/3 w-full grid grid-cols-4 grid-row-1 gap-4">
              <div className="relative col-start-1 col-span-1 row-span-1 rounded-2xl flex justify-center items-end">
                <h1 className="text-[32px] font-bold">{stats[3].date0}</h1>
                <div className="absolute bottom-0 left-8">
                  <img src="./icon/small_flag.svg"></img>
                </div>
              </div>
              <div className="relative col-start-2 col-span-1 row-span-1 rounded-2xl flex justify-center items-end">
                <h1 className="text-[32px] font-bold">{stats[3].date1}</h1>
                <div>
                  <img className="absolute bottom-0 left-8" src="./icon/small_flag.svg"></img>
                </div>
              </div>
              <div className="relative col-start-3 col-span-2 row-span-1 rounded-2xl flex flex-col justify-end items-center">
                <h1 className="text-[32px] font-bold">{stats[3].date2}</h1>
                <p className="italic">{stats[3].info2}</p>
                <div>
                  <img className="absolute bottom-0 left-8" src="./icon/big_flag.svg"></img>
                </div>
              </div>
            </div>

            <div className="h-1/3 w-full grid grid-cols-4 grid-row-1 gap-4">
              <div className="col-start-1 col-span-1 row-span-1 bg-white rounded-2xl flex justify-center items-center">
                <p className="text-black">{stats[3].value0}</p>
              </div>
              <div className="col-start-2 col-span-1 row-span-1 bg-white rounded-2xl flex justify-center items-center">
                <p className="text-black">{stats[3].value1}</p>
              </div>
              <div className="col-start-3 col-span-2 row-span-1 bg-white rounded-2xl flex justify-center items-center">
                <p className="text-black font-bold">{stats[3].value2}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-start-11 row-start-4 col-span-3 row-span-2 bg-white rounded-2xl p-10 border-2 border-black">
          <div className="flex flex-col justify-between w-full h-full">
            <h1 className="text-black text-[32px]">{stats[4].value}</h1>
            <div className="flex flex-col gap-4">
              <div className="h-[2px] bg-black w-full"></div>
              <p className="text-black italic">{stats[4].label}</p>
            </div>
          </div>
        </div>
        <div className="col-start-14 row-start-4 col-span-3 row-span-2 bg-[#CC2229] rounded-2xl p-10 border-2 border-[#CC2229]">
          <div className="flex flex-col justify-between w-full h-full">
            <h1 className="text-[32px]">{stats[1].value}</h1>
            <div className="flex flex-col gap-4">
              <div className="h-[2px] bg-white w-full"></div>
              <p className="italic">{stats[1].label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
