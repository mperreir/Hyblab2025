import React from "react";

const BentoGrid = ({stats}) => {
    return (
        <section
            className="h-full w-full flex flex-col snap-start justify-center items-center min-h-screen bg-white gap-20"
            id="endpage"
        >
            <div className="h-screen w-screen p-10 bg-white text-gray-900 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6 text-black font-sans">En quelques statistiques</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-100 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center transition transform hover:scale-105"
                        >
                            <h3 className="text-lg font-semibold mb-2 text-gray-500">{stat.label}</h3>
                            <p className="text-2xl font-bold accent-text">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;