export interface Project {
  id: number;
  projectName: string;
  location: string;
  areaHectares: number;
  carbonCredits: number;
  status: 'pending' | 'approved';
  txHash?: string;
  mintedAt?: string;
  imageUrl?: string;
  aiAnalysisNotes?: string;
}