import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ data }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState('');
  const [rouletteData, setRouletteData] = useState([]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        completeOption: item.text,
        option:
          item.text.length >= 30
            ? `${item.text.substring(0, 30).trimEnd()}...`
            : item.text,
      }));
      setRouletteData(formattedData);
    }
  }, [data]);

  if (!rouletteData || rouletteData.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <div align="center" className="roulette-container">
        <Wheel
          mustStartSpinning={mustSpin}
          spinDuration={0.5}
          prizeNumber={prizeNumber}
          data={rouletteData}
          outerBorderColor={["#000000"]}
          outerBorderWidth={4}
          innerBorderColor={["#000000"]}
          radiusLineColor={["#000000"]}
          radiusLineWidth={4}
          textColors={["#f5f5f5"]}
          textDistance={55}
          fontSize={25}
          backgroundColors={[
            "#3f297e",
            "#175fa9",
            "#169ed8",
            "#239b63",
            "#64b031",
            "#efe61f",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "#be1180",
            "#871f7f"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button
          className="button roulette-button"
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          {mustSpin ? "Girando..." : "Girar"}
        </button>
      </div>
      <br />
      <div className="prize-message">
        {!mustSpin && rouletteData[prizeNumber] ? (
            <>
            Resultado: <strong>{rouletteData[prizeNumber].completeOption}</strong>
            </>
        ) : (
            " "
        )}
      </div>
    </>
  );
};

export default Roulette;
