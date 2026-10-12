export type WeatherType = 'sunny' | 'rain' | 'drought' | 'fog';
export type CropStage = 'sowing' | 'vegetative' | 'flowering' | 'pest_outbreak' | 'harvest';

export interface FarmState {
  stage: CropStage;
  dayTime: number; // 0 to 24 (hours)
  weather: WeatherType;
  soilHealth: number; // 0 - 100
  moisture: number; // 0 - 100
  pestPressure: number; // 0 - 100
  projectedYield: number; // Quintals / acre (e.g. 24.5)
  waterSavedLiters: number;
  decisionsLog: Array<{
    stage: CropStage;
    action: string;
    impact: string;
    timestamp: number;
  }>;
  harvestSuccess?: {
    grade: 'A+' | 'A' | 'B' | 'C';
    yieldAchieved: number;
    profitScore: number;
    ecoScore: number;
  };
}

export interface SimulationAction {
  id: string;
  name: string;
  description: string;
  type: 'irrigate' | 'fertilize' | 'pest' | 'harvest';
  moistureDelta: number;
  soilHealthDelta: number;
  pestPressureDelta: number;
  yieldDelta: number;
  waterSavedDelta: number;
}
