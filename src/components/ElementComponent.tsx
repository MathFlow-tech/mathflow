import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import Element from '../model/Element';
import { Side } from '../model/Equation';

interface Props {
  element: Element;
  index: number;
  onSimplify: (index: number, side: Side) => void;
}

const ElementComponent = ({ element, index, onSimplify }: Props) => {
  const symbol = index === 0 && !element.positive ? '-' : '';
  const variables = element.variables.reduce(
    (acc, variable) => acc + variable.type,
    ''
  );
  const value =
    symbol +
    (element.variables.length > 0 && element.constant.value === 1
      ? variables
      : element.constant.value + variables);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.ELEMENT,
      canDrag: () => {
        return value !== '0';
      },
      item: { index, element },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [value, index, element]
  );

  const onClick = () => {
    onSimplify(index, element.side);
  };

  return (
    <div className="variable" onClick={onClick}>
      <p ref={drag} className={isDragging ? 'dragging' : ''}>
        {value}
      </p>
      {element.denominator !== 1 && (
        <>
          <div className="divisor-line" />
          <p>{element.denominator}</p>
        </>
      )}
    </div>
  );
};

export default ElementComponent;
