import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { useStepWizard } from '../StepWizardProvider';

import { Container } from './styles';

type NavCardProps = {
    isDashboard?: boolean;
};

const NavCard: React.FC<NavCardProps> = ({ isDashboard = true }) => {
    const { tabs, step, gotoStep } = useStepWizard();

    return (
        <Container isDashboard={isDashboard}>
            <Tabs
                id="nav-card"
                variant="pills"
                activeKey={step}
                onSelect={(k) => gotoStep(Number(k))}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        eventKey={index}
                        title={
                            <>
                                <span>{tab.name}</span>
                            </>
                        }
                        key={
                            tab.id
                                ? tab.id
                                : tab.name?.toString().replaceAll(' ', '_')
                        }
                    >
                        {tab.children}
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export { NavCard };
