import React from 'react';
import {
    useForm,
    FormProvider,
    SubmitHandler,
    FieldValues,
    UseFormProps,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type StepWizardTabProps = {
    id?: string;
    name: string | React.ReactNode;
    validationSchema?: any;
    children: React.ReactNode;
};

type StepWizardContextProps = {
    formRef: React.RefObject<HTMLFormElement>;
    tabs: StepWizardTabProps[];
    step: number;
    currentTab: StepWizardTabProps;
    aditionalData?: {
        [key: string]: any;
    };
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

type StepWizardProviderProps<FormValues> = UseFormProps & {
    children: React.ReactNode;
    aditionalData?: {
        [key: string]: any;
    };
    onSubmit: SubmitHandler<FormValues>;
};

const StepWizardTab = ({ children }: StepWizardTabProps) => {
    return <>{children}</>;
};

const StepWizardContext = React.createContext({} as StepWizardContextProps);

const StepWizardWrapper = (viewComponent: React.ReactNode) => <
    FormValues extends FieldValues
>({
    children,
    onSubmit,
    aditionalData,
    ...props
}: StepWizardProviderProps<FormValues>): JSX.Element => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(
        children,
    ) as React.ReactElement<StepWizardTabProps>[];
    const tabs = childrenArray.map((child) => {
        if (child.type !== StepWizardTab) {
            throw new Error(
                'You should only use the StepWizardTab component inside Wrapper.',
            );
        }
        return child.props;
    });
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    const isLastStep = step === tabs.length - 1;

    const methods = useForm({
        ...props,
        resolver: yupResolver(
            currentTab.validationSchema || yup.object().shape({}),
        ),
    });

    const nextStep = React.useCallback(() => {
        if (step < tabs.length) {
            formRef.current?.dispatchEvent(
                new Event('submit', { bubbles: true, cancelable: true }),
            );
        }
    }, [formRef, step, setStep]);

    const previousStep = React.useCallback(() => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    }, [step, setStep]);

    const gotoStep = React.useCallback(
        (newStep?: number): void => {
            if (newStep !== undefined && step - newStep >= 0) {
                setStep(newStep);
                return;
            }
            formRef.current?.dispatchEvent(
                new Event('submit', { bubbles: true, cancelable: true }),
            );
        },
        [formRef, step, setStep],
    );

    const handleFormSubmit: SubmitHandler<FormValues> = React.useCallback(
        async (data) => {
            if (isLastStep) {
                await onSubmit(data);
                return;
            }
            setStep((prev) => prev + 1);
        },
        [isLastStep, setStep],
    );

    return (
        <FormProvider {...methods}>
            <StepWizardContext.Provider
                value={{
                    formRef,
                    tabs,
                    currentTab,
                    aditionalData,
                    step,
                    gotoStep,
                    nextStep,
                    previousStep,
                }}
            >
                <form
                    ref={formRef}
                    onSubmit={methods.handleSubmit(handleFormSubmit)}
                >
                    {viewComponent}
                </form>
            </StepWizardContext.Provider>
        </FormProvider>
    );
};

const useStepWizard = (): StepWizardContextProps => {
    const context = React.useContext(StepWizardContext);
    if (!context) {
        throw new Error('StepWizard should be user within a provider');
    }
    return context;
};

export {
    StepWizardTabProps,
    StepWizardContextProps,
    StepWizardProviderProps,
    StepWizardTab,
    StepWizardWrapper,
    useStepWizard,
};
