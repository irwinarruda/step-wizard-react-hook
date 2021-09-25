# Step Wizard for React Hook Form

This is an attempt to create a form that validates as the user goes through each step. For now, it's most useful if you want to split the form but still have validation.

## Install

```
yarn add react-hook-form-step-wizard react-hook-form @hookform/resolvers yup
```

## Code Example

```tsx
import React from 'react';

import { StepWizardWrapper, StepWizardTab } from 'react-hook-form-step-wizard';

const MyStepWizard = StepWizardWrapper(<TabComponent />);

export const App = () => {
    return (
        <MyStepWizard onSubmit={(data) => console.log(data)}>
            <StepWizardTab name="Step 1">
                <p>Step 1</p>
            </StepWizardTab>

            <StepWizardTab name="Step 2">
                <p>Step 2</p>
            </StepWizardTab>

            <StepWizardTab name="Step 3">
                <p>Step 3</p>
            </StepWizardTab>
        </MyStepWizard>
    );
};
```
