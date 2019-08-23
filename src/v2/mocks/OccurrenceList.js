/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

/* eslint-disable import/prefer-default-export */
export const mockOccurrences = {
  data: {
    occurrences: [
      {
        name: 'id-mycluster-account/providers/securityAdvisorNewProviderId/occurrences/securityAdvisorOccurrenceId',
        noteName: 'id-mycluster-account/providers/securityAdvisorNewProviderId/notes/securityAdvisorNoteID',
        updateTime: '2019-07-10T14:07:46.596382Z',
        createTime: '2019-07-10T14:07:46.596357Z',
        shortDescription: 'Registered services1',
        context: {
          accountId: 'id-mycluster-account',
          region: 'location',
          resourceType: 'worker',
          resourceName: 'www.myapp.com',
          resourceId: 'pluginId',
          resourceCrn: null,
          serviceName: 'application',
          serviceCrn: null,
        },
        reportedBy: {
          id: 'securityAdvisorNewProviderId',
          title: 'Title for Note',
          url: null,
        },
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'title here',
              url: 'Details URL',
            },
          ],
          dataTransferred: null,
        },
        securityClassification: {
          securityCategories: [
            'System and communications protections',
          ],
        },
      },
    ],
  },
};
