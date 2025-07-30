import { type PropsWithChildren, Children, useMemo } from 'react';
import clsx from 'clsx';
import './ImageParade.css';

export type ImageParadeProps = PropsWithChildren<{
  direction: 'left' | 'right';
}>;

export const ImageParade = ({ children, direction }: ImageParadeProps) => {
  const childrenArray = Children.toArray(children);
  const itemCount = childrenArray.length;

  const { duplicatedChildren, animationCycleLength } = useMemo(() => {
    if (itemCount === 0)
      return { duplicatedChildren: [], animationCycleLength: 0 };

    // For perfect equality and smooth infinite scrolling:
    // 1. Each item must appear exactly the same number of times
    // 2. The animation cycle must show each item for exactly the same duration
    // 3. We need enough total items for smooth infinite effect (no visible seams)

    // Calculate the least common multiple approach for perfect distribution
    // We want each item to appear at least 4 times to ensure smooth infinite scrolling
    const minRepetitionsPerItem = 4;

    // Create the perfectly balanced sequence
    const result = [];
    for (let repetition = 0; repetition < minRepetitionsPerItem; repetition++) {
      for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
        result.push(childrenArray[itemIndex]);
      }
    }

    // The animation should cycle through exactly one complete set of unique items
    // This ensures each item gets exactly equal display time
    const cycleLength = itemCount;

    return {
      duplicatedChildren: result,
      animationCycleLength: cycleLength,
    };
  }, [childrenArray, itemCount]);

  // Perfect distribution achieved: each item appears exactly the same number of times

  return (
    <div
      className={clsx('image-parade', `image-parade--${direction}`)}
      style={
        {
          '--item-count': itemCount,
          '--total-items': duplicatedChildren.length,
          '--animation-cycle-length': animationCycleLength,
        } as React.CSSProperties
      }
    >
      <ul className="image-parade__list">{duplicatedChildren}</ul>
    </div>
  );
};
