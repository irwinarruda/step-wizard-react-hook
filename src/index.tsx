import React from 'react';
export * from './components/StepWizardProvider';

import EasterEggs from './assets/easter-eggs.jpg';

export const EasterEgg = () => {
    return <img src={EasterEggs} alt="Easter" />;
};
