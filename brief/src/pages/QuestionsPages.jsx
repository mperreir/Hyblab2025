import React from 'react';
import QuestionsComponent from '../components/QuestionsComponent';
import IntroductionLayout from '../Layout/IntroductionLayout';

const QuestionsPage = () => {
    return (
        <IntroductionLayout>
            <QuestionsComponent />
        </IntroductionLayout>
    );
};

export default QuestionsPage;