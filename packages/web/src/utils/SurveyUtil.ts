import ISurvey from '../models/interfaces/ISurvey';
import ISurveyResponse from '../models/interfaces/ISurveyResponse';
import ISurveyStep from '../models/interfaces/ISurveyStep';

export default {
  getStep: (steps: ISurveyStep[], coordinates: number[]): ISurveyStep | undefined  => {
    let currentSteps: ISurveyStep[] = steps;
    let currentStep: ISurveyStep | undefined;

    while (coordinates.length) {
      let currentIndex = coordinates.shift() as number;
      currentStep = currentSteps[currentIndex]

      if (coordinates.length === 0) return currentStep;

      if (!currentStep.steps) {
        return undefined;
      }

      currentSteps = currentStep.steps;
    }

    return currentStep;
  }
}
