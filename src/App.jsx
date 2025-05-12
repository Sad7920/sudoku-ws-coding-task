import React, { useEffect, useState } from 'react';
import SudokuGrid from './features/sudoku/components/SudokuGrid';
import useSudokuPuzzle from './features/sudoku/hooks/useSudokuPuzzle';
import Timer from './features/sudoku/components/Timer';
import Modal from './ui/Modal/Modal';
import { checkConflicts } from './features/sudoku/utils/checkConflicts';
import { getRelatedCells } from './features/sudoku/utils/getRelatedCells';
import './index.css';
import useWindowSize from './features/sudoku/hooks/useWindowSize'
import Confetti from 'react-confetti'
import Button from './ui/Button/Button';
import Loader from './ui/Loader/Loader';

const App = () => {
  const { puzzle, solution, difficulty, loading, regeneratePuzzle } = useSudokuPuzzle();
  const [userGrid, setUserGrid] = useState([]);
  const [conflicts, setConflicts] = useState(new Set());
  const [focusedCell, setFocusedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [relatedCells, setRelatedCells] = useState(new Set());
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resetGameModal, setResetGameModal] = useState(false)

  const { width, height } = useWindowSize()

  useEffect(() => {
    if (puzzle) {
      const grid = puzzle.map(row =>
        row.map(cell => ({
          value: cell,
          candidates: [],
        }))
      );
      setUserGrid(grid);
      setConflicts(checkConflicts(puzzle));
      setSeconds(0);
      setPaused(false);
      setIsCompleted(false)
    }
  }, [puzzle]);
  console.log(userGrid);



  useEffect(() => {
    if (!userGrid.length || !solution) return;

    const isSolved = userGrid.every((row, i) =>
      row.every((cell, j) => cell.value === solution[i][j])
    );

    if (isSolved) {
      setPaused(true);
      setIsCompleted(true);
    }
  }, [userGrid, solution]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!focusedCell || paused) return;
      const { row, col } = focusedCell;

      if (puzzle[row][col] !== 0) return;

      if (e.key >= '1' && e.key <= '9') {
        updateCell(row, col, parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        updateCell(row, col, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedCell, paused, puzzle, userGrid]);

  useEffect(() => {
    const handleBlur = () => {
      if (!paused) setPaused(true);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [paused]);

  const onFocusCell = (row, col) => {
    setFocusedCell({ row, col });
    setRelatedCells(getRelatedCells(row, col));
  };

  const updateCell = (row, col, value) => {
    if (puzzle[row][col] !== 0) return;
    setHistory(prev => [...prev, userGrid.map(r => [...r])]);

    const updated = userGrid.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col
          ? { value: value, candidates: [] }
          : cell
      )
    );

    setUserGrid(updated);
    setConflicts(checkConflicts(updated.map(row => row.map(cell => cell.value))));
  };

  const toggleCandidate = (row, col, num) => {
    const updated = userGrid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          const next = new Set(cell.candidates);
          next.has(num) ? next.delete(num) : next.add(num);
          return { ...cell, candidates: Array.from(next).sort() };
        }
        return cell;
      })
    );
    setUserGrid(updated);
  };

  const handleUndo = () => {
    if (!history.length) return;
    const last = history.pop();
    setHistory([...history]);
    setUserGrid(last);
    setConflicts(checkConflicts(last.map(row => row.map(cell => cell.value))));
  };

  const regenerateNewPuzzle = () => {
    setConflicts(new Set())
    regeneratePuzzle();
  }
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleReset = () => {
    const resetGrid = puzzle.map(row =>
      row.map(cell => ({
        value: cell,
        candidates: [],
      }))
    );
    setUserGrid(resetGrid);
    setConflicts(checkConflicts(puzzle));
    setHistory([]);
    setFocusedCell(null);
    setRelatedCells(new Set());
    setResetGameModal(false)
  };

  if (loading || !puzzle || !solution) return <Loader />;

  return (
    <div className="app-container">
      <h1 className="title">Sudoku</h1>

      <div className="top-bar">
        <p className="difficulty">Difficulty: <strong>{difficulty}</strong></p>
        <div className="right-controls">
          <Timer seconds={seconds} setSeconds={setSeconds} paused={paused} />
        </div>
      </div>

      <SudokuGrid
        puzzle={userGrid}
        original={puzzle}
        onCellChange={updateCell}
        onToggleCandidate={toggleCandidate}
        conflicts={conflicts}
        onFocusCell={onFocusCell}
        focusedCell={focusedCell}
        relatedCells={relatedCells}
        hoveredCell={hoveredCell}
        setHoveredCell={setHoveredCell}
      />
      <div className='buttons-container'>
        <Button onClick={() => setPaused(true)} text="Pause" />
        <Button onClick={() => setResetGameModal(true)} text="Reset" />
        <Button onClick={regenerateNewPuzzle} text="New Puzzle" />
        <Button onClick={handleUndo} disabled={!history.length} text="Undo" />
      </div>

      {paused && (
        <Modal show title="Your game has been paused" onClose={() => setPaused(false)}>
          <button className="resume-button" onClick={() => setPaused(false)}>Resume</button>
        </Modal>
      )}
      {resetGameModal && (
        <Modal show title="Reset the puzzle?" onClose={() => setResetGameModal(false)}>
          <button className="resume-button" onClick={handleReset}>Yes</button>
        </Modal>
      )}
      {isCompleted && (
        <Modal show title="CONGRATULATIONS!" onClose={() => setIsCompleted(false)} confetti={<Confetti
          width={width}
          height={height}
        />}>
          <paused>You finished an <strong>{difficulty}</strong></paused>
          <p>
            puzzle in <strong>{formatTime(seconds)}</strong>
          </p>
          <button className="refresh-button" onClick={regenerateNewPuzzle}>Play Again</button>
        </Modal>
      )}
    </div>
  );
};

export default App;


