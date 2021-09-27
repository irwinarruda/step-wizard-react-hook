# Step Wizard for React Hook Form

This is an attempt to create a form that validates as the user goes through each step. For now, it's most useful if you want to split the form but still have validation.

## Install

```
yarn add step-wizard-react-hook react-hook-form @hookform/resolvers yup
```

## Code Example

```tsx
import React from 'react';

import { StepWizardWrapper, StepWizardTab } from 'step-wizard-react-hook';

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

## StepWizardWrapper

StepWizardWrapper needs to be called with the layout component inside so that it becomes StepWizardProvider. The Provider has the following properties and extends react-hook-form `UseFormProps`.

| Key             | Type                        | Required | Description                                                                            |
| --------------- | --------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `onSubmit`      | `SubmitHandler<FormValues>` | `true`   | On submit event for the last step.                                                     |
| `aditionalData` | `{ [key: string]: any }`    | `false`  | Any additional data you want to provide in case you don't want to use another Context. |
| `children`      | `React.ReactNode`           | `true`   | Tabs indicating each step of the form.                                                 |

## StepWizardTab

This component is used to help the lib gather important information regarding each step.

| Key                | Type                        | Required | Description                           |
| ------------------ | --------------------------- | -------- | ------------------------------------- |
| `id`               | `string`                    | `false`  | Create a unique identifier if needed. |
| `name`             | `string or React.ReactNode` | `true`   | Name for the layout tab bar.          |
| `validationSchema` | `any`                       | `false`  | Yup validation schema for the step.   |
| `children`         | `React.ReactNode`           | `true`   | Tab UI component for the form step.   |

## useStepWizard

This is the step wizard context containing the following data.

| Key             | Type                               | Description                              |
| --------------- | ---------------------------------- | ---------------------------------------- |
| `formRef`       | `React.RefObject<HTMLFormElement>` | Reference to the wrapper form            |
| `tabs`          | `StepWizardTabProps[]`             | List of all children tabs props.         |
| `step`          | `number`                           | Current step.                            |
| `currentTab`    | `StepWizardTabProps`               | Current step tab.                        |
| `aditionalData` | `{ [key: string]: any }`           | Additional Data passed through Provider. |
| `gotoStep`      | `(newStep?: number) => void`       | Go to a specific step.                   |
| `nextStep`      | `() => void`                       | Go to the next step.                     |
| `previousStep`  | `() => void`                       | Go to the previous step.                 |
