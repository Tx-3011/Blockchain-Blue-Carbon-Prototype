import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { CREDITS_PER_HECTARE } from '../constants';
import { MintIcon, UploadIcon, SparklesIcon } from './Icons';

interface ProjectFormProps {
  walletConnected: boolean;
  onProjectSubmitted: (project: Omit<Project, 'id' | 'status' | 'txHash' | 'mintedAt'>) => void;
  onConnectWallet: () => void;
}

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

const ProjectForm = ({ walletConnected, onProjectSubmitted, onConnectWallet }: ProjectFormProps) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [areaHectares, setAreaHectares] = useState('');
  const [carbonCredits, setCarbonCredits] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiAnalysisNotes, setAiAnalysisNotes] = useState<string>('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
        setError('Unsupported format. Please upload a PNG, JPG, or WebP file.');
        setImageFile(null);
        setImagePreview(null);
        e.target.value = ''; // Reset the input
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAreaHectares('');
      setAiAnalysisNotes('');
      setError('');
    }
  };

  const handleAiAnalysis = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError('');
    try {
      const { GoogleGenAI, Type } = await import('@google/genai');
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Image = await fileToBase64(imageFile);
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: imageFile.type,
                data: base64Image,
              },
            },
            {
              text: "You are an expert in blue carbon ecosystems. Analyze this image of a coastal area. Your primary goal is to estimate the land area in hectares covered by mangroves. Provide a brief analysis of your findings, including mangrove density and health if possible. Respond ONLY with a valid JSON object.",
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedHectares: {
                type: Type.NUMBER,
                description: "The estimated area in hectares."
              },
              analysisNotes: {
                type: Type.STRING,
                description: "A brief summary of the analysis."
              },
            },
            required: ["estimatedHectares", "analysisNotes"],
          },
        },
      });

      const result = JSON.parse(response.text);
      setAreaHectares(result.estimatedHectares.toFixed(2));
      setAiAnalysisNotes(result.analysisNotes);

    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const area = parseFloat(areaHectares);
    if (!isNaN(area) && area > 0) {
      setCarbonCredits(area * CREDITS_PER_HECTARE);
    } else {
      setCarbonCredits(0);
    }
  }, [areaHectares]);

  const resetForm = useCallback(() => {
    setProjectName('');
    setLocation('');
    setAreaHectares('');
    setCarbonCredits(0);
    setImageFile(null);
    setImagePreview(null);
    setAiAnalysisNotes('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !location || !areaHectares || !imagePreview) {
      setError('All fields and an image analysis are required.');
      return;
    }
    const area = parseFloat(areaHectares);
    if (isNaN(area) || area <= 0) {
        setError('Area must be a positive number from AI analysis.');
        return;
    }
    
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProject = {
      projectName,
      location,
      areaHectares: area,
      carbonCredits: area * CREDITS_PER_HECTARE,
      imageUrl: imagePreview,
      aiAnalysisNotes,
    };

    onProjectSubmitted(newProject);
    setIsSubmitting(false);
    setSuccessMessage('Project submitted for approval!');
    resetForm();

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="card p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 text-white">Submit Project for Approval</h2>
        <p className="text-dark-400">Upload your coastal area images and get AI-powered carbon credit analysis</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-dark-300 mb-2">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input-field w-full"
            placeholder="e.g., Sundarbans Restoration"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-dark-300 mb-2">Location (Coordinates)</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field w-full"
            placeholder="e.g., 21.9497° N, 89.1833° E"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">Project Image</label>
          <div className="flex justify-center px-6 pt-8 pb-8 border-2 border-dark-600 border-dashed rounded-xl glass hover:border-accent-500/50 transition-colors">
            <div className="space-y-3 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Project preview" className="mx-auto h-40 w-auto rounded-xl border border-dark-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              ) : (
                <div className="relative">
                  <UploadIcon className="mx-auto h-16 w-16 text-dark-500" />
                  <div className="absolute -inset-2 bg-accent-500/10 rounded-full blur-lg"></div>
                </div>
              )}
              <div className="flex text-sm text-dark-400">
                <label htmlFor="file-upload" className="relative cursor-pointer glass rounded-lg px-4 py-2 font-medium text-accent-400 hover:text-accent-300 transition-colors">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                </label>
                <p className="pl-2 self-center">or drag and drop</p>
              </div>
              <p className="text-xs text-dark-500">PNG, JPG, WebP supported</p>
            </div>
          </div>
        </div>

        {imageFile && (
          <button
            type="button"
            onClick={handleAiAnalysis}
            disabled={isAnalyzing || !!aiAnalysisNotes}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing with AI...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" /> 
                {aiAnalysisNotes ? 'Analysis Complete' : 'Analyze with AI'}
              </>
            )}
          </button>
        )}
        
        {aiAnalysisNotes && (
          <div className="glass p-6 rounded-xl border-l-4 border-accent-500 space-y-4">
             <div className="flex items-center gap-3 text-lg font-bold text-accent-400">
                <SparklesIcon className="h-6 w-6"/>
                AI Analysis Result
             </div>
             <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Estimated Area (hectares)</label>
                <input type="text" value={areaHectares} readOnly className="input-field w-full bg-dark-800/50" />
             </div>
             <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Analysis Notes</label>
                <p className="text-sm text-dark-200 glass p-4 rounded-xl">{aiAnalysisNotes}</p>
             </div>
          </div>
        )}

        <div className="glass p-6 rounded-xl text-center border border-accent-500/30">
          <p className="text-sm text-dark-400 mb-2">Calculated Carbon Credits upon Approval</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-400 animate-pulse"></div>
            <p className="text-4xl font-bold gradient-text">{carbonCredits.toLocaleString()}</p>
          </div>
        </div>
        
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="p-4 bg-accent-500/20 border border-accent-500/30 rounded-xl">
            <p className="text-accent-400 text-sm text-center">{successMessage}</p>
          </div>
        )}
        
        {walletConnected ? (
          <button
            type="submit"
            disabled={isSubmitting || !aiAnalysisNotes}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg py-4"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <MintIcon className="h-6 w-6" /> 
                Submit for Approval
              </>
            )}
          </button>
        ) : (
            <button type="button" onClick={onConnectWallet} className="w-full btn-secondary text-lg py-4">
                Connect Wallet to Submit
            </button>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;