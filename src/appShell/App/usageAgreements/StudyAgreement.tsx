import React from 'react';
import UsageAgreement from 'shared/components/UsageAgreement';
import { getServerConfig } from 'config/config';
import { getBrowserWindow } from 'cbioportal-frontend-commons';
import expiredStorage from 'expired-storage';

const STUDY_VIEW_WARNING_PERSISTENCE_KEY =
    'private_study_link_warning_dismissed2';

export function shouldShowStudyViewWarning() {
    // we want to show a warning message on private cbioportal instances
    // to prevent users from adding links in manuscripts
    // we don't want to show this in MSK CIS setting (iframe)
    const showStudyViewWarning =
        ['triage-portal', 'mskcc-portal'].includes(
            getServerConfig().app_name!
        ) && !getBrowserWindow().isMSKCIS;

    return (
        showStudyViewWarning &&
        new expiredStorage().getItem(STUDY_VIEW_WARNING_PERSISTENCE_KEY) !==
            'true'
    );
}

export const StudyAgreement: React.FunctionComponent<{}> = function({}) {
    return (
        <UsageAgreement
            alertMessage={
                <>
                    <span style={{ color: 'red' }}>WARNING:</span>
                    &nbsp;All URLs in this website are private - do NOT include
                    in manuscripts.
                </>
            }
            persistenceKey={STUDY_VIEW_WARNING_PERSISTENCE_KEY}
            expirationInDays={90}
            clauses={[
                <>
                    {' '}
                    When adding a link to a cBioPortal cohort in a manuscript,{' '}
                    <strong>
                        I will not link to this private portal (
                        {window.location.hostname})
                    </strong>
                    , but will instead link to this study on the public
                    cBioPortal (
                    <a href="https://www.cbioportal.org/" target="_blank">
                        cbioportal.org
                    </a>
                    ). Contact{' '}
                    <a href="mailto:cbioportal@cbio.mskcc.org">
                        cbioportal@cbio.mskcc.org
                    </a>{' '}
                    with any questions about getting the data transferred to the
                    public cBioPortal.
                </>,
                <>
                    When adding a link to a cBioPortal cohort in a manuscript,{' '}
                    <strong>
                        I will not link to this private portal (
                        {window.location.hostname})
                    </strong>
                    , but will instead link to this study on the public
                    cBioPortal (
                    <a href="https://www.cbioportal.org/" target="_blank">
                        cbioportal.org
                    </a>
                    ). Contact{' '}
                    <a href="mailto:cbioportal@cbio.mskcc.org">
                        cbioportal@cbio.mskcc.org
                    </a>{' '}
                    with any questions about getting the data transferred to the
                    public cBioPortal.
                </>,
                <>
                    I have read the{' '}
                    <a
                        href="https://cmo.mskcc.org/index.php/msk-impact/"
                        target="_blank"
                    >
                        MSK-IMPACT Data publication guidelines (intranet/VPN
                        only)
                    </a>
                    .
                </>,
            ]}
        />
    );
};
