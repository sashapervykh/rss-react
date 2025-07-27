import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

export function BreakingButton() {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error) throw new Error('Congratulations! You crashed the app!');
  }, [error]);

  return (
    <Button
      text="BREAK!"
      onClick={() => {
        setError(true);
      }}
    />
  );
}
