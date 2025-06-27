import { getProgressData } from '@/lib/progress-utils';
import ProgressClient from './progress-client';

export default async function ProgressPage() {
  const progressData = await getProgressData();
  
  return <ProgressClient progressData={progressData} />;
}