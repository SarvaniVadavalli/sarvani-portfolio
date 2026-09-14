import { useSectionNavigation } from './hooks/useSectionNavigation';
import PortfolioShell from './components/navigation/PortfolioShell';

export default function App() {
  const navState = useSectionNavigation();

  return <PortfolioShell navState={navState} />;
}
