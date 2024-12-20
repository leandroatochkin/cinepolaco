import React, { useState } from "react";
import style from "./LayoutDesigner.module.css";

const LayoutDesigner = ({ rows, cols, colors }) => {
  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(() => Array(cols).fill(null))
  );
  const [selectedColor, setSelectedColor] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedColor) {
      const newGrid = [...grid];
      newGrid[row][col] = selectedColor;
      setGrid(newGrid);
    }
  };

  const handleClear = () => {
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(null)));
  };

  const exportGrid = () => {
    console.log(grid);
    alert("Grid data exported to console.");
  };

  return (
    <div className={style.gridDesigner}>
      <div className={style.colorPicker}>
        {colors.map((color) => (
          <button
            key={color}
            className={`${style.colorButton} ${selectedColor === color ? style.selected : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></button>
        ))}
      </div>
      <div className={style.grid}>
        {grid.map((row, rowIndex) => (
          <div className={style.gridRow} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={style.gridCell}
                style={{ backgroundColor: cell || "white" }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={style.controls}>
        <button onClick={handleClear}>Clear Grid</button>
        <button onClick={exportGrid}>Export Layout</button>
      </div>
    </div>
  );
};

export default LayoutDesigner;