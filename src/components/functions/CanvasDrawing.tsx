import ld from 'lodash';
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Coordinate {
  x: number;
  y: number;
}

const DrawingApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [trajectory, setTrajectory] = useState<Coordinate[]>([]);
  const [trace, setTrace] = useState<Coordinate[][]>([]);

  const getNormalizedCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    const x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
    const y = (event.clientY - rect.top) * scaleY; // been adjusted to be relative to element

    // Normalize the coordinates to -1 to 1
    const normalizedX = (x / canvas.width) * 2 - 1;
    const normalizedY = -((y / canvas.height) * 2 - 1); // invert the y axis

    return { x: ld.round(normalizedX, 3), y: ld.round(normalizedY, 3) };
  };

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const coordinates = getNormalizedCoordinates(event);
      if (coordinates) {
        setTrajectory([coordinates]); // new trajectory
        setMousePosition(coordinates);
        setIsDrawing(true);
      }
    },
    [],
  );

  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isDrawing) {
        const newMousePosition = getNormalizedCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
          setTrajectory((prevTrajectory) => [
            ...prevTrajectory,
            newMousePosition,
          ]);
        }
      }
    },
    [isDrawing, mousePosition],
  );

  const finishDrawing = useCallback(() => {
    setIsDrawing(false);
    setMousePosition(undefined);
    setTrace((prevTrace) => [...prevTrace, trajectory]);
    // You can handle the trajectory array here, like sending it to a server or logging it
    console.log('Trajectory:', trace);
  }, [trace, trajectory]);

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'black';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      // Convert normalized coordinates back to canvas space
      const x1 = (originalMousePosition.x + 1) * (canvas.width / 2);
      const y1 = (-originalMousePosition.y + 1) * (canvas.height / 2);
      const x2 = (newMousePosition.x + 1) * (canvas.width / 2);
      const y2 = (-newMousePosition.y + 1) * (canvas.height / 2);

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.closePath();

      context.stroke();
    }
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mouseup', finishDrawing);
      canvas.addEventListener('mouseleave', finishDrawing);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mouseup', finishDrawing);
        canvas.removeEventListener('mouseleave', finishDrawing);
      }
    };
  }, [finishDrawing]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
      />
      {isDrawing && mousePosition && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
          }}
        >
          ({mousePosition.x}, {mousePosition.y})
        </div>
      )}
    </div>
  );
};

export default DrawingApp;
