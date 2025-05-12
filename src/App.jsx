import React, { useEffect, useState, useCallback } from 'react';
import SudokuGrid from './features/sudoku/components/SudokuGrid';
import useSudokuPuzzle from './features/sudoku/hooks/useSudokuPuzzle';
import Timer from './features/sudoku/components/Timer';
import Modal from './ui/Modal/Modal';
import { checkConflicts } from './features/sudoku/utils/checkConflicts';
import { getRelatedCells } from './features/sudoku/utils/getRelatedCells';
import './App.css';
import useWindowSize from './features/sudoku/hooks/useWindowSize';
import Confetti from 'react-confetti';
import Button from './ui/Button/Button';
import Loader from './ui/Loader/Loader';

const App = () => {
  // Fetch puzzle data and solution from the custom hook
  const { puzzle, solution, difficulty, loading, regeneratePuzzle } = useSudokuPuzzle();

  // State variables for user grid, conflicts, etc.
  const [userGrid, setUserGrid] = useState([]);  // Stores the user's progress in the game
  const [conflicts, setConflicts] = useState(new Set());  // Stores conflicting cells
  const [focusedCell, setFocusedCell] = useState(null);  // Focused cell coordinates
  const [relatedCells, setRelatedCells] = useState(new Set());  // Cells related to the focused cell
  const [seconds, setSeconds] = useState(0);  // Timer for the game
  const [paused, setPaused] = useState(false);  // Pause state
  const [history, setHistory] = useState([]);  // Stores the history of the grid for undo functionality
  const [isCompleted, setIsCompleted] = useState(false);  // Checks if the puzzle is completed
  const [resetGameModal, setResetGameModal] = useState(false);  // For reset modal
  const [error, setError] = useState('');  // Stores error messages

  const { width, height } = useWindowSize();  // Get window dimensions for Confetti

  // Effect to initialize the user grid and conflicts when a new puzzle is set
  useEffect(() => {
    if (puzzle) {
      const grid = puzzle.map((row) =>
        row.map((cell) => ({
          value: cell,
          candidates: [],
        }))
      );
      setUserGrid(grid);
      setConflicts(checkConflicts(puzzle));  // Check for initial conflicts
      setSeconds(0);
      setPaused(false);
      setIsCompleted(false);
    }
  }, [puzzle]);

  // Effect to check if the puzzle is solved or has conflicts
  useEffect(() => {
    if (!userGrid.length || !solution) return;

    // Check if the puzzle is solved
    const isSolved = userGrid.every((row, i) =>
      row.every((cell, j) => cell.value === solution[i][j])
    );

    // Check if the puzzle is fully filled
    const isFullyFilled = userGrid.every((row) =>
      row.every((cell) => cell.value !== 0)
    );

    const hasConflicts = conflicts.size > 0;

    if (isSolved) {
      setPaused(true);
      setIsCompleted(true);  // Game complete when puzzle is solved
    } else if (isFullyFilled && !hasConflicts && focusedCell) {
      setError('Your solution does not match with the provided solution');  // Error if solution is wrong
    }
  }, [userGrid, solution, conflicts, focusedCell]);

  // Effect to handle key events for input (numbers and delete)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!focusedCell || paused) return;  // Don't handle input when paused
      const { row, col } = focusedCell;

      if (puzzle[row][col] !== 0) return;  // Don't overwrite predefined cells

      if (e.key >= '1' && e.key <= '9') {
        updateCell(row, col, parseInt(e.key));  // Update cell with number input
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        updateCell(row, col, 0);  // Reset cell value
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);  // Cleanup
  }, [focusedCell, paused, puzzle, userGrid]);

  // Effect to pause the game when window loses focus
  useEffect(() => {
    const handleBlur = () => {
      if (!paused) setPaused(true);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);  // Cleanup
  }, [paused]);

  // Handles focusing on a cell and highlighting related cells
  const onFocusCell = (row, col) => {
    setFocusedCell({ row, col });
    setRelatedCells(getRelatedCells(row, col));  // Get related cells (row, column, box)
  };

  // Updates a specific cell in the user grid
  const updateCell = useCallback((row, col, value) => {
    if (puzzle[row][col] !== 0) return;  // Prevent overwriting predefined cells
    setHistory((prev) => [...prev, userGrid.map((r) => [...r])]);  // Save current state for undo

    const updated = userGrid.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col
          ? { value: value, candidates: [] }  // Update the value
          : cell
      )
    );

    setUserGrid(updated);
    setConflicts(checkConflicts(updated.map((row) => row.map((cell) => cell.value))));  // Recheck conflicts
  }, [userGrid, puzzle]);

  // Toggles the candidates for a cell
  const toggleCandidate = useCallback((row, col, num) => {
    const updated = userGrid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          const next = new Set(cell.candidates);
          next.has(num) ? next.delete(num) : next.add(num);  // Toggle candidate number
          return { ...cell, candidates: Array.from(next).sort() };  // Update candidates
        }
        return cell;
      })
    );
    setUserGrid(updated);
  }, [userGrid]);

  // Handles the undo action to revert to the previous grid state
  const handleUndo = () => {
    if (!history.length) return;
    const last = history.pop();
    setHistory([...history]);
    setUserGrid(last);
    setConflicts(checkConflicts(last.map((row) => row.map((cell) => cell.value))));
  };

  // Regenerates a new puzzle
  const regenerateNewPuzzle = () => {
    setConflicts(new Set());
    setIsCompleted(false);
    regeneratePuzzle();  // Trigger a new puzzle from the API or state
  };

  // Formats the timer into MM:SS format
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Resets the game to its initial state
  const handleReset = () => {
    const resetGrid = puzzle.map((row) =>
      row.map((cell) => ({
        value: cell,
        candidates: [],
      }))
    );
    setUserGrid(resetGrid);
    setConflicts(checkConflicts(puzzle));
    setHistory([]);
    setFocusedCell(null);
    setRelatedCells(new Set());
    setResetGameModal(false);
  };

  // Toggles the modals (paused, reset, completed)
  const handleModalToggle = (modalType, state) => {
    if (modalType === 'paused') setPaused(state);
    if (modalType === 'reset') setResetGameModal(state);
    if (modalType === 'completed') setIsCompleted(state);
  };

  // Display loading screen if puzzle or solution is not available
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
        onToggleCandidate={toggleCandidate}
        conflicts={conflicts}
        onFocusCell={onFocusCell}
        focusedCell={focusedCell}
        relatedCells={relatedCells}
      />

      <div className="buttons-container">
        <Button onClick={() => handleModalToggle('paused', true)} text="Pause" />
        <Button onClick={() => handleModalToggle('reset', true)} text="Reset" />
        <Button onClick={regenerateNewPuzzle} text="New Puzzle" />
        <Button onClick={handleUndo} disabled={!history.length} text="Undo" />
      </div>

      {error.length > 0 && <p className="error">{error}</p>}

      {paused && (
        <Modal title="Your game has been paused" onClose={() => handleModalToggle('paused', false)}>
          <button className="resume-button" onClick={() => handleModalToggle('paused', false)}>
            Resume
          </button>
        </Modal>
      )}

      {resetGameModal && (
        <Modal title="Reset the puzzle?" onClose={() => handleModalToggle('reset', false)}>
          <button className="resume-button" onClick={handleReset}>
            Yes
          </button>
        </Modal>
      )}

      {isCompleted && (
        <Modal
          title="CONGRATULATIONS!"
          onClose={() => handleModalToggle('completed', false)}
          confetti={<Confetti width={width} height={height} />}
        >
          <p>
            You finished a(n) <strong>{difficulty}</strong>
          </p>
          <p>
            puzzle in <strong>{formatTime(seconds)}</strong>
          </p>
          <button className="refresh-button" onClick={regenerateNewPuzzle}>
            Play Again
          </button>
        </Modal>
      )}
    </div>
  );
};

export default App;