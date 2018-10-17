/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockWorksetPollIncomplete = {
  body: {
    items: [
      {
        status: {
          status: 'Not Finished',
        },
      },
    ],
  },
};

export const mockWorksetPollComplete = {
  body: {
    items: [
      {
        status: {
          conditions: [
            { type: 'Completed', lastUpdateTime: '2018-08-15T18:44:41Z' },
          ],
        },
      },
    ],
  },
};
