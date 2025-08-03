import { Button } from '../components/Button/Button';
import { useTheme } from '../hooks/useTheme/useTheme';

export function MockedThemeButton({
  newTheme,
}: {
  newTheme: 'dark' | 'light';
}) {
  const { setTheme } = useTheme();
  return <Button text="theme" onClick={() => setTheme(newTheme)}></Button>;
}
