import React from 'react';
import { Meta } from '@storybook/react';

import { StepWizardWrapper, StepWizardTab } from '../src';

import { NavCard } from './NavCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const MyStepWizard = StepWizardWrapper(<NavCard />);

export default {
    component: MyStepWizard,
    title: 'Step Wizard',
} as Meta;

export const DefaultStepWizard = () => {
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
